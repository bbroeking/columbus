import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Troop } from 'src/app/constants/troops';

@Component({
  selector: 'app-promote-success-dialog',
  templateUrl: './promote-success-dialog.component.html',
  styleUrls: ['./promote-success-dialog.component.less']
})
export class PromoteSuccessDialogComponent implements OnInit {
  troops: Troop[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.troops = [this.data.troop];
  }

}
