import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Conflict, ConflictDataService } from 'src/app/services/conflict-data.service';
import { Structure, Tile, TileDataService } from 'src/app/services/tile-data.service';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.less']
})
export class ReportDetailsComponent implements OnInit {
  @Input() report: string;
  constructor(private tileService: TileDataService,
              private conflictService: ConflictDataService) { }

  tile$: Observable<Tile | undefined> | undefined;
  structures$: Observable<Structure[]>;
  conflict$: Observable<Conflict | undefined>;
  tileSubscription: Subscription;
  
  
  ngOnInit(): void {
    this.tile$ = this.tileService.getTileValuesAsObservable(this.report);
    this.structures$ = this.tileService.getTileStructuresAsObservable(this.report);
    this.tileSubscription = this.tile$.subscribe((res: Tile | undefined) => {
      if (res?.inConflict && res?.conflictId)
        this.conflict$ = this.conflictService.getConflictValuesAsObservable(res.conflictId);
    })
  }

  ngOnDestroy() {
    this.tileSubscription.unsubscribe();
  }

  public generateLink(conflictId: string) {
    return `/war-room/${conflictId}`;
  }

}
