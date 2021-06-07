import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LandAttributes } from '../models/land-attributes.model';
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

  @Input() attributes: LandAttributes | undefined;
  @Input() stale: boolean | undefined;
  flipped: boolean;
  discoverState: any;
  constructor(private ethers: EthersService,
              private tileDataService: TileDataService) {}

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.stale) this.flip();
  }

  flip() {
    if(!this.flipped) {
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
