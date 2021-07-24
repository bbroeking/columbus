import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Structure, Tile, TileDataService } from 'src/app/services/tile-data.service';
import { EthersService } from 'src/app/services/ethers.service';
import { MetamaskService } from 'src/app/services/metamask.service';


@Component({
  selector: 'app-parcel-details',
  templateUrl: './parcel-details.component.html',
  styleUrls: ['./parcel-details.component.less']
})
export class ParcelDetailsComponent {

  @Input() selectedTile: number;
  tile$: Observable<Tile | undefined>;
  structures$: Observable<Structure[]| undefined> | undefined;

  address: string;
  selectedAddress: string;

  constructor(private ethers : EthersService,
    private tileDataService: TileDataService,
    private metamaskService: MetamaskService) { }

  async ngOnInit() {
    this.update();
  }

  async ngOnChanges() {
    this.update();
  }

  async update() {
    this.selectedAddress = await this.ethers.getOwnerOf(this.selectedTile) || '';
    this.address = this.metamaskService.account.value;

    if (this.selectedTile){
      this.tile$ = this.tileDataService.getTileValuesAsObservable(this.selectedTile);
      this.structures$ = this.tileDataService.getTileStructuresAsObservable(this.selectedTile);  
    } else {
      // Non-player Owned Tile
      this.tile$ = this.tileDataService.getTileValuesAsObservable(this.selectedTile);
      this.structures$ = this.tileDataService.getTileStructuresAsObservable(this.selectedTile);  
    }
  }

  generateWarRoomLink(conflictId: string) {
    return `/war-room/${conflictId}`;
  }
}
