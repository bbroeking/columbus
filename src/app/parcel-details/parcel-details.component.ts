import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Building, Structure, TileDataService } from '../services/tile-data.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-parcel-details',
  templateUrl: './parcel-details.component.html',
  styleUrls: ['./parcel-details.component.less']
})
export class ParcelDetailsComponent implements OnInit {

  @Input() selectedTile: number;
  data$: Observable<Structure | undefined> | undefined;
  structures$: Observable<Building[]| undefined> | undefined;
  constructor(private tileDataService: TileDataService,
              private fs: AngularFirestore) { }

  async ngOnInit() {
    // this.data$ = await this.tileDataService.getTileStructures(1);
    this.structures$ = await this.tileDataService.getNestedDoc(1)
  }



}
