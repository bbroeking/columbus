import { Component, OnInit } from '@angular/core';
import { EthersService } from 'src/app/services/ethers.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.less']
})
export class ReportsComponent implements OnInit {

  metadataUris: string[];
  constructor(private ethers: EthersService) { }

  async ngOnInit() {
    this.metadataUris = await this.ethers.getTokenMetadataIdsByOwner()

  }

}
