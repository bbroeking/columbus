import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConflictDataService } from './conflict-data.service';
import { Troop } from './troop-data.service';

@Injectable({
  providedIn: 'root'
})
export class BattlefieldDataService {

  private BATTLEFIELD_MAX = 5;
  
  private attacking: Troop[];
  private defending: Troop[];
  private attackingSubject;
  private defendingSubject;
  currentAttacking: Observable<Troop[]>;
  currentDefending: Observable<Troop[]>;

  constructor(private conflictDataService: ConflictDataService) { 
    this.attacking = [];
    this.defending = [];
    this.attackingSubject = new BehaviorSubject<Troop[]>(this.attacking);
    this.defendingSubject = new BehaviorSubject<Troop[]>(this.defending);
    this.currentAttacking = this.attackingSubject.asObservable();
    this.currentDefending = this.defendingSubject.asObservable();
  }

  addAttacking(troop: Troop) {
    const idx = this.troopInAttacking(troop);
    if (idx < 0){
      this.attacking.push(troop);
      this.attackingSubject.next(this.attacking);  
    }
  }

  removeAttacking(troop: Troop) {
    const idx = this.troopInAttacking(troop);
    if (idx >= 0){
      this.attacking.splice(idx, 1);
      this.attackingSubject.next(this.attacking);  
    }
  }

  addDefending(troop: Troop) {
    const idx = this.troopInDefending(troop);
    if (idx < 0){
      this.defending.push(troop);
      this.defendingSubject.next(this.defending);  
    }
  }

  removeDefending(troop: Troop) {
    const idx = this.troopInDefending(troop);
    if (idx >= 0) {
      this.defending.splice(idx, 1);
      this.defendingSubject.next(this.defending);  
    }
  }

  isInBattlefield(troop: Troop){
    return this.troopInAttacking(troop) >= 0 || this.troopInDefending(troop) >= 0;
  }

  troopInAttacking(troop: Troop){
    return this.attacking.findIndex(i => i.docid == troop.docid);
  }

  troopInDefending(troop: Troop) {
    return this.defending.findIndex(i => i.docid == troop.docid)
  }

  isValidBattlefield(isAttacking: boolean){
    if (!isAttacking)
      return this.BATTLEFIELD_MAX == this.attacking.length;
    else
      return this.BATTLEFIELD_MAX == this.defending.length;
  }

  submitBattlefield(isAttacking: boolean, conflictId: string){
    var conflict = {};
    if (!isAttacking)
      conflict = { 
        attacking: this.attacking,
        isAttacking: true
      }
    else
      conflict = {
        defending: this.defending,
        isDefending: true
      }
    this.conflictDataService.updateConflict(conflictId, conflict);

  }
}