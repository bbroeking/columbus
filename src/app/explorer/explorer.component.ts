import { Component, OnInit } from '@angular/core';
import { EthersService } from '../services/ethers.service';
import { MetadataService } from '../services/metadata.service';

import {Subscription} from 'rxjs';

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


  constructor(private ethers: EthersService,
              private metadataService: MetadataService){
                this.ethersService = ethers;
              }

  async ngOnInit() {
    // this.balance = await this.ethersService.getBalance();
    this.numTokens = await this.ethersService.getBalanceOf();
    this.tokenMetadata = await this.ethersService.getTokenOfOwnerByIndex();

  }

  ngOnDestroy() {
    // this.metadataSubscription.unsubscribe();
  }


  logData() {
    console.log(this.data);
  }

}
