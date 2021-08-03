import { Component, Input, OnInit } from '@angular/core';
import { Troop } from 'src/app/constants/troops';
import { IconService } from 'src/app/services/icon.service';

@Component({
  selector: 'app-battlefield-card',
  templateUrl: './battlefield-card.component.html',
  styleUrls: ['./battlefield-card.component.less']
})
export class BattlefieldCardComponent implements OnInit {
  @Input() troops: Troop[];
  @Input() dragDisabled: boolean;
  constructor(
    private iconService: IconService
  ) { }

  ngOnInit(): void {
    if(this.dragDisabled == undefined)
      this.dragDisabled = true;
  }

  getIcon(type: string) {
    return this.iconService.getIconSrc(type);
  }

}
