import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { EthersService } from 'src/app/services/ethers.service';
import { TileDataService } from 'src/app/services/tile-data.service';

@Component({
  selector: 'app-structure-upgrade-dialog',
  templateUrl: './structure-upgrade-dialog.component.html',
  styleUrls: ['./structure-upgrade-dialog.component.less'],
})
export class StructureUpgradeDialogComponent {

  constructor(
    private ethers: EthersService,
    private tileDataService:TileDataService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

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