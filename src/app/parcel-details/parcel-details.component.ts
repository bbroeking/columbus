import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Structure, TileDataService } from '../services/tile-data.service';

@Component({
  selector: 'app-parcel-details',
  templateUrl: './parcel-details.component.html',
  styleUrls: ['./parcel-details.component.less']
})
export class ParcelDetailsComponent implements OnInit {

  @Input() selectedTile: number;
  data$: Observable<Structure | undefined> | undefined;

  constructor(private tileDataService: TileDataService) { }

  async ngOnInit() {
    this.data$ = await this.tileDataService.getTileStructures(1);
  }



}
