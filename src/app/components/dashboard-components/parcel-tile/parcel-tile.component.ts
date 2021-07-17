import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { EthersService } from 'src/app/services/ethers.service';

export interface Item {
  name: string;
};

@Component({
  selector: 'app-parcel-tile',
  templateUrl: './parcel-tile.component.html',
  styleUrls: ['./parcel-tile.component.less']
})
export class ParcelTileComponent implements OnInit {
  @Input() mapId: number | undefined;
  tileId: string;
  constructor(private ethersService: EthersService) { }

  async ngOnInit() {
    this.tileId = await this.ethersService.getMetadataURI(this.mapId!);
  }

}
