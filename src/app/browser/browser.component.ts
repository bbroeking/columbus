import { Component, NgModule, OnInit } from '@angular/core';
import { concat, Observable } from 'rxjs';
import { Coordinate } from '../models/coordinate.model';
import { ParcelMetadata } from '../models/parcel-metadata.model';
import { EthersService } from '../services/ethers.service';
import {DataSource} from '@angular/cdk/collections';

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
  public cvs: string;
  public testt: any;
  
  
  displayedColumns: string[] = ['position', 'location','weight',];
  dataSource = myDataArray;
  constructor(
    private ethers: EthersService,
  ) {this.ethersService = ethers }

  async ngOnInit() {
    this.numTokens = await this.ethersService.getBalanceOf();
    this.temp = await this.ethersService.getTokenOfOwnerByIndex();
    this.ethersService.getTokenOfOwnerByIndex()
    await this.ethersService.getTokenOfOwnerByIndex()
                            .then(res => res.subscribe(res => {
      this.dataSource = res

      // res.forEach((element: any) => {
      //   let ele = element.data as ParcelMetadata;
      //   let location = ele.location as Coordinate;
        
      //   console.log(location)
      //   //json
      //   this.cvs = JSON.stringify(location)
      //   console.log(this.cvs)
      //   //array valuesonly
      //   // this.testt = Object.values(location)
      //   //array keys
      //   // this.testt = Object.keys(location)
      //   //array of arrays
      //   // this.testt = Object.entries(location)

      //   console.log(this.testt)
      //   this.tokens2.push(ele);
      // });
      
      // console.log(res);
      // console.log(this.tokens2.length)
      
    }))

  }

}