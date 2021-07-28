import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Conflict, ConflictDataService, ConflictUpdate } from 'src/app/services/conflict-data.service';

@Component({
  selector: 'app-conflict-resolved',
  templateUrl: './conflict-resolved.component.html',
  styleUrls: ['./conflict-resolved.component.less']
})
export class ConflictResolvedComponent implements OnInit {
  @Input() conflict: Conflict;
  conflictUpdates$: Observable<ConflictUpdate[]>;

  constructor(private conflictDataService: ConflictDataService) { }

  async ngOnInit() {
    this.conflictUpdates$ = await this.conflictDataService.getConflictUpdatesValues(this.conflict);
  }
}
