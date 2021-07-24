import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Parcel } from 'src/app/interfaces/parcel';
import { TileGeneratorService } from 'src/app/services/tile-generator.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.less']
})
export class DiscoverComponent implements OnInit {
  parcel$: Observable<Parcel[]>;

  constructor(private tileGeneratorService: TileGeneratorService) { }

  ngOnInit(): void {
    this.parcel$ = this.tileGeneratorService.getOpenParcels();
  }
}
