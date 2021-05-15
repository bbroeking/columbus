import { Component, OnInit } from '@angular/core';
import { EthersService } from '../services/ethers.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {

  public totalSupply: any[];

  constructor(private ethersService: EthersService) { }

  async ngOnInit(): Promise<void> {
    this.totalSupply = await this.ethersService.getTotalSupply();
    console.log(this.totalSupply);
  }

  
}
