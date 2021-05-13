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

  constructor(private ethers: EthersService,
              private metadataService: MetadataService) 
  {
    this.ethersService = ethers;

  }

  ngOnInit(): void {
    this.metadataService
      .generateMetadata(4)
      .subscribe(res => {
        this.data = res;
        console.log(res);
      });
  }

  ngOnDestroy() {
    this.metadataSubscription.unsubscribe();
  }

  logData() {
    console.log(this.data);
  }

}
