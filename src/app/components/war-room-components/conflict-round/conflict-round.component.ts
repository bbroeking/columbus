import { Component, Input, OnInit } from '@angular/core';
import { DocumentData, DocumentReference, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { ConflictUpdate } from 'src/app/services/conflict-data.service';

@Component({
  selector: 'app-conflict-round',
  templateUrl: './conflict-round.component.html',
  styleUrls: ['./conflict-round.component.less']
})
export class ConflictRoundComponent implements OnInit {

  @Input() roundData: QueryDocumentSnapshot<DocumentData>;
  data: DocumentData;
  constructor() { }

  ngOnInit(): void {
    this.data = this.roundData.data() as ConflictUpdate;
  }

}
