import { Component, OnInit } from '@angular/core';
import { EthersService } from '../services/ethers.service';
import { TileDataService } from '../services/tile-data.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.less']
})
export class DiscoverComponent implements OnInit {

  uri: string;
  constructor(private ethers: EthersService,
              private tileDataService: TileDataService) { }

  ngOnInit(): void {
  }

  discover() {
    this.ethers.discover()
                .then((uri) => {
                  this.uri = uri
                  this.tileDataService.createTile(uri);
                });
  }

  async getTileStructures(){
    this.tileDataService.getTileStructures(this.uri).then((res) => console.log(res));
  }
}
