import { Component, OnInit } from '@angular/core';
import { EthersService } from '../services/ethers.service';
import { MetadataService } from '../services/metadata.service';

import {Subscription} from 'rxjs';
import { HexagonService } from '../services/hexagon.service';
import { Coordinate } from '../models/coordinate.model';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.less']
})
export class ExplorerComponent implements OnInit {

  public ethersService: EthersService;
  metadataSubscription: Subscription;
  data: any;

  public balance: string;
  public numTokens: number;
  public tokenMetadata: any;
  public id: number

  public neighbors: Map<string, Coordinate>


  constructor(private ethers: EthersService,
              private metadataService: MetadataService,
              private hexagonService: HexagonService){
                this.ethersService = ethers;
              }

  async ngOnInit() {
    this.numTokens = await this.ethersService.getBalanceOf();
    this.tokenMetadata = await this.ethersService.getTokenOfOwnerByIndex();

    let supply = await this.ethersService.getTotalSupply().then(res => res);
    let coordinates: Coordinate = await this.hexagonService.getCoordinatesFromId(supply);
    this.neighbors = this.hexagonService.getNeighbors(coordinates);
    console.log(this.neighbors);
  }

  ngOnDestroy() {
    // this.metadataSubscription.unsubscribe();
  }


  logData() {
    console.log(this.data);
  }

}
