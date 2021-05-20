import { Component, NgModule, OnInit } from '@angular/core';
import { concat, from, Observable } from 'rxjs';
import { Coordinate } from '../models/coordinate.model';
import { ParcelMetadata } from '../models/parcel-metadata.model';
import { EthersService } from '../services/ethers.service';
import {DataSource} from '@angular/cdk/collections';
import { HexagonService } from '../services/hexagon.service';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';

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
  
  
  displayedColumns: string[] = ['position', 'location','weight','link',];
  dataSource = myDataArray;
  constructor(
    private ethers: EthersService,
    private hexagonService: HexagonService
  ) {this.ethersService = ethers }

  async ngOnInit() {
    this.numTokens = await this.ethersService.getBalanceOf();
    this.temp = await this.ethersService.getTokenOfOwnerByIndex();
    this.ethersService.getTokenOfOwnerByIndex() 
    await this.ethersService.getTokenOfOwnerByIndex()
                            .then(res => res.subscribe(res => {
      this.dataSource = res;
      res.forEach((element: any) => {
        let ele = element.data as ParcelMetadata;
        let location = new Coordinate(ele.location.x, ele.location.y,ele.location.z);
        this.testt = this.hexagonService.getIdFromCoordinates(location)
        // console.log(this.hexagonService.getIdFromCoordinates(location))
        console.log(this.testt)
      });
      
      // console.log(res);
      // console.log(this.tokens2.length)
      
    }))

  }

  public hello(coords :Coordinate) {
    let location = new Coordinate(coords.x, coords.y,coords.z);
    const id = this.hexagonService.getIdFromCoordinates(location)
    console.log(coords)
    return `/map/${id}`;
  }

}