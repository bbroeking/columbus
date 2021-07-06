import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MetamaskService } from './metamask.service';
import { QueueItem } from './queue.service';

export interface Troop {
  name: string,
  type: string,
  uid: string,
  docid: string,
}

export enum Troops {
  
}

@Injectable({
  providedIn: 'root'
})
export class TroopDataService {

  constructor(
    private firestore: AngularFirestore,
    private metmaskService: MetamaskService) { }

  async getTroopsDocRef(troopId: string): Promise<AngularFirestoreDocument<Troop> | undefined> {
    return this.firestore.doc<Troop>(`troops/${troopId}`);
  }

  addToReserves(queueItems: QueueItem[]) {
    const account = this.metmaskService.account.value;
    const queueItem = queueItems[0];
    this.firestore.collection('troops')
                  .doc()
                  .set({
                    name: "somename",
                    type: queueItem.type,
                    uid: account
                  })
  }

  getTroopsByUser(uid: string): Observable<Troop[]> {
    return this.firestore.collection<Troop>("troops", ref => ref.where('uid', '==', uid)).valueChanges({idField: 'docid'});
  }
}
