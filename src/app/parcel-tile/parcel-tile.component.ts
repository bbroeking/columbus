import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { EthersService } from '../services/ethers.service';

export interface Item {
  name: string;
};

@Component({
  selector: 'app-parcel-tile',
  templateUrl: './parcel-tile.component.html',
  styleUrls: ['./parcel-tile.component.less']
})
export class ParcelTileComponent implements OnInit {

  @Input() mapId: number;
  private itemDoc: AngularFirestoreDocument<Item>;
  item: Observable<Item | undefined>;


  constructor(private ethersService: EthersService,
              private firestore: AngularFirestore) { }

  async ngOnInit() {
    let firestoreId = await this.getFirestoreFromTileId(this.mapId);
    if (typeof firestoreId != undefined){
      this.itemDoc = this.firestore.doc<Item>(`items/${firestoreId}`);
      this.item = this.itemDoc.valueChanges();
      this.create({name: "test"});  
    }
  }
  
  create(item: Item) {
    this.itemDoc.set(item);
  }
  update(item: Item) {
    this.itemDoc.update(item);
  }

  async getFirestoreFromTileId(id: number): Promise<string | undefined> {
    return this.ethersService.getMetadataURI(id)
                              .then(function(uri: any) {
                                let uriComponents = uri.split("/");
                                return uriComponents[uriComponents.length - 1];
                              })
                              .catch(function(error: any) {
                                console.log(error);
                                return undefined;
                              });

  }

}
