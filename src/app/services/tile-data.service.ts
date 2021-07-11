import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { StructureType } from '../constants/buildings';
import { Coordinate } from '../models/coordinate.model';
import { LandDiscovery } from './ethers.service';
import { QueueItem } from './queue.service';

export interface Tile { // data in the tile
  minerals: number,
  energy: number,
  inConflict: boolean,
  conflictId: string,
  ownerId: string,
  id: string,
  tokenId: number,
  coordinate: Coordinate,
}

export interface Structure {
  id: string;
  position: number;
  queued: QueueItem;
  sid: string;
  level: number;
  built: boolean;
  queue: QueueItem[];
  type: string;
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
    strucutresRef.add({position: 0, built: false})
    strucutresRef.add({position: 1, built: false})
    strucutresRef.add({position: 2, built: false})
    strucutresRef.add({position: 3, built: false})
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
    return this.firestore.collection<Structure>(`tiles/${cleanedURI}/structures`, ref => ref.orderBy('position'))
                        .valueChanges({idField: 'sid'});
  }

  updateStructure(uri: string, sid: string, data: any) {
    const cleanedURI = this.cleanURI(uri);
    return this.firestore.collection('tiles')
                          .doc(cleanedURI)
                          .collection('structures')
                          .doc(sid)
                          .update(data)
  }

  queueBuildStructure(uri:string, sid:string, queueItem: QueueItem) {
    const data = {
      queued: queueItem
    }
    return this.updateStructure(uri, sid, data);
  }

  buildStructure(uri: string, sid: string, type: StructureType){
    const data = {
      'built': true,
      'type': type.toString(),
      'level': 1
    }
    return this.updateStructure(uri, sid, data);
  }

  updateTileBuild(uri: string, sid:string, id:string, level:number){
    const data = {
      'id': id,
      'level': level
    };
    return this.updateStructure(uri, sid, data);
  }

  upgradeTileBuild(uri:string, sid:string, level:number){
    const data = {
      'level': level + 1
    }
    return this.updateStructure(uri, sid, data);
  }
}
