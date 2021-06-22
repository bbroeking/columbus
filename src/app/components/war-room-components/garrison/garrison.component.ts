import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { TroopDataService } from 'src/app/services/troop-data.service';

@Component({
  selector: 'app-garrison',
  templateUrl: './garrison.component.html',
  styleUrls: ['./garrison.component.less']
})
export class GarrisonComponent implements OnInit {
  uid: string | undefined;

  constructor(private authService: AuthService,
    private troopDataService: TroopDataService) { }

  async ngOnInit() {
    this.uid = await this.authService.user?.uid
    if (this.uid)
      this.troopDataService.getTroopsByUser(this.uid).subscribe((res) => {
        console.log(res);
      })
  }

}
