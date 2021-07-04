import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentData, DocumentReference, QuerySnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Troop } from './troop-data.service';

export interface Conflict {
  tileId: string,
  attackerId: string,
  defenderId: string,
  attacking: Troop[], // 5 unit ids
  defending: Troop[], // 5 unit ids
  isAttacking: boolean,
  isDefending: boolean,
  isResolved: boolean,
  id: string, // self-ref
}

export interface ConflictUpdate {
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

  async getConflictUpdatesValues(conflictId: string): Promise<QuerySnapshot<DocumentData>| undefined> {
    let docRef = await this.getConflictDocRef(conflictId);
    return docRef?.collection<ConflictUpdate>('conflict-updates').ref.orderBy('round').get()
  }

  async createConflict(tileId: string, uid: string): Promise<DocumentReference<Partial<Conflict>>> {
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
