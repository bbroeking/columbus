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

  @Input() mapId: number | undefined;
  firestoreId: string | undefined;
  private itemDoc: AngularFirestoreDocument<Item>;
  item: Observable<Item | undefined>;


  constructor(private ethersService: EthersService,
              private firestore: AngularFirestore) { }

  async ngOnInit() {
    if (this.mapId == undefined) {
      // doesn't exist handling
    } else {
      this.firestoreId = this.mapId > 0 ? await this.getFirestoreFromTileId(this.mapId) : undefined;
    }
    
    if (typeof this.firestoreId != undefined){
      this.itemDoc = this.firestore.doc<Item>(`items/${this.firestoreId}`);
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
