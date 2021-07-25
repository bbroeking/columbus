import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { StructureType } from 'src/app/constants/buildings';
import { Structure, TileDataService } from 'src/app/services/tile-data.service';
import {BUILDINGS} from '../../../constants/buildings';
import { QueueItem, QueueService } from 'src/app/services/queue.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'underscore';

@Component({
  selector: 'app-build-structure-dialog',
  templateUrl: './build-structure-dialog.component.html',
  styleUrls: ['./build-structure-dialog.component.less']
})
export class BuildStructureDialogComponent implements OnInit {
  @Input() structure: Structure;
  @Input() selectedTile: number;
  @Output() structureSelection = new EventEmitter<string>();

  options: string[];
  selectedValue: string;

  constructor(
    private queueService: QueueService,
    private tileService: TileDataService,
    public dialogRef: MatDialogRef<BuildStructureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.structure = this.data.structure;
    this.selectedTile = this.data.selectedTile;
    this.options = _.keys(BUILDINGS);
  }

  async build() {
    const structureType: StructureType = this.selectedValue as unknown as StructureType;
    const queueItem: QueueItem = this.queueService.prepareStructureItem(structureType);
    this.tileService.queueBuildStructure(this.selectedTile, this.structure.sid, queueItem);
    this.dialogRef.close();
  }
}
