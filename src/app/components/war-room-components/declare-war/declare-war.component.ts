import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ConflictDataService } from 'src/app/services/conflict-data.service';
import { TileDataService } from 'src/app/services/tile-data.service';

@Component({
  selector: 'app-declare-war',
  templateUrl: './declare-war.component.html',
  styleUrls: ['./declare-war.component.less']
})
export class DeclareWarComponent implements OnInit {
  sub: Subscription;
  tileId = 'Enter TileId';

  constructor(
    private tileDataService: TileDataService,
    private conflictDataService: ConflictDataService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async declareWar() {
    this.sub = this.tileDataService.getTileValuesAsObservable(this.tileId)
                                    .subscribe( async (res) => {
                                      if (res && !res?.inConflict){
                                        const conflict = await this.conflictDataService.createConflict(this.tileId, this.authService.user?.uid!);
                                        this.tileDataService.updateTile(this.tileId, { conflictId: conflict.id, inConflict: true})
                                        this.router.navigate([`/war-room/${conflict.id}`])
                                      }
                                      else 
                                        console.log("Error: Already In Conflict");
                                    });
  }
}
