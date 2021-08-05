import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENERGY_REFINERY, MINERALS_REFINERY } from 'src/app/constants/buildings';
import { IconService } from 'src/app/services/icon.service';
import { Structure, TileDataService } from 'src/app/services/tile-data.service';
import { BuildStructureDialogComponent } from '../build-structure-dialog/build-structure-dialog.component';
import { StructureDialogComponent } from '../structure-dialog/structure-dialog.component';
import * as firebase from 'firebase/app';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.less']
})
export class StructureComponent {
  @Input() structure: Structure;
  @Input() selectedTile: number;
  tileStructureSub: Subscription;

  constructor(
    private iconService: IconService,
    private tileService: TileDataService,
    public dialog: MatDialog) {}

  
  ngOnInit() {
    this.tileStructureSub = this.tileService.getTileStructureAsObservable(this.selectedTile, this.structure.sid)
      .subscribe((structure) => {
        if (structure)
          this.structure = structure;
      });
  }
  
  ngOnDestroy() {
    this.tileStructureSub.unsubscribe();
  }

  openDialog(structure: Structure) {
    const dialogRef = this.dialog.open(StructureDialogComponent, {
      data: {
        tileId: this.selectedTile,
        structure: structure 
      }
    });
  }

  openBuildDialog(structure: Structure) {
    const dialogRef = this.dialog.open(BuildStructureDialogComponent, {
      data: {
        structure: structure,
        selectedTile: this.selectedTile
      }
    });
  }

  async claimStructure() {
    const data = this.getStructureInit();
    this.tileService.updateStructure(this.selectedTile, this.structure.sid, data);
  }

  getStructureInit() {
    let data;
    const structureType = this.structure.queued.type
    if (structureType == ENERGY_REFINERY || structureType == MINERALS_REFINERY){
      data = {
        'type': this.structure.queued.type,
        'level': 1,
        'queue': [],
        'built': true,
        'energyRate': structureType == ENERGY_REFINERY ? 100 : 0,
        'mineralRate': structureType == ENERGY_REFINERY ? 0 : 100,
        'lastCollected': firebase.default.firestore.FieldValue.serverTimestamp(),
      }
    }else {
      data = {
        'type': this.structure.queued.type,
        'level': 1,
        'queue': [],
        'built': true,
      }  
    }
    return data;
  }

  getUnitSrc(type: string) {
    return this.iconService.getIconSrc(type);
  }
}
