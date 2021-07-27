import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentData, DocumentReference, QuerySnapshot } from '@angular/fire/firestore';
import { Timestamp } from '@firebase/firestore-types';
import { Observable } from 'rxjs';
import { Troop } from '../constants/troops';

export interface Conflict {
  tileId: number,
  attackerId: string,
  defenderId: string,
  attacking: Troop[], // 5 unit ids
  defending: Troop[], // 5 unit ids
  isAttacking: boolean,
  isDefending: boolean,
  isResolved: boolean,
  resolved: Timestamp,
  complete: Timestamp,
  rounds: number,
  id: string, // self-ref
}

export interface ConflictUpdate {
  id: string
  endOfRoundAtk: any,
  endOfRoundDef: any,
  logs: any,
  round: number,
  timestamp: string
}

export interface COMBAT_TROOP {
  name: string,
  type: string,
  uid: string,
  docid: string,
  [Attributes.HP]: number,
  [Attributes.ATTACK]: number,
  [Attributes.DEFENSE]: number,
  [Attributes.MINDAMAGE]: number,
  [Attributes.MAXDAMAGE]: number,
  [Attributes.SKEWDAMAGE]: number
}

export enum Attributes {
  HP = 'HP',
  ATTACK = "Attack",
  DEFENSE = "Defense",
  MINDAMAGE = "Min Hit",
  MAXDAMAGE = "Max Hit",
  SKEWDAMAGE = "Skew Hit"
}


@Injectable({
  providedIn: 'root'
})
export class ConflictDataService {

  constructor(private firestore: AngularFirestore) { }

  async getConflictDocRef(conflictId: string): Promise<AngularFirestoreDocument<Conflict> | undefined> {
    return this.firestore.doc<Conflict>(`conflicts/${conflictId}`);
  }

  getConflictValuesAsObservable(conflictId: string): Observable<Conflict | undefined>{
    return this.firestore.doc<Conflict>(`conflicts/${conflictId}`)
                        .valueChanges({idField: 'id'});
  }

  getConflictUpdatesValues(conflict: Conflict): Observable<ConflictUpdate[]> {
    const resolved: Timestamp = conflict.resolved;
    const rounds = this.getResolvedRounds(resolved.seconds, Math.floor(Date.now() / 1000));
    return this.firestore.collection('conflicts')
                        .doc(`${conflict.id}`)
                        .collection<ConflictUpdate>('conflict-updates', ref=>ref.where('round', '<=', rounds))
                        .valueChanges({idField: 'id'});
  }

  getResolvedRounds(inital: number, now: number) {
    const diff = now - inital;
    const HOURS_PER_ROUND = 3600 * 2
    return Math.floor(diff / HOURS_PER_ROUND);
  }

  async createConflict(tileId: number, uid: string): Promise<DocumentReference<Partial<Conflict>>> {
    return this.firestore.collection<Partial<Conflict>>('conflicts').add({
      isAttacking: false,
      isDefending: false,
      isResolved: false,
      tileId: tileId,
      attackerId: uid,
    })
  }

  async updateConflict(conflictId: string, conflict: Partial<Conflict>): Promise<void> {
    await this.getConflictDocRef(conflictId)
              .then(function(conflictDoc: AngularFirestoreDocument<Conflict> | undefined) {
                if (conflictDoc === undefined) throw Error();
                conflictDoc.update(conflict);
              })
  }
}
