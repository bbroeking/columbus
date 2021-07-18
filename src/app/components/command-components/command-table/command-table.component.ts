import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Attributes, Troop, TROOP_MODEL } from 'src/app/constants/troops';
import { BattlefieldDataService } from 'src/app/services/battlefield-data.service';
import { MetamaskService } from 'src/app/services/metamask.service';
import { TroopDataService } from 'src/app/services/troop-data.service';
import { TROOPS } from '../../../constants/troops';

@Component({
  selector: 'app-command-table',
  templateUrl: './command-table.component.html',
  styleUrls: ['./command-table.component.less']
})
export class CommandTableComponent implements OnInit {  
  uid: string | undefined;
  troops$: Observable<Troop[]>;
  promote: Troop[];

  constructor(private metamaskService: MetamaskService,
              private troopDataService: TroopDataService,
              private battlefieldDataService: BattlefieldDataService) { }

  async ngOnInit() {
    const account = this.metamaskService.account.value;
    if (account)
      this.troops$ = this.troopDataService.getTroopsByUser(account);

    this.promote = [];
  }

  ngOnDestroy() {
  }

  isAvailable(troop: Troop) {
    return this.battlefieldDataService.isInBattlefield(troop);
  }

  canPromote(): boolean {
    return this.troopDataService.canPromote(this.promote);
  }

  promoteTroop(): void {
    this.troopDataService.promoteTroop(this.promote);
    this.promote = [];
  }

  isPromoteFull(): boolean {
    return this.promote.length == 3;
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
