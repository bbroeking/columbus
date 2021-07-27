import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Coordinate } from '../models/coordinate.model';
import { AccountData, AccountService } from './account.service';
import { LandDiscovery } from './ethers.service';
import { QueueItem } from './queue.service';
import * as firebase from 'firebase/app';
import { Timestamp } from '@firebase/firestore-types';
import { MetamaskService } from './metamask.service';
import * as _ from 'underscore';
import { LandAttributes } from '../models/land-attributes.model';
import { StructureType } from '../interfaces/structure-type';

export interface Tile { // data in the tile
  id: string, // metadata addr
  ownerId: string, // addr
  tokenId: number, // mint number
  conflictId: string,
  mineralRate: number,
  energyRate: number,
  fortification: number,
  lastCollected: Timestamp,
  inConflict: boolean,
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

export interface UnitStructure extends Structure {

}

export interface ResearchStructure extends Structure {

}

export interface ResourceStructure extends Structure{
  mineralRate?: number,
  energyRate?: number,
  lastCollected: Timestamp,
}

@Injectable()
export class TileDataService {

  constructor(
    private firestore: AngularFirestore,
    private metamaskService: MetamaskService,
    private accountService: AccountService) {}

  async getTileDocRef(tokenId: number): Promise<AngularFirestoreDocument<Tile> | undefined> {
    return this.firestore.doc<Tile>(`tiles/${tokenId}`);
  }

  async createTile(landDiscovery: LandDiscovery, attributes: Partial<LandAttributes>): Promise<void> {
    const tileRef = this.firestore.doc<Partial<Tile>>(`tiles/${landDiscovery.uuid}`)
    const landObj: Partial<Tile> = _.extend({
      tokenId: landDiscovery.tokenId,
      lastCollected: firebase.default.firestore.FieldValue.serverTimestamp(),
      inConflict: false,
    }, attributes);
    tileRef.set(landObj);
    const structuresRef = tileRef.collection('structures');
    structuresRef.add({position: 0, built: false})
    structuresRef.add({position: 1, built: false})
    structuresRef.add({position: 2, built: false})
    structuresRef.add({position: 3, built: false})
  }

  async updateTile(tokenId: number, resources: Partial<Tile>): Promise<void> {
    await this.getTileDocRef(tokenId)
              .then(function(tileDoc: AngularFirestoreDocument<Tile> | undefined) {
                if (tileDoc === undefined) throw Error();
                tileDoc.update(resources);
              })
  }

  getTileValuesAsObservable(tokenId: number): Observable<Tile | undefined>{
    return this.firestore.doc<Tile>(`tiles/${tokenId}`)
                        .valueChanges({idField: 'id'});
  }

  async deleteTile(tokenId: number) {
    await this.getTileDocRef(tokenId)
              .then(function(tileDoc: AngularFirestoreDocument<Tile> | undefined) {
                if (tileDoc === undefined) throw Error();
                tileDoc.delete()
              });
  }

  async getTileStructures(tokenId: number): Promise<Structure[]> {
    return this.firestore.collection<Structure>(`tiles/${tokenId}/structures`)
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

  getTileStructuresAsObservable(tokenId: number): Observable<Structure[]> {
    return this.firestore.collection<Structure>(`tiles/${tokenId}/structures`, ref => ref.orderBy('position'))
                        .valueChanges({idField: 'sid'});
  }

  getTileStructureAsObservable(tokenId: number, structureId: string): Observable<Structure | undefined> {
    return this.firestore.doc<Structure>(`tiles/${tokenId}/structures/${structureId}`).valueChanges();
  }

  updateStructure(tokenId: number, sid: string, data: any) {
    return this.firestore.collection('tiles')
                          .doc(`${tokenId}`)
                          .collection('structures')
                          .doc(sid)
                          .update(data)
  }

  collectResources(tokenId: number, update: Partial<AccountData>) {
    const account = this.metamaskService.account.getValue();
    this.firestore.collection('tiles')
                  .doc(`${tokenId}`)
                  .update({
                    lastCollected: firebase.default.firestore.FieldValue.serverTimestamp()
                  });
    this.accountService.updateAccountData(account, update);
  }

  collectRefineryResources(tokenId: number, structureId:string, update: Partial<AccountData>) {
    const account = this.metamaskService.account.getValue();
    this.firestore.collection('tiles')
                  .doc(`${tokenId}`)
                  .collection('structures')
                  .doc(`${structureId}`)
                  .update({
                    lastCollected: firebase.default.firestore.FieldValue.serverTimestamp()
                  });
    this.accountService.updateAccountData(account, update);
  }

  queueBuildStructure(tokenId:number, sid:string, queueItem: QueueItem) {
    const data = { queued: queueItem };
    return this.updateStructure(tokenId, sid, data);
  }

  buildStructure(tokenId: number, sid: string, type: StructureType){
    const data = {
      'built': true,
      'type': type.toString(),
      'level': 1
    }
    return this.updateStructure(tokenId, sid, data);
  }

  updateTileBuild(tokenId: number, sid:string, id:string, level:number){
    const data = {
      'id': id,
      'level': level
    };
    return this.updateStructure(tokenId, sid, data);
  }

  upgradeTileBuild(tokenId:number, sid:string, level:number){
    const data = { 'level': level + 1 };
    return this.updateStructure(tokenId, sid, data);
  }
}
