import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Timestamp } from '@firebase/firestore-types';
import { Observable, Subscription } from 'rxjs';
import { RESEARCH } from 'src/app/constants/research';
import { TROOPS } from 'src/app/constants/troops';
import { ResearchProduction, ResourceProduction, StructureType, UnitProduction } from 'src/app/interfaces/structure-type';
import { AccountData, AccountService } from 'src/app/services/account.service';
import { IconService } from 'src/app/services/icon.service';
import { MetamaskService } from 'src/app/services/metamask.service';
import { QueueItem, QueueService } from 'src/app/services/queue.service';
import { ResearchService } from 'src/app/services/research.service';
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
  selected: string;
  queue: QueueItem[];
  structure$: Observable<Structure | undefined>;
  account$: Observable<AccountData | undefined> | undefined;
  structureSub: Subscription;
  metamaskSub: Subscription;
  accountSub: Subscription;
  accountData: AccountData;

  // structure dialog types 
  unitProduction: boolean;
  unitStructure: UnitStructure;
  researchProduction: boolean;
  researchStructure: ResearchStructure;
  resourceProduction: boolean;
  resourceStructure: ResourceStructure;

  mineralCost: number;
  energyCost: number;

  constructor(
    private iconService: IconService,
    private tileDataService: TileDataService,
    private queueService: QueueService,
    private troopDataService: TroopDataService,
    private tileService: TileDataService,
    private accountService: AccountService,
    private metamaskService: MetamaskService,
    private researchService: ResearchService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.structure = this.data.structure;
    this.tileId = this.data.tileId;
    this.structureId = this.structure.sid;
    this.queue = this.structure.queue;
    this.selected = '';

    this.renderStructureType(this.structure);
    this.structure$ = this.tileDataService.getTileStructureAsObservable(this.tileId, this.structureId);

    this.metamaskSub = this.metamaskService.account.subscribe((account) => {
      this.account$ = this.accountService.getAccountAsObservable(account);
      this.accountSub = this.account$.subscribe((accountData) => this.accountData = accountData!);
    })
    this.structureSub = this.structure$.subscribe((updatedStructure: Structure | undefined) => {
      if (updatedStructure)
        this.renderStructureType(updatedStructure);
    })
  }

  ngOnDestroy() {
    this.structureSub.unsubscribe();
    this.metamaskSub.unsubscribe();
    this.accountSub.unsubscribe();
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
  
  async addToQueue(){
    const accountData: AccountData | undefined = await this.account$?.toPromise();
    if (!this.queueFull() && this.selected && this.canPay()){
      const newQueue: QueueItem[] = this.queueService.prepareBarracksItem(this.queue, this.selected)
      this.tileDataService.updateStructure(this.tileId, this.structureId, {
        queue: newQueue
      });
      this.queue = newQueue;
      this.deductCost();
    }
  }

  async addToResearchQueue() {
    if (!this.researchQueueFull() && this.selected && this.canPay()){
      const newQueue: QueueItem[] = this.queueService.prepareResearchItem(this.queue, this.selected)
      this.tileDataService.updateStructure(this.tileId, this.structureId, {
        queue: newQueue
      });
      this.queue = newQueue;
      this.deductCost();
    }
  }

  canPay(): boolean {
    if(this.accountData)
      return this.accountData.minerals >= this.mineralCost && this.accountData.energy >= this.energyCost;
    return false;
  }

  deductCost() {
    const address = this.metamaskService.account.value;
    this.accountService.updateAccountData(address, {'minerals': this.mineralCost * -1, 'energy': this.energyCost * -1});
  }

  claimTroop(index: number) {
    const dequeuedItem = this.queue.splice(index, 1);
    this.troopDataService.addToReserves(dequeuedItem);
    this.tileDataService.updateStructure(this.tileId, this.structureId, {
      queue: this.queue
    });
  }

  claimResearch(index: number) {
    const address = this.metamaskService.account.value
    if(address) {
      const dequeuedItem = this.queue.splice(index, 1);
      this.researchService.updateResearch(address, dequeuedItem[0].type);
      this.tileDataService.updateStructure(this.tileId, this.structureId, {
        queue: this.queue
      });
    }
    else 
      console.error('Metamask not connected');
  }

  updateSelected(troop: string) {
    this.selected = troop;
    this.calculateCost(troop)
  }

  calculateCost(troop: string) {
    let troopModel = TROOPS[troop];
    let researchModel = RESEARCH[troop];
    if (troopModel) {
      this.mineralCost = troopModel.buildResources.minerals;
      this.energyCost = troopModel.buildResources.energy;
    } else if (researchModel) {
      this.mineralCost = researchModel.buildResources.minerals;
      this.energyCost = researchModel.buildResources.energy;
    }
  }

  queueFull(): boolean {
    return this.queue.length >= 5;
  }

  researchQueueFull(): boolean {
    return this.queue.length > 0;
  }

  unitSrc(type: string){
    return this.iconService.getIconSrc(type);
  }

}
