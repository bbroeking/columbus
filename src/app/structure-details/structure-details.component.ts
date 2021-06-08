import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EthersService } from '../services/ethers.service';
import { Resources, Structure, TileDataService } from '../services/tile-data.service';

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
  ) { }
  disableSelect = new FormControl(false);

 selectedBuilding: string

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
  async printB() {
    console.log(this.selectedBuilding)
    let dirtyUri = await this.ethers.getMetadataURI(this.selectedTile)
    let uri = this.tileDataService.cleanURI(dirtyUri)
    console.log(uri)
    console.log(this.structure.sid)
    return this.tileDataService.updateTileBuild(dirtyUri,this.structure.sid,this.selectedBuilding)
  }
}
