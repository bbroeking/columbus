import { Component, NgModule, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Coordinate } from '../models/coordinate.model';
import { ParcelMetadata } from '../models/parcel-metadata.model';
import { EthersService } from '../services/ethers.service';
import { HexagonService } from '../services/hexagon.service';
import { TileDataService } from '../services/tile-data.service';

export interface PeriodicElement {
  location: string;
}
const ELEMENT_DATA: PeriodicElement[] = [

];
const myDataArray: never[] = []

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.less']
})
export class BrowserComponent implements OnInit {

  public ethersService: EthersService;
  public tokens2: ParcelMetadata[] = [];
  public numTokens: number;
  public temp: Observable<Array<any>>;
  public testt: any;
  public tileDataService: TileDataService
  
  displayedColumns: string[] = ['position', 'location','weight','link',];
  dataSource = myDataArray;
  constructor(
    private ethers: EthersService,
    private hexagonService: HexagonService,
    private tiledataService: TileDataService
  ) {this.ethersService = ethers 
     this.tileDataService = tiledataService}

  async ngOnInit() {
    this.numTokens = await this.ethersService.getBalanceOf();
    await this.ethersService.getTokenOfOwnerByIndex()
                            .then(res => res.subscribe(res => {
      this.dataSource = res;      
    }));

  }

  public generateLink(coords :Coordinate) {
    let location = new Coordinate(coords.x, coords.y,coords.z);
    const id = this.hexagonService.getIdFromCoordinates(location);
    return `/dashboard/${id}`;
  }

}