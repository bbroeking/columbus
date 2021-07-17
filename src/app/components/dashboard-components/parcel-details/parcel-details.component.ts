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
  addr: string;

  constructor(private tileDataService: TileDataService,
              private ethers : EthersService,
              private metamaskService: MetamaskService) { }

  async ngOnChanges() {
    let uri: string = await this.ethers.getMetadataURI(this.selectedTile)
    this.addr = this.metamaskService.account.value;
    this.tile$ = this.tileDataService.getTileValuesAsObservable(uri);
    this.structures$ = await this.tileDataService.getTileStructuresAsObservable(uri);
  }

}
