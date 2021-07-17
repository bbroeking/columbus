import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

export interface Player {
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
                          .doc<Player>(addr)
                          .valueChanges();
  }
}
