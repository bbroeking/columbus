import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import MetaMaskOnboarding from '@metamask/onboarding'
import { MetamaskService } from 'src/app/services/metamask.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  user$: any;
  onboarding: any;
  accounts: string[];

  isMetaMaskInstalled: boolean;
  isConnected: boolean;

  constructor(public auth: AuthService,
              private metamaskService: MetamaskService) {
                this.isConnected = true;
                this.isMetaMaskInstalled = true;
              }
  
  async ngOnInit() {
    this.user$ = this.auth.user$;

    if(!MetaMaskOnboarding.isMetaMaskInstalled()) {
      this.isMetaMaskInstalled = false;
    } else if (this.metamaskService.isMetaMaskConnected()) {
      if(this.onboarding)
        this.onboarding.stopOnboarding();
    } else {
      this.isConnected = false;
      this.connectToMetaMask();
    }
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
  async connectToMetaMask() {
    const { ethereum } = window as any;
    try {
      this.accounts = await ethereum.request({ method: 'eth_accounts' });
      this.metamaskService.setConnectedAccount(this.accounts);
      this.isConnected = true;
    } catch (err) {
      console.error('Error on init when getting accounts', err)
    }
  }

}
