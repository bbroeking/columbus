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
export class DiscoverParcelComponent {

  @Input() attributes: LandAttributes | undefined;
  @Input() stale: boolean | undefined;
  @Input() flipped: boolean | undefined;
  @Input() prefix: string | undefined;

  discoverState: any;
  constructor(private ethers: EthersService,
              private tileDataService: TileDataService,
              private tileGeneratorService: TileGeneratorService) {}

  ngOnChanges() {
    if (this.flipped) this.discoverState = {'transform': 'rotateY(180deg)'};
  }

  flip() {
    if(!this.flipped) {
      this.flipped = true;
      const ucl = {
        [`flipped_${this.prefix}`]: true
      };
      this.tileGeneratorService.updateState(ucl as Partial<UnclaimedLand>);
      this.discoverState = {'transform': 'rotateY(180deg)'}
    }
  }

  conquer() {
    this.ethers.discover()
                .then((uri) => {
                  this.tileDataService.createTile(uri);
                  const ucl = {
                    [`stale_${this.prefix}`]: true
                  };
                  this.tileGeneratorService.updateState(ucl as Partial<UnclaimedLand>)
                })
  }
}
