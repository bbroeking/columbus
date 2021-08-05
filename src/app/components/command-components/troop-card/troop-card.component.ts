import { Component, Input, OnInit } from '@angular/core';
import { Attributes, Troop, TROOPS, TROOP_MODEL } from 'src/app/constants/troops';
import { IconService } from 'src/app/services/icon.service';

@Component({
  selector: 'app-troop-card',
  templateUrl: './troop-card.component.html',
  styleUrls: ['./troop-card.component.less']
})
export class TroopCardComponent implements OnInit {
  @Input() troops: Troop[];
  attributes: Attributes[];
  constructor(
    private iconService: IconService
  ) {}

  ngOnInit(): void {
    this.attributes = Object.values(Attributes);
  }

  getTroopModel(type: string): TROOP_MODEL[] {
    return [TROOPS[type]];
  }

  getIcon(type: string) {
    return this.iconService.getIconSrc(type);
  }
}
