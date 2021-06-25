import { Component, Input, OnInit } from '@angular/core';
import { Troop } from 'src/app/services/troop-data.service';

@Component({
  selector: 'app-troop-card',
  templateUrl: './troop-card.component.html',
  styleUrls: ['./troop-card.component.less']
})
export class TroopCardComponent implements OnInit {
  @Input() troop: Troop;
  
  constructor() { }

  ngOnInit(): void {
  }

}
