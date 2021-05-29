import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudFunctionsService {
  data$: Observable<any>;

  constructor(private fns: AngularFireFunctions) { 
    fns.useEmulator("localhost", 5001); // TODO: Setup dev/prod 

    const callable = fns.httpsCallable('helloWorld');
    this.data$ = callable({ name: 'some-data' });
  }
}
