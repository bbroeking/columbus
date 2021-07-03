import { Component, Input, OnInit } from '@angular/core';
import { DocumentData, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { ConflictDataService } from 'src/app/services/conflict-data.service';

@Component({
  selector: 'app-conflict-resolved',
  templateUrl: './conflict-resolved.component.html',
  styleUrls: ['./conflict-resolved.component.less']
})
export class ConflictResolvedComponent implements OnInit {
  @Input() conflictId: string;
  conflictDocs: QueryDocumentSnapshot<DocumentData>[] | undefined;

  constructor(private conflictDataService: ConflictDataService) { }

  async ngOnInit() {
    const query = await this.conflictDataService.getConflictUpdatesValues(this.conflictId);
    this.conflictDocs = query?.docs;
  }

}
