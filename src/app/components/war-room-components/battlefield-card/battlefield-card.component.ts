import { Component, Input, OnInit } from '@angular/core';
import { Troop } from 'src/app/constants/troops';

@Component({
  selector: 'app-battlefield-card',
  templateUrl: './battlefield-card.component.html',
  styleUrls: ['./battlefield-card.component.less']
})
export class BattlefieldCardComponent implements OnInit {
  @Input() troops: Troop[];
  @Input() dragDisabled: boolean;
  constructor() { }

  ngOnInit(): void {
    if(!this.dragDisabled)
      this.dragDisabled = true;
  }

}
