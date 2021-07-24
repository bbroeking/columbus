import { Component, Input } from '@angular/core';
import { Parcel } from 'src/app/interfaces/parcel';
import { EthersService } from 'src/app/services/ethers.service';
import { MetamaskService } from 'src/app/services/metamask.service';
import { TileDataService } from 'src/app/services/tile-data.service';
import { TileGeneratorService } from 'src/app/services/tile-generator.service';

@Component({
  selector: 'app-discover-parcel',
  templateUrl: './discover-parcel.component.html',
  styleUrls: ['./discover-parcel.component.less']
})
export class DiscoverParcelComponent {

  @Input() parcel: Parcel;

  constructor(private ethers: EthersService,
              private tileDataService: TileDataService,
              private metamaskService: MetamaskService,
              private tileGeneratorService: TileGeneratorService) {}

  async redeemLandAndInitalizeData() {
    const ld = await this.ethers.redeem(this.parcel.account, this.parcel.tokenId, this.parcel.signature);
    this.tileDataService.createTile(ld, { // this should happen as part of a server function call so we dont get into a state where this isnt run
      mineralRate: 1,
      energyRate: 2,
      fortification: 2
    });
    this.tileGeneratorService.updateParcel(
      this.parcel.tokenId, { annexed: true }
    );
  }
}
