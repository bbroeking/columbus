import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-planning-table',
  templateUrl: './planning-table.component.html',
  styleUrls: ['./planning-table.component.less']
})
export class PlanningTableComponent implements OnInit {
  @Input() isAttacking: boolean;
  @Input() isDefending: boolean;
  
  constructor() { }

  ngOnInit(): void {
  }

}
