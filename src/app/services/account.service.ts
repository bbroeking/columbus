import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

export interface AccountData {
  id: string,
  minerals: number,
  energy: number
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

  updateAccountData(address: string, acctData: Partial<AccountData>) {
    const incrementMinerals: number = acctData.minerals || 0;
    const incrementEnergy: number = acctData.energy || 0;

    return this.firestore.collection('accounts')
                        .doc(address)
                        .update({
                          'minerals': firebase.default.firestore.FieldValue.increment(incrementMinerals),
                          'energy': firebase.default.firestore.FieldValue.increment(incrementEnergy),
                        });
  }
}
