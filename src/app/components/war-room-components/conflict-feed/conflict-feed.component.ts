import { Component, Input, OnInit } from '@angular/core';
import { DocumentData, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { ConflictDataService, ConflictUpdate } from 'src/app/services/conflict-data.service';

@Component({
  selector: 'app-conflict-feed',
  templateUrl: './conflict-feed.component.html',
  styleUrls: ['./conflict-feed.component.less']
})
export class ConflictFeedComponent implements OnInit {
  @Input() isResolved: boolean;
  @Input() conflictId: string;
  conflictUpdatesSubscription: Subscription
  conflictUpdates: ConflictUpdate[] | undefined;
  conflictDocs: QueryDocumentSnapshot<DocumentData>[] | undefined;


  constructor(private conflictDataService: ConflictDataService) { }

  async ngOnInit() {
    this.conflictUpdates = undefined;
    const query = await this.conflictDataService.getConflictUpdatesValues(this.conflictId);
    this.conflictDocs = query?.docs;
  }

  ngOnDestroy() {
    this.conflictUpdatesSubscription.unsubscribe();
  }

}
