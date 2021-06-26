import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BattlefieldDataService } from 'src/app/services/battlefield-data.service';
import { CloudFunctionsService } from 'src/app/services/cloud-functions.service';
import { ConflictDataService } from 'src/app/services/conflict-data.service';
import { Troop } from 'src/app/services/troop-data.service';

@Component({
  selector: 'app-planning-table',
  templateUrl: './planning-table.component.html',
  styleUrls: ['./planning-table.component.less']
})
export class PlanningTableComponent implements OnInit {
  @Input() isAttacking: boolean;
  @Input() isDefending: boolean;
  @Input() conflictId: string;

  attacking$: Observable<Troop[]>;
  defending$: Observable<Troop[]>;
  conflictSubscription: Subscription;
  attacking: Troop[];
  defending: Troop[];

  constructor(private battlefieldDataService: BattlefieldDataService,
              private conflictDataService: ConflictDataService,
              private cloudFunctionsService: CloudFunctionsService) { }

  ngOnInit(): void {
    this.attacking$ = this.battlefieldDataService.currentAttacking;
    this.defending$ = this.battlefieldDataService.currentDefending;
  }

  ngOnDestroy(){
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

}
