import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { BattlefieldDataService } from 'src/app/services/battlefield-data.service';
import { ConflictDataService } from 'src/app/services/conflict-data.service';
import { EthersService } from 'src/app/services/ethers.service';
import { MetamaskService } from 'src/app/services/metamask.service';
import { Troop } from 'src/app/services/troop-data.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-planning-table',
  templateUrl: './planning-table.component.html',
  styleUrls: ['./planning-table.component.less']
})
export class PlanningTableComponent implements OnInit {
  @Input() isAttacking: boolean;
  @Input() isDefending: boolean;
  @Input() attackerId: string;
  @Input() defenderId: string;
  @Input() tileId: string;
  @Input() conflictId: string;

  attacking$: Observable<Troop[]>;
  defending$: Observable<Troop[]>;
  conflictSubscription: Subscription;
  attacking: Troop[];
  defending: Troop[];

  constructor(private battlefieldDataService: BattlefieldDataService,
              private conflictDataService: ConflictDataService,
              private authService: AuthService,
              private router: Router,
              private ethers: EthersService,
              private metamaskService: MetamaskService) { }

  async ngOnInit() {
    // if incorrect, navigate away for now.
    let valid: boolean = await this.isCorrectUser()
    if (!valid) {
      this.router.navigate(['/reports']);
    }
    this.attacking$ = this.battlefieldDataService.currentAttacking;
    this.defending$ = this.battlefieldDataService.currentDefending;
  }

  ngOnDestroy(){
    if (this.conflictSubscription)
      this.conflictSubscription.unsubscribe();
  }

  ngOnChanges() {
    if (!this.isAttacking && !this.isDefending)
      this.attacking$ = this.battlefieldDataService.currentAttacking;
    else if (this.isAttacking && !this.isDefending) {
      this.defending$ = this.battlefieldDataService.currentDefending;
      this.conflictSubscription = this.conflictDataService.getConflictValuesAsObservable(this.conflictId)
                                                          .pipe(
                                                            map(val => val?.attacking || [])
                                                          ).subscribe((troops) => this.attacking = troops)
    }
    else 
      this.conflictSubscription = this.conflictDataService.getConflictValuesAsObservable(this.conflictId)
                                                          .subscribe((conflict) => {
                                                            this.attacking = conflict?.attacking || []
                                                            this.defending = conflict?.defending || []
                                                          })
  }

  remove(troop: Troop) {
    if (!this.isAttacking)
      this.battlefieldDataService.removeAttacking(troop);
    else 
      this.battlefieldDataService.removeDefending(troop);
  }

  async submitTable() {
    this.battlefieldDataService.submitBattlefield(this.isAttacking, this.conflictId);
  }

  validTable() {
    this.battlefieldDataService.isValidBattlefield(this.isAttacking);
  }

  async isCorrectUser(): Promise<boolean> {
    const account = this.metamaskService.getConnectedAccount();
    const attackerOnOffense = account == this.attackerId && !this.isAttacking;
    const defenderOnDefense = account == this.defenderId && this.isAttacking && !this.isDefending;
    const attackAndDefenseSet = this.isAttacking && this.isDefending;
    return attackerOnOffense || defenderOnDefense || attackAndDefenseSet;
  }
}
