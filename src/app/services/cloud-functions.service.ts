import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import * as CloudFunctionConstants from './cloud-function-constants';
import firebase from '@firebase/app';
import '@firebase/functions'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudFunctionsService {
  private buildStructureFunction: any;
  private refreshUnclaimedLandsFunction: any;

  constructor(private fns: AngularFireFunctions) { 
    // callable functions
    this.buildStructureFunction = fns.httpsCallable(CloudFunctionConstants.buildStructure);
    this.refreshUnclaimedLandsFunction = fns.httpsCallable(CloudFunctionConstants.refreshUnclaimedLands);
  }

  async buildStructure(data: any) {
    const res = await this.buildStructureFunction(data).toPromise();
    return res;
  }

  async refreshUnclaimedLands(data: any) {
    // return this.refreshUnclaimedLandsFunction(data);
    const res = await this.refreshUnclaimedLandsFunction(data).toPromise();
    return res;
  }
}
