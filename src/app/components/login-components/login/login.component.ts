import { Component, OnInit } from '@angular/core';
import MetaMaskOnboarding from '@metamask/onboarding'
import { MetamaskService } from 'src/app/services/metamask.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  onboarding: any;

  account:string;
  accountSubscription: Subscription;

  constructor(private metamaskService: MetamaskService) {
  }
  
  async ngOnInit() {
    this.accountSubscription = this.metamaskService.account
                                    .subscribe((res) => {
                                      this.account = res
                                    });

    if(!MetaMaskOnboarding.isMetaMaskInstalled()) {
      // TODO: test adding the extension workflow
    }
  }

  ngOnDestroy() {
    this.accountSubscription.unsubscribe();
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
  }

}
