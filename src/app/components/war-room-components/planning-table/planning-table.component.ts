import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BattlefieldDataService } from 'src/app/services/battlefield-data.service';
import { Troop } from 'src/app/services/troop-data.service';

@Component({
  selector: 'app-planning-table',
  templateUrl: './planning-table.component.html',
  styleUrls: ['./planning-table.component.less']
})
export class PlanningTableComponent implements OnInit {
  @Input() isAttacking: boolean;
  @Input() conflictId: string;

  attacking$: Observable<Troop[]>;
  defending$: Observable<Troop[]>;

  constructor(private battlefieldDataService: BattlefieldDataService) { }

  ngOnInit(): void {
    this.attacking$ = this.battlefieldDataService.currentAttacking;
    this.defending$ = this.battlefieldDataService.currentDefending;
  }

  remove(troop: Troop) {
    if (this.isAttacking)
      this.battlefieldDataService.removeAttacking(troop);
    else 
      this.battlefieldDataService.removeDefending(troop);
  }

  submitTable() {
    this.battlefieldDataService.submitBattlefield(this.isAttacking, this.conflictId);
  }
  validTable() {
    this.battlefieldDataService.isValidBattlefield(this.isAttacking);
  }

}
