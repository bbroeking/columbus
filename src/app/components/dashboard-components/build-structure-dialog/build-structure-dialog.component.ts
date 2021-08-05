import { Component, Inject, Input, OnInit } from '@angular/core';
import { Structure, TileDataService } from 'src/app/services/tile-data.service';
import {BUILDINGS} from '../../../constants/buildings';
import { QueueItem, QueueService } from 'src/app/services/queue.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'underscore';
import { StructureType } from 'src/app/interfaces/structure-type';
import { AccountData, AccountService } from 'src/app/services/account.service';
import { Observable, Subscription } from 'rxjs';
import { MetamaskService } from 'src/app/services/metamask.service';
import { IconService } from 'src/app/services/icon.service';

@Component({
  selector: 'app-build-structure-dialog',
  templateUrl: './build-structure-dialog.component.html',
  styleUrls: ['./build-structure-dialog.component.less']
})
export class BuildStructureDialogComponent implements OnInit {
  @Input() structure: Structure;
  @Input() selectedTile: number;

  options: string[];
  selectedValue: string;
  accountData: AccountData;
  account$: Observable<AccountData | undefined>;

  accountSub: Subscription;
  metamaskSub: Subscription;

  mineralCost: number;
  energyCost: number;
  unitType: string;

  address: string;

  constructor(
    private iconService: IconService,
    private queueService: QueueService,
    private tileService: TileDataService,
    private accountService: AccountService,
    private metamaskService: MetamaskService,
    public dialogRef: MatDialogRef<BuildStructureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.structure = this.data.structure;
    this.selectedTile = this.data.selectedTile;
    this.options = _.keys(BUILDINGS);
    this.metamaskSub = this.metamaskService.account.subscribe((address) => {
      this.address = address;
      this.account$ = this.accountService.getAccountAsObservable(address);
      this.accountSub =  this.account$.subscribe((accountData) => this.accountData = accountData!);
    })
  }

  ngOnDestroy() {
    this.metamaskSub.unsubscribe();
    this.accountSub.unsubscribe();
  }

  async build() {
    if(this.address && this.accountData && this.canPay()){
      const structureType: StructureType = this.selectedValue as unknown as StructureType;
      const queueItem: QueueItem = this.queueService.prepareStructureItem(structureType);
      this.tileService.queueBuildStructure(this.selectedTile, this.structure.sid, queueItem);
      this.deductCost();
      this.dialogRef.close();  
    }
  }

  canPay(): boolean {
    if(this.accountData)
      return this.accountData.minerals >= this.mineralCost && this.accountData.energy >= this.energyCost;
    return false;
  }

  deductCost() {
    this.accountService.updateAccountData(this.address, {'minerals': this.mineralCost * -1, 'energy': this.energyCost * -1});
  }

  updateSelection(structure: string) {
    let structureModel = BUILDINGS[structure];
    if (structureModel) {
      this.mineralCost = structureModel.buildResources.minerals;
      this.energyCost = structureModel.buildResources.energy;
    }
    this.unitType = structureModel.id;
  }

  getUnitSrc() {
    if(this.unitType)
      return this.iconService.getIconSrc(this.unitType);
    return '';
  }
}
