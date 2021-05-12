import { Component, OnInit } from '@angular/core';
import { EthersService } from '../services/ethers.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.less']
})
export class ExplorerComponent implements OnInit {

  public ethersService: EthersService;
  constructor(private ethers: EthersService) { 
    this.ethersService = ethers;
  }

  ngOnInit(): void {
    // this.ethersService.connectContract();
  }

  checkConnection() {
    this.ethersService.isMetamaskInstalled();
  }

}
