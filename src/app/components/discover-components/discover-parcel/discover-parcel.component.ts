import { Component, Input, OnInit } from '@angular/core';
import { LandAttributes } from 'src/app/models/land-attributes.model';
import { EthersService, LandDiscovery } from 'src/app/services/ethers.service';
import { TileDataService } from 'src/app/services/tile-data.service';
import { TileGeneratorService, UnclaimedLand } from 'src/app/services/tile-generator.service';

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

  constructor(private ethers: EthersService,
              private tileDataService: TileDataService,
              private tileGeneratorService: TileGeneratorService) {}

  mintLandAndInitalizeData() {
    this.ethers.discover()
                .then((landDiscovery: LandDiscovery) => {
                  this.tileDataService.createTile(landDiscovery, this.attributes!);
                  const ucl = { [`stale_${this.prefix}`]: true };
                  this.tileGeneratorService.updateState(ucl as Partial<UnclaimedLand>)
                });
  }
}
