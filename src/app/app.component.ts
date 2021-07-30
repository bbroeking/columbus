import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AccountData, AccountService } from './services/account.service';
import { MetamaskService } from './services/metamask.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  account:string;
  account$: Observable<AccountData | undefined>;
  accountSubscription: Subscription;

  constructor(
    public router: Router,
    private metamaskService: MetamaskService,
    private accountService: AccountService) {}

  async ngOnInit() {
    this.accountSubscription = this.metamaskService.account
      .subscribe((address) => {
        this.account = address;
        if (this.account)
          this.account$ = this.accountService.getAccountAsObservable(this.account);
      });
    this.metamaskService.setConnectedAccount();
  }

  async ngOnChanges() {
    if (this.account) {
      this.account$ = this.accountService.getAccountAsObservable(this.account);
    }
  }

  ngOnDestroy() {
    this.accountSubscription.unsubscribe();
  }
}
