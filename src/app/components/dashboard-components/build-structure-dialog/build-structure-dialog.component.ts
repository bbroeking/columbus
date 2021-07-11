import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StructureType } from 'src/app/constants/buildings';
import { Structure, TileDataService } from 'src/app/services/tile-data.service';
import {BUILDINGS} from '../../../constants/buildings';
import * as _ from 'underscore';
import { QueueItem, QueueService } from 'src/app/services/queue.service';
import { EthersService } from 'src/app/services/ethers.service';

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
    private etherService: EthersService) { }

  ngOnInit(): void {
    this.options = _.keys(BUILDINGS);
  }

  async build() {
    const structureType: StructureType = this.selectedValue as unknown as StructureType;
    const queueItem: QueueItem = this.queueService.prepareStructureItem(structureType);
    const uri:string = await this.etherService.getMetadataURI(this.selectedTile);
    this.tileService.queueBuildStructure(uri, this.structure.sid, queueItem);
  }
}
