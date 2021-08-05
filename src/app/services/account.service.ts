import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { first } from 'rxjs/operators';

export interface AccountData {
  id: string,
  minerals: number,
  energy: number,
  domination: number,
}
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private firestore: AngularFirestore) { }

  getAccountAsObservable(address: string) {
    return this.firestore.collection('accounts')
                          .doc<AccountData>(address)
                          .valueChanges({idField: 'id'});
  }

  initAccount(address: string) {
    this.firestore.collection('accounts')
      .doc(address)
      .get()
      .pipe(first())
      .subscribe((doc) => {
        if(!doc.exists) {
          this.firestore.collection('accounts')
                        .doc(address)
                        .set({
                          'minerals': 0,
                          'energy': 0,
                          'domination': 1,
                        });
        }
      });
  }

  updateAccountData(address: string, acctData: Partial<AccountData>) {
    const incrementMinerals: number = acctData.minerals || 0;
    const incrementEnergy: number = acctData.energy || 0;
    const incrementDomination: number = acctData.domination || 0;
    return this.firestore.collection('accounts')
                        .doc(address)
                        .update({
                          'minerals': firebase.default.firestore.FieldValue.increment(incrementMinerals),
                          'energy': firebase.default.firestore.FieldValue.increment(incrementEnergy),
                          'domination': firebase.default.firestore.FieldValue.increment(incrementDomination)
                        });
  }
}
