import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EthersService } from '../services/ethers.service';
import { Structure, TileDataService } from '../services/tile-data.service';
import { MatDialog } from '@angular/material/dialog';
import { StructureUpgradeDialogComponent } from '../structure-upgrade-dialog/structure-upgrade-dialog.component';

@Component({
  selector: 'app-structure-details',
  templateUrl: './structure-details.component.html',
  styleUrls: ['./structure-details.component.less']
})
export class StructureDetailsComponent implements OnInit {
  @Input() structure: Structure;
  @Input() selectedTile: number;
  constructor(
    private ethers: EthersService,
    private tileDataService:TileDataService,
    public dialog: MatDialog,
  ) { }
  disableSelect = new FormControl(false);

  selectedBuilding: string
  showFiller = false;

  ngOnInit(): void {
  }
  
  buildings = [
    {value: 'Mine', viewValue: 'Mine'},
    {value: 'Field', viewValue: 'Field'},
    {value: 'Smith', viewValue: 'Smith'},
    {value: 'Refinery', viewValue: 'Refinery'}
  ];

  change(event: any) {
    console.log(event)
    this.selectedBuilding = event.value
  }
  async buildBuilding() {
    console.log(this.selectedBuilding)
    let dirtyUri = await this.ethers.getMetadataURI(this.selectedTile)
    console.log(this.structure.sid)
    return this.tileDataService.updateTileBuild(dirtyUri,this.structure.sid,this.selectedBuilding,1)
  }
  async upgradeBuilding() {
    let dirtyUri = await this.ethers.getMetadataURI(this.selectedTile)
    if (this.structure.level <= 3)
    {
      return this.tileDataService.upgradeTileBuild(dirtyUri, this.structure.sid, this.structure.level)
    }
    else
    {
      console.log('Max Level')
    }
  }

async openDialog(){
  this.dialog.open(StructureUpgradeDialogComponent, {
    data: {location:this.structure.id, sidd: this.structure.sid, level: this.structure.level, dUri: this.selectedTile}
  });
}

}
