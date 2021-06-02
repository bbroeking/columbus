import { TestBed } from '@angular/core/testing';
import { AngularFireFunctions } from '@angular/fire/functions';

import { CloudFunctionsService } from './cloud-functions.service';

describe('CloudFunctionsService', () => {
  let service: CloudFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AngularFireFunctions, useValue: {
          useEmulator: jasmine.createSpy(),
          httpsCallable: jasmine.createSpy()
        }}
      ]
    });
    service = TestBed.inject(CloudFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
