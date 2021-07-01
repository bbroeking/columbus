import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MetamaskService {
  account:string;
  constructor(private route: Router) {}

  setConnectedAccount(accounts: string[]) {
    this.account = accounts[0];
  }
  getConnectedAccount() {
    if (!this.isMetaMaskConnected()){
      console.error("no connected account, rerouting");
      this.route.navigate(['/login']);
    }
    return this.account;
  }

  isMetaMaskConnected(): boolean {
    return this.account ? true : false;
  }
}
