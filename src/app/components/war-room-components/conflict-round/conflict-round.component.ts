import { Component, Input, OnInit } from '@angular/core';
import { ConflictUpdate } from 'src/app/services/conflict-data.service';
import { IconService } from 'src/app/services/icon.service';
import { TroopDataService } from 'src/app/services/troop-data.service';

@Component({
  selector: 'app-conflict-round',
  templateUrl: './conflict-round.component.html',
  styleUrls: ['./conflict-round.component.less']
})
export class ConflictRoundComponent implements OnInit {

  @Input() roundData: ConflictUpdate;
  constructor(
    private troopService: TroopDataService,
    private iconService: IconService
  ) { }

  ngOnInit(): void {
  }

  getTypeIcon(type: string) {
    return this.iconService.getIconSrc(type);
  }

  getTroopData(type: string) {
    return this.troopService.getTroopData(type);
  }

}
