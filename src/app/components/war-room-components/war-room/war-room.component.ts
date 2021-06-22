import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Conflict, ConflictDataService } from 'src/app/services/conflict-data.service';

@Component({
  selector: 'app-war-room',
  templateUrl: './war-room.component.html',
  styleUrls: ['./war-room.component.less']
})
export class WarRoomComponent implements OnInit {
  conflictId: string;
  conflictData$: Observable<Conflict | undefined>;
  constructor(private route: ActivatedRoute,
    private conflictDataSerice: ConflictDataService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.conflictId = params.get('conflictId') || "";
    });
    this.conflictData$ = this.conflictDataSerice.getConflictValuesAsObservable(this.conflictId);
  }

}
