import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Troop } from 'src/app/constants/troops';
import { BattlefieldDataService } from 'src/app/services/battlefield-data.service';
import { MetamaskService } from 'src/app/services/metamask.service';
import { TroopDataService } from 'src/app/services/troop-data.service';
import { PromoteSuccessDialogComponent } from '../promote-success-dialog/promote-success-dialog.component';

@Component({
  selector: 'app-command-table',
  templateUrl: './command-table.component.html',
  styleUrls: ['./command-table.component.less']
})
export class CommandTableComponent implements OnInit {  
  uid: string | undefined;
  troops$: Observable<Troop[]>;
  promote: Troop[];

  constructor(
    public dialog: MatDialog,
    private metamaskService: MetamaskService,
    private troopDataService: TroopDataService,
    private battlefieldDataService: BattlefieldDataService
    ){
      this.promote = [];
    }

  async ngOnInit() {
    const account = await this.metamaskService.getConnectedAccount();
    if (account)
      this.troops$ = this.troopDataService.getTroopsByUser(account);
  }

  ngOnDestroy() {
  }

  isAvailable(troop: Troop) {
    return this.battlefieldDataService.isInBattlefield(troop);
  }

  canPromote(): boolean {
    return this.promote ? this.troopDataService.canPromote(this.promote) : false;
  }

  promoteTroop(): void {
    const promoteTroop: Partial<Troop> = this.troopDataService.promoteTroop(this.promote);
    this.promote = [];
    this.openSuccessDialog(promoteTroop);
  }

  isPromoteFull(): boolean {
    return this.promote.length == 3;
  }
  
  drop(event: CdkDragDrop<Troop[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  openSuccessDialog(troop: Partial<Troop>) {
    const dialogRef = this.dialog.open(PromoteSuccessDialogComponent, {
      data: {
        troop: troop,
      }
    });
  }

}
