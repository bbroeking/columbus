import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EthersService } from '../services/ethers.service';
import { Resources, Structure, TileDataService } from '../services/tile-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { StructureDetailsComponent } from '../structure-details/structure-details.component';

@Component({
  selector: 'app-structure-upgrade-dialog',
  templateUrl: './structure-upgrade-dialog.component.html',
  styleUrls: ['./structure-upgrade-dialog.component.less'],
  providers: [StructureDetailsComponent]
})
export class StructureUpgradeDialogComponent implements OnInit {

  constructor(
    private ethers: EthersService,
    private tileDataService:TileDataService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit() {
    console.log(this.data)
  }


  async upgradeBuilding() {
    let dirtyUri = await this.ethers.getMetadataURI(this.data.dUri)
    if (this.data.level <= 3)
    {
      return this.tileDataService.upgradeTileBuild(dirtyUri, this.data.sidd, this.data.level)
    }
    else
    {
      console.log('Max Level')
    }
  }
}