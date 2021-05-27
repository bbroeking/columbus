import { Injectable, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { EthersService } from './ethers.service';
import { map } from 'rxjs/operators';

export interface Resources {
  ore: number;
  wood:number;
  stone: number;
}

export interface Structure {
  id: string;
  position: number;
}

@Injectable()
export class TileDataService {

  constructor(
    private firestore: AngularFirestore,
    private ethers: EthersService,
    ) {}

 ngOnInit(){
}

async createTile(mapId: number) {
  await this.getTileDocRef(mapId)
            .then(function(tileDoc: AngularFirestoreDocument<Resources> | undefined) {
              if (tileDoc === undefined) throw Error();
              tileDoc.set({ore: 3, wood:3, stone:3});
            })
}


async updateTileResource(mapId: number, resources: Partial<Resources>) {
  await this.getTileDocRef(mapId)
            .then(function(tileDoc: AngularFirestoreDocument<Resources> | undefined) {
              if (tileDoc === undefined) throw Error();
              tileDoc.update(resources);
            })
}


async deleteTile(mapId: number) {
  await this.getTileDocRef(mapId)
            .then(function(tileDoc: AngularFirestoreDocument<Resources> | undefined) {
              if (tileDoc === undefined) throw Error();
              tileDoc.delete()
            })
}

async getTileStructures(mapId: number) {
  return this.getFirestoreFromTileId(mapId).then((firestoreId) => {
    return this.firestore.doc<Structure>(`tiles/${firestoreId}/structures/GowwAKThlv0qQP0yYadA`).valueChanges();
  }).catch((error) => {
    console.log(error);
    return undefined;
  });

  // this.firestore.collection()
  // return this.getTileDocRef(mapId)
  //           .then(function(tileDoc: AngularFirestoreDocument<Resources> | undefined) {
  //             if (tileDoc === undefined) throw Error();
  //             return tileDoc.collection('structures').valueChanges();
  //             // return tileDoc.collection('structures').snapshotChanges().pipe(
  //             //   map(actions => {
  //             //     console.log(actions);
  //             //     return actions.map(p => {
  //             //       const place = p.payload.doc;
  //             //       const id = place.id;
  //             //       return { id, ...place.data() } as Structure;
  //             //     });
  //             //   })
  //             // )
  //           });
}

async getTileDocRef(mapId: number): Promise<AngularFirestoreDocument<Resources> | undefined> {
  return this.getFirestoreFromTileId(mapId).then((firestoreId) => {
    return this.firestore.doc<Resources>(`tiles/${firestoreId}`);
  }).catch((error) => {
    console.log(error);
    return undefined;
  });
}

async getFirestoreFromTileId(id: number): Promise<string | undefined> {
  return this.ethers.getMetadataURI(id)
                            .then(function(uri: any) {
                              let uriComponents = uri.split("/");
                              return uriComponents[uriComponents.length - 1];
                            })
  }
}
