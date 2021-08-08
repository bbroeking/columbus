import { Component, OnInit } from '@angular/core';
import MetaMaskOnboarding from '@metamask/onboarding'
import { MetamaskService } from 'src/app/services/metamask.service';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  onboarding: any;

  account:string;
  accountSubscription: Subscription;
  metamaskSubscription: Subscription;

  constructor(
    private router: Router,
    private metamaskService: MetamaskService,
    private accountService: AccountService) {}
  
  async ngOnInit() {
    this.accountSubscription = this.metamaskService.account
      .subscribe((account) => {
        this.account = account;
        if(this.account)
          this.router.navigate(['/reports']);
      });

    if(!MetaMaskOnboarding.isMetaMaskInstalled()) {
      // TODO: test adding the extension workflow
    }
  }

  ngOnDestroy() {
    if(this.accountSubscription)
      this.accountSubscription.unsubscribe();
    if(this.metamaskSubscription)
      this.metamaskSubscription.unsubscribe();
  }

  async onClickInstallMetaMask() {
    const currentUrl = new URL(window.location.href)
    const forwarderOrigin = currentUrl.hostname === 'localhost' ? 'http://localhost:9010' : undefined
    try {
      this.onboarding = new MetaMaskOnboarding({ forwarderOrigin })
    } catch (error) {
      console.error(error)
    }
  }

  async onClickConnectToMetaMask() {
    this.metamaskService.connectAccount();
    this.metamaskSubscription = this.metamaskService.account.subscribe((address) => {
      if(address) {
        this.accountService.initAccount(address);
        this.router.navigate(['/reports'])
      }
    });
  }

}
