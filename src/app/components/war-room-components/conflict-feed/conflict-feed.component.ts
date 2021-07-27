import { Component, Input, OnInit } from '@angular/core';
import { DocumentData, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Conflict, ConflictDataService, ConflictUpdate } from 'src/app/services/conflict-data.service';

@Component({
  selector: 'app-conflict-feed',
  templateUrl: './conflict-feed.component.html',
  styleUrls: ['./conflict-feed.component.less']
})
export class ConflictFeedComponent implements OnInit {
  @Input() conflict: Conflict;
  conflictUpdates$: Observable<ConflictUpdate[]>;

  constructor(private conflictDataService: ConflictDataService) { }

  async ngOnInit() {
    this.conflictUpdates$ = this.conflictDataService.getConflictUpdatesValues(this.conflict);
  }

}
