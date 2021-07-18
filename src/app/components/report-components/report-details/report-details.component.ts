import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Conflict, ConflictDataService } from 'src/app/services/conflict-data.service';
import { Structure, Tile, TileDataService } from 'src/app/services/tile-data.service';
import {MatDialog} from '@angular/material/dialog';
import { StructureDialogComponent } from '../../dashboard-components/structure-dialog/structure-dialog.component';
import { Coordinate } from 'src/app/models/coordinate.model';
import { HexagonService } from 'src/app/services/hexagon.service';
import { Timestamp } from '@firebase/firestore-types';
import { AccountData } from 'src/app/services/account.service';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.less']
})
export class ReportDetailsComponent implements OnInit {
  @Input() report: string;
  constructor(private tileService: TileDataService,
              private conflictService: ConflictDataService,
              private hexagonService: HexagonService,
              public dialog: MatDialog) { }

  tile$: Observable<Tile | undefined> | undefined;
  structures$: Observable<Structure[]>;
  conflict$: Observable<Conflict | undefined>;
  tileSubscription: Subscription;
  
  
  ngOnInit(): void {
    this.tile$ = this.tileService.getTileValuesAsObservable(this.report);
    this.structures$ = this.tileService.getTileStructuresAsObservable(this.report);
    this.tileSubscription = this.tile$.subscribe((res: Tile | undefined) => {
      if (res?.conflictId)
        this.conflict$ = this.conflictService.getConflictValuesAsObservable(res.conflictId);
    })
  }

  ngOnDestroy() {
    this.tileSubscription.unsubscribe();
  }

  generateLink(conflictId: string) {
    return `/war-room/${conflictId}`;
  }

  generateDashboardLink(x: number, y: number, z: number) {
    const coords = new Coordinate(x, y, z);
    const id = this.hexagonService.getIdFromCoordinates(coords);
    return `/dashboard/${id}`;
  }

  openDialog(structure: Structure) {
    const dialogRef = this.dialog.open(StructureDialogComponent, {
      data: {
        tileId: this.report,
        structure: structure 
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
    this.tileService.collectResources(this.report, acctData)
  }

}
