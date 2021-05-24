import { Injectable, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { EthersService } from './services/ethers.service';

export interface Resources {
  ore: number;
  wood:number;
  stone: number;
}


@Injectable({
  providedIn: 'root'
})
export class TileDataService {

  @Input() mapId: number;
  private tileDoc: AngularFirestoreDocument<Resources>
  tile: Observable<Resources | undefined>;

  public ethersService: EthersService
  
  constructor(
    private firestore: AngularFirestore,
    private ethers: EthersService,
    ) {this.ethersService = ethers }

async ngOnInit(){
  let firestoreId = await this.getFirestoreFromTileId(this.mapId);
  if (typeof firestoreId != undefined){
    this.tileDoc = this.firestore.doc<Resources>(`tiles/${firestoreId}`);
    this.tile = this.tileDoc.valueChanges();
    this.create({ore: 3, wood:3, stone:3});
  }
}

create(tile: Resources){
  this.tileDoc.set(tile);
}
update(tile: Resources){
  this.tileDoc.set(tile);
}


// getTileId(id) {
//   return this.firestore
//   .collection('Tile Ids')
//   .doc(id)
//   .valueChanges()
// }


// createTileData(id){
//   return this.
// }




// createTileData(data){
//   return new Promise<any>((resolve, reject) => {
//     this.firestore
//         .collection("Tiles")
//         .add(data)
//         .then(res => {}, err => reject(err));
//   })
// }

}
