import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tile, TileDataService } from 'src/app/services/tile-data.service';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.less']
})
export class ReportDetailsComponent implements OnInit {
  @Input() report: string;
  constructor(private tileService: TileDataService) { }

  tile$: Observable<Tile | undefined> | undefined;
  
  ngOnInit(): void {
    this.tile$ = this.tileService.getTileValuesAsObservable(this.report);
  }

  public generateLink(conflictId: string) {
    return `/war-room/${conflictId}`;
  }

}
