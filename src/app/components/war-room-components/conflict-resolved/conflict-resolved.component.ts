import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { Conflict, ConflictDataService, ConflictUpdate } from 'src/app/services/conflict-data.service';
import { MetamaskService } from 'src/app/services/metamask.service';

@Component({
  selector: 'app-conflict-resolved',
  templateUrl: './conflict-resolved.component.html',
  styleUrls: ['./conflict-resolved.component.less']
})
export class ConflictResolvedComponent implements OnInit {
  @Input() conflict: Conflict;
  conflictUpdates$: Observable<ConflictUpdate[]>;
  
  mineralReward: number;
  energyReward: number;
  dominationReward: number;
  rewardCollected: boolean;
  constructor(
    private metamaskService: MetamaskService,
    private conflictDataService: ConflictDataService,
    private accountService: AccountService) { }

  async ngOnInit() {
    this.mineralReward = 100;
    this.energyReward = 50;
    this.dominationReward = 0.25;
    this.rewardCollected = this.conflict.isResolved;
    this.conflictUpdates$ = await this.conflictDataService.getConflictUpdatesValues(this.conflict);
  }

  collectReward() {
    this.metamaskService.setConnectedAccount();
    const address = this.metamaskService.account.value;
    this.accountService.updateAccountData(address, {
      'domination': this.dominationReward,
      'minerals': this.mineralReward,
      'energy': this.energyReward
    });
    this.conflictDataService.updateConflict(this.conflict.id, {
      'isResolved': true
    });
    this.rewardCollected = true;
  }
}
