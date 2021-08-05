import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Troop, TROOP_MODEL } from '../constants/troops';
import { MetamaskService } from './metamask.service';
import { QueueItem } from './queue.service';
import * as _ from 'underscore';
import { TROOPS } from '../constants/troops';

@Injectable({
  providedIn: 'root'
})
export class TroopDataService {

  constructor(
    private firestore: AngularFirestore,
    private metmaskService: MetamaskService) { }

  async getTroopsDocRef(troopId: string): Promise<AngularFirestoreDocument<Troop> | undefined> {
    return this.firestore.doc<Troop>(`troops/${troopId}`);
  }
 
  getTroopData(type: string): TROOP_MODEL {
    let troop: TROOP_MODEL = TROOPS[type];
    return troop;
  }

  addToReserves(queueItems: QueueItem[]) {
    const account = this.metmaskService.account.value;
    const queueItem = queueItems[0];
    this.firestore.collection('troops')
                  .doc()
                  .set({
                    name: "somename",
                    type: queueItem.type,
                    rank: 1,
                    uid: account
                  })
  }

  getTroopsByUser(uid: string): Observable<Troop[]> {
    return this.firestore.collection<Troop>("troops", ref => ref.where('uid', '==', uid))
                .valueChanges({idField: 'id'});
  }

  canPromote(troops: Troop[]): boolean {
    if(troops.length == 0) return false;
    const isMax = _.any(troops, res => res.rank > 2);
    if (isMax) return false;
    const rank = troops[0].rank;
    const type = troops[0].type;
    const isSameType = _.every(troops, res => res.type == type);
    const isSameRank = _.every(troops, res => res.rank == rank)
    return isSameRank && isSameType && troops.length == 3;
  }

  private getPromotion(troops: Troop[]): Partial<Troop> {
    const account = this.metmaskService.account.value;
    const troop: Partial<Troop> = {
      name: "Next Rank",
      type: troops[0].type,
      uid: account,
      rank: troops[0].rank + 1
    }
    return troop;
  }

  deployTroops(troops: Troop[]) {
    troops.forEach((troop) => {
      this.firestore.collection<Troop>("troops")
                    .doc(troop.id)
                    .update({ 'deployed': true })
    });
  }

  promoteTroop(troops: Troop[]) {
    troops.forEach((res) => this.firestore.collection<Troop>("troops").doc(res.id).delete());
    const promoteTroop: Partial<Troop> = this.getPromotion(troops);
    this.firestore.collection('troops')
                  .doc()
                  .set(promoteTroop);
    return promoteTroop;
  }
}
