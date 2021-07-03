import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MetamaskService } from './services/metamask.service';

@Injectable({
  providedIn: 'root'
})
export class MetamaskGuard implements CanActivate {
  constructor(
    private metamaskService: MetamaskService,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.metamaskService.isMetaMaskConnected) {
        this.router.navigate(['/login']);
        return false;
      };
      return true;
  }
  
}
