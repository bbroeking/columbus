import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Troop } from 'src/app/constants/troops';
import { BattlefieldDataService } from 'src/app/services/battlefield-data.service';
import { Conflict, ConflictDataService } from 'src/app/services/conflict-data.service';
import { EthersService } from 'src/app/services/ethers.service';
import { MetamaskService } from 'src/app/services/metamask.service';
import { TroopDataService } from 'src/app/services/troop-data.service';
import * as _ from 'underscore';

export enum WarRoomState {
  ATTACKER_EDIT,
  DEFENDER_EDIT,
  VIEW
}

@Component({
  selector: 'app-war-room',
  templateUrl: './war-room.component.html',
  styleUrls: ['./war-room.component.less']
})
export class WarRoomComponent implements OnInit {
  conflictId: string;
  conflictData$: Observable<Conflict | undefined>;
  conflictData: Conflict | undefined;
  troops$: Observable<Troop[]>;
  conflictSub: Subscription;

  attacking$: Observable<Troop[]>;
  defending$: Observable<Troop[]>;
  conflictSubscription: Subscription;
  attacking: Troop[];
  defending: Troop[];

  planAttack: Troop[];
  planDefense: Troop[];

  isAttacking: boolean;
  isDefending: boolean;
  attackerId: string;
  defenderId: string;
  tileId: number;
  state: WarRoomState;
  resolvedConflict: boolean;

  constructor(
    private route: ActivatedRoute,
    private metamaskService: MetamaskService,
    private ethers: EthersService,
    private conflictDataService: ConflictDataService,
    private battlefieldDataService: BattlefieldDataService,
    private troopDataService: TroopDataService,
    private conflictDataSerice: ConflictDataService) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.conflictId = params.get('conflictId') || "";
    });
    this.conflictData$ = this.conflictDataSerice.getConflictValuesAsObservable(this.conflictId);

    this.conflictSubscription = this.conflictData$.subscribe(async (conflictData) => {
      if(conflictData) {
        this.isAttacking = conflictData.isAttacking;
        this.isDefending = conflictData.isDefending;
        this.attackerId = conflictData.attackerId;
        this.defenderId = conflictData.defenderId;
        this.tileId = conflictData.tileId;
        this.state = await this.getState()
      }
    });
    this.planAttack = [];
    this.planDefense = [];
    // garrison
    const account = await this.metamaskService.getConnectedAccount();
    if (account)
      this.troops$ = this.troopDataService.getTroopsByUser(account);

    this.conflictSubscription = this.conflictDataService.getConflictValuesAsObservable(this.conflictId)
                                                        .subscribe((conflict) => {
                                                          this.conflictData = conflict;
                                                          this.attacking = conflict?.attacking || [];
                                                          this.defending = conflict?.defending || [];
                                                          this.checkConflictComplete();
                                                        });
  }

  ngOnChanges() {
    this.checkConflictComplete();
  }

  ngOnDestroy() {
    if (this.conflictSubscription)
      this.conflictSubscription.unsubscribe();
  }

  checkConflictComplete() {
    if(this.conflictData) {
      const complete = this.conflictData.complete;
      if (complete)
        this.resolvedConflict = complete.seconds < (Date.now() / 1000);
    }
  }

  async submitTable() {
    if(this.state == 0)
      this.battlefieldDataService.submitBattlefield(this.isAttacking, this.conflictId, this.planAttack);
    else if(this.state == 1)
      this.battlefieldDataService.submitBattlefield(this.isAttacking, this.conflictId, this.planDefense);
    this.getState();
  }

  validBattlefield() {
    if(this.state == 0)
      this.battlefieldDataService.isValidBattlefield(this.planAttack) && this.state == 0;
    else if(this.state == 1)
      this.battlefieldDataService.isValidBattlefield(this.planDefense) && this.state == 1;
  }
  
  async getState(): Promise<WarRoomState> {
    const account = await this.metamaskService.getConnectedAccount();
    const metadataIds: string[] = await this.ethers.getTokenMetadataIdsByOwner(account);
    const attackerOnOffense = account == this.attackerId && !this.isAttacking;
    const defenderOnDefense = _.contains(metadataIds, this.tileId.toString()) && this.isAttacking && !this.isDefending;
    if (attackerOnOffense)
      return WarRoomState.ATTACKER_EDIT;
    else if(defenderOnDefense)
      return WarRoomState.DEFENDER_EDIT;
    else
      return WarRoomState.VIEW
  }

  submitEnabled() {
    if(this.state === WarRoomState.ATTACKER_EDIT || this.state === WarRoomState.DEFENDER_EDIT)
      return true;
    else 
      return false;
  }

  isAvailable(troop: Troop) {
    return this.battlefieldDataService.isInBattlefield(troop);
  }
  
  drop(event: CdkDragDrop<Troop[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
