import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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

  constructor(private firestore: AngularFirestore) { }

  async getTroopsDocRef(troopId: string): Promise<AngularFirestoreDocument<Troop> | undefined> {
    return this.firestore.doc<Troop>(`troops/${troopId}`);
  }

  getTroopsByUser(uid: string): Observable<Troop[]> {
    return this.firestore.collection<Troop>("troops", ref => ref.where('uid', '==', uid)).valueChanges({idField: 'docid'});
  }
}
