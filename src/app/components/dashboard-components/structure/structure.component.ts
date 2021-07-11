import { Component, Input, OnInit } from '@angular/core';
import { EthersService } from 'src/app/services/ethers.service';
import { Structure, TileDataService } from 'src/app/services/tile-data.service';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.less']
})
export class StructureComponent implements OnInit {
  @Input() structure: Structure;
  @Input() selectedTile: number;
  display: boolean;

  constructor(private tileService: TileDataService,
    private ethersService: EthersService) { }
  
  ngOnInit(): void {
    this.display = false;
  }

  onToggle() {
    this.display = !this.display;
  }

  async claimStructure() {
    const data = {
      'level': 1,
      'queue': [],
      'type': this.structure.queued.type,
      'built': true,
    }
    const uri = await this.ethersService.getMetadataURI(this.selectedTile);
    this.tileService.updateStructure(uri, this.structure.sid, data);
  }
}
