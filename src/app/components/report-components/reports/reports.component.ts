import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Coordinate } from '../models/coordinate.model';
import { EthersService } from '../services/ethers.service';
import { HexagonService } from '../services/hexagon.service';

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
