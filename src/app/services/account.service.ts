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
    private firestore: AngularFirestore, 
  ) { }

  getAccountAsObservable(addr: string) {
    return this.firestore.collection('accounts')
                          .doc<AccountData>(addr)
                          .valueChanges({idField: 'id'});
  }

  updateAccountData(addr: string, acctData: Partial<AccountData>) {
    const incrementMinerals: number = acctData.minerals || 0;
    const incrementEnergy: number = acctData.energy || 0;

    return this.firestore.collection('accounts')
                        .doc(addr)
                        .update({
                          'minerals': firebase.default.firestore.FieldValue.increment(incrementMinerals),
                          'energy': firebase.default.firestore.FieldValue.increment(incrementEnergy),
                        });
  }
}
