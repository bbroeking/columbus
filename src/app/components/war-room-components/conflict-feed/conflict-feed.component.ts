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
  conflictDocs: QueryDocumentSnapshot<DocumentData>[] | undefined;


  constructor(private conflictDataService: ConflictDataService) { }

  async ngOnInit() {
    const query = await this.conflictDataService.getConflictUpdatesValues(this.conflictId);
    this.conflictDocs = query?.docs;
  }

}
