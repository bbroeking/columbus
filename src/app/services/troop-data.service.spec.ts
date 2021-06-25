import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';

import { TroopDataService } from './troop-data.service';

describe('TroopDataService', () => {
  let service: TroopDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AngularFirestore, useValue: {}}
      ]
    });
    service = TestBed.inject(TroopDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
