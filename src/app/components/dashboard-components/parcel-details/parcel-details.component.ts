import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Structure, TileDataService } from 'src/app/services/tile-data.service';
import { EthersService } from 'src/app/services/ethers.service';


@Component({
  selector: 'app-parcel-details',
  templateUrl: './parcel-details.component.html',
  styleUrls: ['./parcel-details.component.less']
})
export class ParcelDetailsComponent implements OnInit {

  @Input() selectedTile: number;
  data$: Observable<Structure | undefined> | undefined;
  structures$: Observable<Structure[]| undefined> | undefined;
  constructor(private tileDataService: TileDataService,
              private fs: AngularFirestore,
              private ethers : EthersService) { }

  async ngOnInit() {
    // this.data$ = await this.tileDataService.getTileStructures(1);

  }

async ngOnChanges() {
  let uri = await this.ethers.getMetadataURI(this.selectedTile)
  this.structures$ = await this.tileDataService.getTileStructuresAsObservable(uri);
}

}
