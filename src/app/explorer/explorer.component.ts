import { Component, OnInit } from '@angular/core';
import { EthersService } from '../services/ethers.service';
import { MetadataService } from '../services/metadata.service';

import {Observable, Subscription} from 'rxjs';
import { HexagonService } from '../services/hexagon.service';
import { Coordinate } from '../models/coordinate.model';
import { CloudFunctionsService } from '../services/cloud-functions.service';

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
  data$: Observable<any>;
  buildStructure$: Observable<any>;
  app$: Observable<any>;

  constructor(private ethers: EthersService,
              private metadataService: MetadataService,
              private hexagonService: HexagonService,
              private cloudFunctions: CloudFunctionsService){
                this.ethersService = ethers;
                this.app$ = this.cloudFunctions.buildStructure({
                  'account': 'RZLTPoHfBOZII7RLVBvEgG1FTsp2',
                  'tile': '1923048b-b05e-4617-8498-553f9c931a96',
                  'building': 'minerals-refinery',
                });
              }

  async ngOnInit() {
    this.numTokens = await this.ethersService.getBalanceOf();
    // this.tokenMetadata = await this.ethersService.getTokenOfOwnerByIndex();
    let supply = await this.ethersService.getTotalSupply().then(res => res);
    let coordinates: Coordinate = await this.hexagonService.getCoordinatesFromId(supply);
    this.neighbors = this.hexagonService.getNeighbors(coordinates);
    this.hexagonService.getCoordinatesFromId(13);
  }

  ngOnDestroy() {
    // this.metadataSubscription.unsubscribe();
  }


  logData() {
    console.log(this.data);
  }

}
