import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EthersService } from 'src/app/services/ethers.service';
import { Structure, TileDataService } from 'src/app/services/tile-data.service';
import { BuildStructureDialogComponent } from '../build-structure-dialog/build-structure-dialog.component';
import { StructureDialogComponent } from '../structure-dialog/structure-dialog.component';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.less']
})
export class StructureComponent {
  @Input() structure: Structure;
  @Input() selectedTile: number;

  constructor(private tileService: TileDataService,
    private ethersService: EthersService,
    public dialog: MatDialog) { }
  
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
    const data = {
      'level': 1,
      'queue': [],
      'type': this.structure.queued.type,
      'built': true,
    }
    const uri = await this.ethersService.getMetadataURI(this.selectedTile);
    this.tileService.updateStructure(uri, this.structure.sid, data);
  }
}
