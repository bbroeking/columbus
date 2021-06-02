import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Resources {
  minerals: number,
  energy: number
}

export interface Tile { // data in the tile
  minerals: number,
  energy: number
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

  constructor(
    private firestore: AngularFirestore,
    ) {}

  async getTileDocRef(uri: string): Promise<AngularFirestoreDocument<Resources> | undefined> {
    return this.firestore.doc<Resources>(`tiles/${uri}`);
  }

  cleanURI(fullURI: string): string {
    let uriComponents = fullURI.split("/");
    return uriComponents[uriComponents.length - 1];  
  }

  async createTile(uri: string): Promise<void> {
    const cleanedURI = this.cleanURI(uri);
    await this.getTileDocRef(cleanedURI)
              .then(function(tileDoc: AngularFirestoreDocument<Resources> | undefined) {
                if (tileDoc === undefined) throw Error();
                tileDoc.set({minerals: 200, energy: 100});
                const strucutresRef = tileDoc.collection('structures');
                strucutresRef.add({position: 0});
                strucutresRef.add({position: 1});
                strucutresRef.add({position: 2});
                strucutresRef.add({position: 3});
              })
  }

  async updateTileResource(uri: string, resources: Partial<Resources>): Promise<void> {
    const cleanedURI = this.cleanURI(uri);
    await this.getTileDocRef(cleanedURI)
              .then(function(tileDoc: AngularFirestoreDocument<Resources> | undefined) {
                if (tileDoc === undefined) throw Error();
                tileDoc.update(resources);
              })
  }

  getTileValuesAsObservable(uri: string): Observable<Tile | undefined>{
    const cleanedURI = this.cleanURI(uri);
    return this.firestore.doc<Tile>(`tiles/${cleanedURI}`)
                        .valueChanges();
  }

  async deleteTile(uri: string) {
    const cleanedURI = this.cleanURI(uri);
    await this.getTileDocRef(cleanedURI)
              .then(function(tileDoc: AngularFirestoreDocument<Resources> | undefined) {
                if (tileDoc === undefined) throw Error();
                tileDoc.delete()
              })
  }

  async getTileStructures(uri: string): Promise<Structure[]> {
    const cleanedURI = this.cleanURI(uri);
    return this.firestore.collection<Structure>(`tiles/${cleanedURI}/structures`)
                        .get()
                        .toPromise()
                        .then((query) => {
                          let structures: Structure[] = [];
                          query.forEach((doc) => {
                            structures.push(doc.data() as Structure)
                          })
                          return structures;
    });
  }

  async getOrderedStructures(uri: string){
    const cleanedURI = this.cleanURI(uri);
    return this.firestore.collection('tiles')
                          .doc(cleanedURI)
                          .collection<Building>('structures', ref => ref.orderBy('position'))
                          .valueChanges()
  }
}
