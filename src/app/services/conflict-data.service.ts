import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Conflict {
  tile: string,
  attacking: string[], // 5 unit ids
  defending: string[], // 5 unit ids
  conflict_updates: string, // collection with updates of conflict
  isAttacking: boolean,
  isDefending: boolean,
  isResolved: boolean,
}

export interface ConflictUpdates {
  updates: string[]
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
}
