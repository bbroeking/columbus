import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AccountData, AccountService } from './services/account.service';
import { EthersService } from './services/ethers.service';
import { MetamaskService } from './services/metamask.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  account:string;
  balance: string;

  numLands: string;
  account$: Observable<AccountData | undefined>;
  accountSubscription: Subscription;
  constructor(
    public metamaskService: MetamaskService,
    private ethersService: EthersService,
    private accountService: AccountService) {}

  async ngOnInit() {
    this.accountSubscription = this.metamaskService.account
                                    .subscribe((res) => {
                                      this.account = res
                                      if (this.account)
                                        this.account$ = this.accountService.getAccountAsObservable(this.account);
                                    });
    this.metamaskService.setConnectedAccount();
    // this.numLands = await this.ethersService.getBalance();

  }

  async ngOnChanges() {
    if (this.account) {
      this.numLands = await this.ethersService.getBalance();
      this.account$ = this.accountService.getAccountAsObservable(this.account);
    }
  }

  ngOnDestroy() {
    this.accountSubscription.unsubscribe();
  }
}
