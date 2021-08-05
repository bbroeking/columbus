import { Component, Input, OnInit } from '@angular/core';
import { Troop } from 'src/app/constants/troops';
import { IconService } from 'src/app/services/icon.service';

@Component({
  selector: 'app-promote-card',
  templateUrl: './promote-card.component.html',
  styleUrls: ['./promote-card.component.less']
})
export class PromoteCardComponent implements OnInit {
  @Input() troops: Troop[];

  constructor(
    private iconService: IconService,
  ) { }

  ngOnInit(): void {
  }

  getIcon(type: string) {
    return this.iconService.getIconSrc(type);
  }
}
