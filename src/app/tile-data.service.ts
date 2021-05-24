import { Injectable, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { EthersService } from './services/ethers.service';

export interface Resources {
  ore: number;
  wood:number;
  stone: number;
}


@Injectable()
export class TileDataService {

  mapId: number = 1;
  private tileDoc: AngularFirestoreDocument<Resources>
  tile: Observable<Resources | undefined>;

  public ethersService: EthersService
  
  constructor(
    private firestore: AngularFirestore,
    private ethers: EthersService,
    ) {this.ethersService = ethers }

 ngOnInit(){
}

async createTile(mapId: number) {
  await this.getTileDocRef(mapId)
            .then(function(tileDoc: AngularFirestoreDocument<Resources> | undefined) {
              if (tileDoc === undefined) throw Error();
              tileDoc.set({ore: 3, wood:3, stone:3});
            })
}


async updateTileOre(mapId: number) {
  await this.getTileDocRef(mapId)
            .then(function(tileDoc: AngularFirestoreDocument<Resources> | undefined) {
              if (tileDoc === undefined) throw Error();
              tileDoc.update({ore:1})
            })
}

async updateTileWood(mapId: number) {
  await this.getTileDocRef(mapId)
            .then(function(tileDoc: AngularFirestoreDocument<Resources> | undefined) {
              if (tileDoc === undefined) throw Error();
              tileDoc.update({wood:1})
            })
}

async updateTileStone(mapId: number) {
  await this.getTileDocRef(mapId)
            .then(function(tileDoc: AngularFirestoreDocument<Resources> | undefined) {
              if (tileDoc === undefined) throw Error();
              tileDoc.update({stone:1})
            })
}


async deleteTile(mapId: number) {
  await this.getTileDocRef(mapId)
            .then(function(tileDoc: AngularFirestoreDocument<Resources> | undefined) {
              if (tileDoc === undefined) throw Error();
              tileDoc.delete()
            })
}


async getTileDocRef(mapId: number): Promise<AngularFirestoreDocument<Resources> | undefined> {
  return this.getFirestoreFromTileId(this.mapId).then((firestoreId) => {
    return this.firestore.doc<Resources>(`tiles/${firestoreId}`);
  }).catch(() => {
    return undefined;
  });
}

async getFirestoreFromTileId(id: number): Promise<string | undefined> {
  return this.ethersService.getMetadataURI(id)
                            .then(function(uri: any) {
                              let uriComponents = uri.split("/");
                              return uriComponents[uriComponents.length - 1];
                            })
                            // .catch(function(error: any) {
                            //   console.log(error);
                            //   return undefined;
                            // });

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
