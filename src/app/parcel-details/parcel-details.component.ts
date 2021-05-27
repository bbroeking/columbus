import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-parcel-details',
  templateUrl: './parcel-details.component.html',
  styleUrls: ['./parcel-details.component.less']
})
export class ParcelDetailsComponent implements OnInit {

  @Input() mapId: number;
  constructor() { }

  ngOnInit(): void {
  }

}
