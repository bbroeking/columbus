import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ConflictDataService, ConflictUpdate, ConflictUpdates } from 'src/app/services/conflict-data.service';

@Component({
  selector: 'app-conflict-feed',
  templateUrl: './conflict-feed.component.html',
  styleUrls: ['./conflict-feed.component.less']
})
export class ConflictFeedComponent implements OnInit {
  @Input() isResolved: boolean;
  @Input() conflictUpdatesId: string;
  conflictUpdatesSubscription: Subscription
  conflictUpdates: ConflictUpdate[] | undefined;


  constructor(private conflictDataService: ConflictDataService) { }

  ngOnInit(): void {
    this.conflictUpdates = undefined;
    this.conflictUpdatesSubscription = this.conflictDataService.getConflictUpdatesValuesAsObservable(this.conflictUpdatesId)
                                                               .subscribe((updates) => {
                                                                 this.conflictUpdates = updates?.updates
                                                               })
  }

  ngOnDestroy() {
    this.conflictUpdatesSubscription.unsubscribe();
  }

}
