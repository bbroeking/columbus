import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-war-room',
  templateUrl: './war-room.component.html',
  styleUrls: ['./war-room.component.less']
})
export class WarRoomComponent implements OnInit {
  conflictId: string | null;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.conflictId = params.get('conflictId');
    });
  }

}
