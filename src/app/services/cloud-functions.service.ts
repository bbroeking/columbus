import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import * as CloudFunctionConstants from './cloud-function-constants';
import firebase from '@firebase/app';
import '@firebase/functions'

@Injectable({
  providedIn: 'root'
})
export class CloudFunctionsService {
  private buildStructureFunction: any;

  constructor(private fns: AngularFireFunctions) { 
    fns.useEmulator("localhost", 5001); // TODO: Setup dev/prod 
    // callable functions
    this.buildStructureFunction = fns.httpsCallable(CloudFunctionConstants.buildStructure);
  }

  buildStructure(data: any) {
    return this.buildStructureFunction(data);
  }
}
