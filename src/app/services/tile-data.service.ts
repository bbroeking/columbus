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

export interface Building {
  position: number
}

@Injectable()
export class TileDataService {


  mapId: number = 1;
  private tileDoc: AngularFirestoreDocument<Resources>
  private accountDoc: AngularFirestoreDocument<Resources>
  account:Observable<Resources | undefined>;
  tile: Observable<Resources | undefined>;
  accountId: number = 2;

  public ethersService: EthersService

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

}


async getNestedDoc(mapId: number){
  return this.getFirestoreFromTileId(mapId).then((firestoreId) => {
      return (this.firestore.collection('tiles').doc(firestoreId).collection<Building>('structures', ref => ref.orderBy('position')).valueChanges())
      // console.log(values)
  }).catch((error) => {
    console.log(error);
    return undefined;
  });
}



  
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


async getTileDocRef(mapId: number): Promise<AngularFirestoreDocument<Resources> | undefined> {
  return this.getFirestoreFromTileId(mapId).then((firestoreId) => {
    return this.firestore.doc<Resources>(`tiles/${firestoreId}`);
  }).catch((error) => {
    console.log(error);
    return undefined;
  });
}

async getAccountDocRef(accountId: number): Promise<AngularFirestoreDocument<Resources> | undefined> {
  return this.getFirestoreFromTileId(accountId).then((firestoreId) => {
    return this.firestore.doc<Resources>(`accounts/${firestoreId}`);
  }).catch((error) => {
    console.log(error);
    return undefined;
  });
}



async createAccount(){
  let firestoreId = await this.getFirestoreFromTileId(this.accountId);
  if (typeof firestoreId != undefined){
    this.accountDoc = this.firestore.doc<Resources>(`accounts/${firestoreId}`);
    this.account = this.accountDoc.valueChanges();
    this.accountDoc.set({ore: 0, wood:0, stone:0});
  }
}

async getTileValues(mapId: number){
  return ( this.firestore
              .doc('tiles/1923048b-b05e-4617-8498-553f9c931a96').valueChanges().subscribe(values => {
                console.log(values)
                let Newvalues = values
              }))
}

async tile2Account(){
  let firestoreId = await this.getFirestoreFromTileId(this.mapId);
  if (firestoreId != undefined){
    this.tileDoc = this.firestore.doc<Resources>(`tiles/${firestoreId}`);
    return (this.tileDoc
                .valueChanges().subscribe(async values => {
                  if(values === undefined) return Error();
                  let accountDocRef = await this.getAccountDocRef(this.accountId);
                  if (accountDocRef === undefined) return Error();
                  return accountDocRef.set(values);
                }))
  }
 else throw Error();
}








// async updateAccount(account){
//   for (tiles in account){
//     read firebase(tiles)
//     increment firebase(account)
//   }

// }

async getFirestoreFromTileId(id: number): Promise<string | undefined> {
  return this.ethers.getMetadataURI(id)
                            .then(function(uri: any) {
                              let uriComponents = uri.split("/");
                              return uriComponents[uriComponents.length - 1];
                            })
  }
}
