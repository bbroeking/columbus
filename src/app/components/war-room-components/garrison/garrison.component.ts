import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { BattlefieldDataService } from 'src/app/services/battlefield-data.service';
import { Troop, TroopDataService } from 'src/app/services/troop-data.service';

@Component({
  selector: 'app-garrison',
  templateUrl: './garrison.component.html',
  styleUrls: ['./garrison.component.less']
})
export class GarrisonComponent implements OnInit {
  @Input() isAttacking: boolean;
  
  uid: string | undefined;
  troops$: Observable<Troop[]>;

  constructor(private authService: AuthService,
              private troopDataService: TroopDataService,
              private battlefieldDataService: BattlefieldDataService) { }

  async ngOnInit() {
    this.uid = await this.authService.user?.uid
    if (this.uid)
      this.troops$ = this.troopDataService.getTroopsByUser(this.uid);
  }

  ngOnDestroy() {
  }

  add(troop: Troop) {
    if (!this.isAttacking)
      this.battlefieldDataService.addAttacking(troop);
    else 
      this.battlefieldDataService.addDefending(troop);
  }

  isAvailable(troop: Troop) {
    return this.battlefieldDataService.isInBattlefield(troop);
  }

}
