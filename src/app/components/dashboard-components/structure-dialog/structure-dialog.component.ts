import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Structure } from 'src/app/services/tile-data.service';

@Component({
  selector: 'app-structure-dialog',
  templateUrl: './structure-dialog.component.html',
  styleUrls: ['./structure-dialog.component.less']
})
export class StructureDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) {}

  ngOnInit(): void {
  }

}
