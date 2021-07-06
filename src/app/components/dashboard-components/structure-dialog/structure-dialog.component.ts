import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QueueItem, QueueService } from 'src/app/services/queue.service';
import { Structure, TileDataService } from 'src/app/services/tile-data.service';
import { TroopDataService } from 'src/app/services/troop-data.service';
import { TROOPS } from '../../../constants/troops';

@Component({
  selector: 'app-structure-dialog',
  templateUrl: './structure-dialog.component.html',
  styleUrls: ['./structure-dialog.component.less']
})
export class StructureDialogComponent implements OnInit {

  structure: Structure;
  tileId: string;
  structureId: string;
  selectedTroop: string;
  queue: QueueItem[];
  constructor(
    private tileDataService: TileDataService,
    private queueService: QueueService,
    private troopDataService: TroopDataService,
    @Inject(MAT_DIALOG_DATA) public data:any) {}

  ngOnInit(): void {
    this.structure = this.data.structure;
    this.tileId = this.data.tileId;
    this.structureId = this.structure.sid;
    this.queue = this.structure.queue;
  }

  addToQueue(){
    if (!this.queueFull() && this.selectedTroop){
      const newQueue: QueueItem[] = this.queueService.prepareBarracksItem(this.queue, this.selectedTroop)
      this.tileDataService.updateStructure(this.tileId, this.structureId, {
        queue: newQueue
      })  
    }
  }

  claimTroop(index: number) {
    const dequeuedItem = this.queue.splice(index, 1);
    this.troopDataService.addToReserves(dequeuedItem);
    this.tileDataService.updateStructure(this.tileId, this.structureId, {
      queue: this.queue
    })  
  }

  updateSelectedTroop(troop: string) {
    this.selectedTroop = troop;
  }

  queueFull(): boolean {
    return this.queue.length >= 5;
  }

}
