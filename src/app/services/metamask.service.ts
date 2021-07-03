import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MetamaskService {
  
  constructor(private route: Router) {}

  setConnectedAccount(accounts: string[]) {
    localStorage.setItem('metamask', accounts[0]);
  }
  getConnectedAccount() {
    if (!this.isMetaMaskConnected()){
      console.error("no connected account, rerouting");
      this.route.navigate(['/login']);
      return '';
    } else if (localStorage.getItem('metamask')) {
      return localStorage.getItem('metamask') || '';
    } else {
      this.route.navigate(['/login']);
      return '';
    }
  }
  disconnectMetaMaskAccount() {
    localStorage.removeItem('metamask');
  }

  isMetaMaskConnected(): boolean {
    return localStorage.getItem('metamask') ? true : false;
  }
}
