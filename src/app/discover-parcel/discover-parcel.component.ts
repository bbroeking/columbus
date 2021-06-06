import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { EthersService } from '../services/ethers.service';
import { TileDataService } from '../services/tile-data.service';
import { TileGeneratorService, UnclaimedLand } from '../services/tile-generator.service';

@Component({
  selector: 'app-discover-parcel',
  templateUrl: './discover-parcel.component.html',
  styleUrls: ['./discover-parcel.component.less']
})
export class DiscoverParcelComponent implements OnInit {

  @Input() attributes: Object | undefined;
  @Input() stale: boolean | undefined;
  flipped: boolean;
  discoverState: any;
  constructor(private ethers: EthersService,
              private tileDataService: TileDataService,
              private tileGeneratorService: TileGeneratorService,
              private auth: AuthService) { }

  async ngOnInit() {}

  flip() {
    if(this.flipped) {}
    else {
      this.flipped = true;
      this.discoverState = {'transform': 'rotateY(180deg)'}
    }
  }

  conquer() {
    this.ethers.discover()
                .then((uri) => {
                  this.tileDataService.createTile(uri);
                });
  }

}
