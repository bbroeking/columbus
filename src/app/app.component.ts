import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MetamaskService } from './services/metamask.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  account:string;
  accountSubscription: Subscription;
  constructor(public metamaskService: MetamaskService) {}

  async ngOnInit() {
    this.accountSubscription = this.metamaskService.account
                                    .subscribe((res) => {
                                      this.account = res
                                    });
    this.metamaskService.setConnectedAccount();
  }

  ngOnDestroy() {
    this.accountSubscription.unsubscribe();
  }
}
