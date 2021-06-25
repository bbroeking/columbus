import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Troop } from './troop-data.service';

export interface Conflict {
  tile: string,
  attacking: Troop[], // 5 unit ids
  defending: Troop[], // 5 unit ids
  conflictUpdatesId: string, // collection with updates of conflict
  isAttacking: boolean,
  isDefending: boolean,
  isResolved: boolean,
}

export interface ConflictUpdates {
  updates: ConflictUpdate[]
}

export interface ConflictUpdate {
  message: string,
  timestamp: string,
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
                        .valueChanges();
  }

  async getConflictUpdatesDocRef(conflictUpdatesId: string): Promise<AngularFirestoreDocument<ConflictUpdates> | undefined> {
    return this.firestore.doc<ConflictUpdates>(`conflict-updates/${conflictUpdatesId}`);
  }

  getConflictUpdatesValuesAsObservable(conflictUpdatesId: string): Observable<ConflictUpdates | undefined>{
    return this.firestore.doc<ConflictUpdates>(`conflict-updates/${conflictUpdatesId}`)
                        .valueChanges();
  }

  async updateConflict(conflictId: string, conflict: Partial<Conflict>): Promise<void> {
    await this.getConflictDocRef(conflictId)
              .then(function(conflictDoc: AngularFirestoreDocument<Conflict> | undefined) {
                if (conflictDoc === undefined) throw Error();
                conflictDoc.update(conflict);
              })
  }
}
