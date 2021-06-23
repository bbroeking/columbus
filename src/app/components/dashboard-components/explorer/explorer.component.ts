import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { Coordinate } from 'src/app/models/coordinate.model';
import { CloudFunctionsService } from 'src/app/services/cloud-functions.service';
import { EthersService } from 'src/app/services/ethers.service';
import { HexagonService } from 'src/app/services/hexagon.service';
import { MetadataService } from 'src/app/services/metadata.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.less']
})
export class ExplorerComponent implements OnInit {

  public ethersService: EthersService;
  metadataSubscription: Subscription;

  public balance: string;
  public numTokens: number;
  public tokenMetadata: any;
  public id: number

  public neighbors: Map<string, Coordinate>
  data: Promise<any>;
  buildStructure$: Observable<any>;
  app$: Observable<any>;

  constructor(private ethers: EthersService,
              private metadataService: MetadataService,
              private hexagonService: HexagonService,
              private cloudFunctions: CloudFunctionsService){
                this.ethersService = ethers;
                this.data = this.cloudFunctions.buildStructure({
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