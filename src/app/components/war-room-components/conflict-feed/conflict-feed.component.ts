import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-conflict-feed',
  templateUrl: './conflict-feed.component.html',
  styleUrls: ['./conflict-feed.component.less']
})
export class ConflictFeedComponent implements OnInit {
  @Input() isResolved: boolean;
  
  constructor() { }

  ngOnInit(): void {
  }

}
