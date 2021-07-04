import { Component, OnInit } from '@angular/core';
import { EthersService } from 'src/app/services/ethers.service';
import { MetamaskService } from 'src/app/services/metamask.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.less']
})
export class ReportsComponent implements OnInit {
  account: string;
  metadataUris: string[];
  constructor(private ethers: EthersService,
    private metamaskService: MetamaskService) { }

  async ngOnInit() {
    this.account = await this.metamaskService.getConnectedAccount();
    this.metadataUris = await this.ethers.getTokenMetadataIdsByOwner(this.account);
  }

}
