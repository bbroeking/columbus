import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ResearchUpgrade } from '../interfaces/research-upgrade';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ResearchService {

  constructor(private firestore: AngularFirestore) { }

  getResearch(address: string): Observable<ResearchUpgrade | undefined> {
    return this.firestore.collection<ResearchUpgrade>('research')
                          .doc(address)
                          .valueChanges({idField: 'id'});
  }

  updateResearch(address: string, type: string) {
    return this.firestore.collection<ResearchUpgrade>('research')
                  .doc(address)
                  .update({
                    upgrades: firebase.default.firestore.FieldValue.arrayUnion(type),
                  }).catch((error) => error);
  }
}
