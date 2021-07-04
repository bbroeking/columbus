import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { LandDiscovery } from './ethers.service';

export interface Tile { // data in the tile
  minerals: number,
  energy: number,
  inConflict: boolean,
  conflictId: string,
  ownerId: string,
  id: string,
  tokenId: number
}

export interface Structure {
  id: string;
  position: number;
  sid: string;
  level: number;
}

@Injectable()
export class TileDataService {

  constructor(private firestore: AngularFirestore) {}

  async getTileDocRef(uri: string): Promise<AngularFirestoreDocument<Tile> | undefined> {
    return this.firestore.doc<Tile>(`tiles/${uri}`);
  }

  cleanURI(fullURI: string): string {
    let uriComponents = fullURI.split("/");
    return uriComponents[uriComponents.length - 1];  
  }

  async createTile(landDiscovery: LandDiscovery): Promise<void> {
    const tileRef = this.firestore.doc<Partial<Tile>>(`tiles/${landDiscovery.uuid}`)
    tileRef
      .set({
        tokenId: landDiscovery.tokenId,
        minerals: 200,
        energy: 100,
      });
      const strucutresRef = tileRef.collection('structures');
      strucutresRef.add({position: 0})
      strucutresRef.add({position: 1})
      strucutresRef.add({position: 2})
      strucutresRef.add({position: 3})
  }

  async updateTile(uri: string, resources: Partial<Tile>): Promise<void> {
    const cleanedURI = this.cleanURI(uri);
    await this.getTileDocRef(cleanedURI)
              .then(function(tileDoc: AngularFirestoreDocument<Tile> | undefined) {
                if (tileDoc === undefined) throw Error();
                tileDoc.update(resources);
              })
  }

  getTileValuesAsObservable(uri: string): Observable<Tile | undefined>{
    const cleanedURI = this.cleanURI(uri);
    return this.firestore.doc<Tile>(`tiles/${cleanedURI}`)
                        .valueChanges({idField: 'id'});
  }

  async deleteTile(uri: string) {
    const cleanedURI = this.cleanURI(uri);
    await this.getTileDocRef(cleanedURI)
              .then(function(tileDoc: AngularFirestoreDocument<Tile> | undefined) {
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

  getTileStructuresAsObservable(uri: string): Observable<Structure[]> {
    const cleanedURI = this.cleanURI(uri);
    return this.firestore.collection<Structure>(`tiles/${cleanedURI}/structures`)
                        .valueChanges();
  }

  async getOrderedStructures(uri: string){
    const cleanedURI = this.cleanURI(uri);
    return this.firestore.collection('tiles')
                          .doc(cleanedURI)
                          .collection<Structure>('structures', ref => ref.orderBy('position'))
                          .valueChanges()
  }


  async updateTileBuild(uri: string, sid:string, id:string, level:number){
    const cleanedURI = this.cleanURI(uri);
    return this.firestore.collection('tiles')
                         .doc(cleanedURI)
                         .collection('structures')
                         .doc(sid).update({"id":id, "level":level})

  }
  async upgradeTileBuild(uri:string, sid:string, level:number){
    const cleanedURI = this.cleanURI(uri);
    const newLevel = level + 1
    return this.firestore.collection('tiles')
                         .doc(cleanedURI)
                         .collection('structures')
                         .doc(sid).update({"level":newLevel})
  }
}
