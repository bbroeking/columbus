import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Conflict, ConflictDataService } from 'src/app/services/conflict-data.service';
import { Structure, Tile, TileDataService } from 'src/app/services/tile-data.service';
import {MatDialog} from '@angular/material/dialog';
import { StructureDialogComponent } from '../../dashboard-components/structure-dialog/structure-dialog.component';
import { Timestamp } from '@firebase/firestore-types';
import { AccountData } from 'src/app/services/account.service';
import { BuildStructureDialogComponent } from '../../dashboard-components/build-structure-dialog/build-structure-dialog.component';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.less']
})
export class ReportDetailsComponent implements OnInit {
  @Input() id: number;
  constructor(private tileService: TileDataService,
              private conflictService: ConflictDataService,
              public dialog: MatDialog) { }

  tile$: Observable<Tile | undefined> | undefined;
  structures$: Observable<Structure[]>;
  conflict$: Observable<Conflict | undefined>;
  tileSubscription: Subscription;
  
  ngOnInit(): void {
    this.tile$ = this.tileService.getTileValuesAsObservable(this.id);
    this.structures$ = this.tileService.getTileStructuresAsObservable(this.id);
    this.tileSubscription = this.tile$.subscribe((tile: Tile | undefined) => {
      if (tile?.conflictId)
        this.conflict$ = this.conflictService.getConflictValuesAsObservable(tile.conflictId);
    });
  }

  ngOnDestroy() {
    this.tileSubscription.unsubscribe();
  }

  generateLink(conflictId: string) {
    return `/war-room/${conflictId}`;
  }

  generateDashboardLink(id: number) {
    return `/dashboard/${id}`;
  }

  openDialog(structure: Structure) {
    const dialogRef = this.dialog.open(StructureDialogComponent, {
      data: {
        tileId: this.id,
        structure: structure 
      }
    });
  }

  openBuildDialog(structure: Structure) {
    const dialogRef = this.dialog.open(BuildStructureDialogComponent, {
      data: {
        structure: structure,
        selectedTile: this.id
      }
    });
  }

  calculateStore(rate: number, lastCollected: Timestamp) {
    if (!lastCollected) return 0;
    const diff = Date.now() - lastCollected.toMillis();
    const hours = diff / (1000 * 60 * 60);
    return Math.floor(rate * hours);
  }

  collectStore(mRate:number, eRate: number, lastCollected: Timestamp) {
    const mStore: number = this.calculateStore(mRate, lastCollected);
    const eStore: number = this.calculateStore(eRate, lastCollected);
    const acctData: Partial<AccountData> = {
      'minerals': mStore,
      'energy': eStore,
    }
    this.tileService.collectResources(this.id, acctData)
  }

}
