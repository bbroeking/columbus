import { Component, Input, OnInit } from '@angular/core';
import { Parcel } from 'src/app/interfaces/parcel';
import { AccountService } from 'src/app/services/account.service';
import { EthersService } from 'src/app/services/ethers.service';
import { MetamaskService } from 'src/app/services/metamask.service';
import { TileDataService } from 'src/app/services/tile-data.service';
import { TileGeneratorService } from 'src/app/services/tile-generator.service';

@Component({
  selector: 'app-discover-parcel',
  templateUrl: './discover-parcel.component.html',
  styleUrls: ['./discover-parcel.component.less']
})
export class DiscoverParcelComponent implements OnInit {
  @Input() parcel: Parcel;
  address: string;
  domination: number;
  constructor(private ethers: EthersService,
              private tileDataService: TileDataService,
              private tileGeneratorService: TileGeneratorService,
              private metamaskService: MetamaskService,
              private accountService: AccountService) {}

  ngOnInit() {
    this.domination = 0;
    this.metamaskService.setConnectedAccount();
    this.address= this.metamaskService.account.value;
    this.accountService.getAccountAsObservable(this.address).subscribe((accountData) => this.domination = accountData?.domination || 0)
  }

  async redeemLandAndInitalizeData() {
    this.accountService.updateAccountData(this.address, {'domination': -1});
    const redemption = await this.ethers.redeem(this.parcel.account, this.parcel.tokenId, this.parcel.signature);
    this.tileDataService.createTile(redemption, {
      mineralRate: this.parcel.mineralRate,
      energyRate: this.parcel.energyRate,
      fortification: this.parcel.fortification
    });
    this.tileGeneratorService.updateParcel(
      this.parcel.tokenId, { annexed: true }
    );
  }
}
