import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConflictDataService } from 'src/app/services/conflict-data.service';
import { EthersService } from 'src/app/services/ethers.service';
import { MetamaskService } from 'src/app/services/metamask.service';
import { TileDataService } from 'src/app/services/tile-data.service';

@Component({
  selector: 'app-declare-war',
  templateUrl: './declare-war.component.html',
  styleUrls: ['./declare-war.component.less']
})
export class DeclareWarComponent {
  @Input() selectedTile: number;
  @Input() disabled:boolean;
  sub: Subscription;


  constructor(
    private tileDataService: TileDataService,
    private conflictDataService: ConflictDataService,
    private router: Router,
    private metamaskService: MetamaskService) { }

  ngOnDestroy() {
    if (this.sub)
      this.sub.unsubscribe();
  }

  async declareWar() {
    this.sub = this.tileDataService.getTileValuesAsObservable(this.selectedTile)
                    .subscribe( async (res) => {
                      if (res && !res?.inConflict){
                        const account = await this.metamaskService.getConnectedAccount();
                        // TODO make check for not attacking your own
                        const conflict = await this.conflictDataService.createConflict(this.selectedTile, account);
                        this.tileDataService.updateTile(this.selectedTile, { conflictId: conflict.id, inConflict: true})
                        this.router.navigate([`/war-room/${conflict.id}`])
                      }
                      else 
                        console.log("Error: Already In Conflict");
                    });
  }
}
