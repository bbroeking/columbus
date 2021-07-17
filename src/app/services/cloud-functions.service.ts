import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import * as CloudFunctionConstants from './cloud-function-constants';
import firebase from '@firebase/app';
import '@firebase/functions'

@Injectable({
  providedIn: 'root'
})
export class CloudFunctionsService {
  private buildStructureFunction: any;
  private refreshUnclaimedLandsFunction: any;
  private simulateCombatFunction: any;
  private updateProductionTilesFunction: any;

  constructor(private fns: AngularFireFunctions) { 
    // callable functions
    this.buildStructureFunction = fns.httpsCallable(CloudFunctionConstants.BUILD);
    this.refreshUnclaimedLandsFunction = fns.httpsCallable(CloudFunctionConstants.REFRESH);
    this.simulateCombatFunction = fns.httpsCallable(CloudFunctionConstants.SIMULATE_COMBAT);
    this.updateProductionTilesFunction = fns.httpsCallable(CloudFunctionConstants.UPDATE_PRODUCTION_TILES);
  }

  async buildStructure(data: any) {
    const res = await this.buildStructureFunction(data).toPromise();
    return res;
  }

  async refreshUnclaimedLands(data: any) {
    const res = await this.refreshUnclaimedLandsFunction(data).toPromise();
    return res;
  }

  async simulateCombat(data: any) {
    const res = await this.simulateCombatFunction(data).toPromise();
    return res;
  }

  async updateProductionTiles(data: any) {
    const res = await this.updateProductionTilesFunction(data).toPromise();
    return res;
  }
}
