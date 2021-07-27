import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Timestamp } from '@firebase/firestore-types';
import { Observable, Subscription } from 'rxjs';
import { ResearchProduction, ResourceProduction, StructureType, UnitProduction } from 'src/app/interfaces/structure-type';
import { AccountData } from 'src/app/services/account.service';
import { QueueItem, QueueService } from 'src/app/services/queue.service';
import { ResearchStructure, ResourceStructure, Structure, TileDataService, UnitStructure } from 'src/app/services/tile-data.service';
import { TroopDataService } from 'src/app/services/troop-data.service';

@Component({
  selector: 'app-structure-dialog',
  templateUrl: './structure-dialog.component.html',
  styleUrls: ['./structure-dialog.component.less']
})
export class StructureDialogComponent implements OnInit {

  structure: Structure;
  tileId: number;
  structureId: string;
  selectedTroop: string;
  queue: QueueItem[];
  structure$: Observable<Structure | undefined>;
  structureSub: Subscription;

  // structure dialog types 
  unitProduction: boolean;
  unitStructure: UnitStructure;
  researchProduction: boolean;
  researchStructure: ResearchStructure;
  resourceProduction: boolean;
  resourceStructure: ResourceStructure;

  constructor(
    private tileDataService: TileDataService,
    private queueService: QueueService,
    private troopDataService: TroopDataService,
    private tileService: TileDataService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.structure = this.data.structure;
    this.tileId = this.data.tileId;
    this.structureId = this.structure.sid;
    this.queue = this.structure.queue;
    this.selectedTroop = '';

    this.renderStructureType(this.structure);
    this.structure$ = this.tileDataService.getTileStructureAsObservable(this.tileId, this.structureId);
    this.structureSub = this.structure$.subscribe((updatedStructure: Structure | undefined) => {
      if (updatedStructure)
        this.renderStructureType(updatedStructure);
    })
  }

  renderStructureType(updatedStructure: Structure) {
    const structureType: StructureType = this.structure.type as StructureType;
    this.unitProduction = Object.values(UnitProduction).some((v) => v === structureType);
    if (this.unitProduction) this.unitStructure = updatedStructure as UnitStructure;

    this.researchProduction = Object.values(ResearchProduction).some((v) => v === structureType);
    if(this.researchProduction) this.researchStructure = updatedStructure as ResearchStructure;

    this.resourceProduction = Object.values(ResourceProduction).some((v) => v === structureType);
    if(this.resourceProduction) this.resourceStructure = updatedStructure as ResourceStructure;
  }


  collectStructureStore(mRate:number | undefined, eRate: number | undefined, lastCollected: Timestamp) {
    const acctData: Partial<AccountData> = {
      'minerals': (mRate) ? this.calculateStore(mRate, lastCollected) : 0,
      'energy': (eRate) ? this.calculateStore(eRate, lastCollected) : 0,
    }
    this.tileService.collectRefineryResources(this.tileId, this.structureId, acctData)
  }

  calculateStore(rate: number, lastCollected: Timestamp) {
    if (!lastCollected) return 0;
    const diff = Date.now() - lastCollected.toMillis();
    const hours = diff / (1000 * 60 * 60);
    return Math.floor(rate * hours);
  }
  
  addToQueue(){
    if (!this.queueFull() && this.selectedTroop){
      const newQueue: QueueItem[] = this.queueService.prepareBarracksItem(this.queue, this.selectedTroop)
      this.tileDataService.updateStructure(this.tileId, this.structureId, {
        queue: newQueue
      });
      this.queue = newQueue;
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

  unitSrc(type: string){
    if (type == 'marine'){
      return 'assets/units/marine.jpeg';
    } else if (type == 'marauder') {
      return 'assets/units/marauder.jpg'
    } else {
      return '';
    }
  }

}
