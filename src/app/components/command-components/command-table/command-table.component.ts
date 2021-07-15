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
  attributes: Attributes[];

  constructor(private metamaskService: MetamaskService,
              private troopDataService: TroopDataService,
              private battlefieldDataService: BattlefieldDataService) { }

  async ngOnInit() {
    const account = this.metamaskService.account.value;
    if (account)
      this.troops$ = this.troopDataService.getTroopsByUser(account);

    this.attributes = Object.values(Attributes);
  }

  ngOnDestroy() {
  }

  isAvailable(troop: Troop) {
    return this.battlefieldDataService.isInBattlefield(troop);
  }

  getTroopModel(type: string): TROOP_MODEL[] {
    return [TROOPS[type]];
  }
}
