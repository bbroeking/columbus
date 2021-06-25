import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';

import { ConflictDataService } from './conflict-data.service';

describe('ConflictDataService', () => {
  let service: ConflictDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AngularFirestore, useValue: {}}
      ]
    });
    service = TestBed.inject(ConflictDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
