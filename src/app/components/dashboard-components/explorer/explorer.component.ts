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
              }

  async ngOnInit() {
    this.data = await this.cloudFunctions.updateProductionTiles({'id': '0x0d641a2b926a828cabb27d8f01325ad794cf3aae'});
  }

  logData() {
    console.log(this.data);
  }

}
