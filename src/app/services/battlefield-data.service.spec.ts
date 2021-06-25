import { TestBed } from '@angular/core/testing';

import { BattlefieldDataService } from './battlefield-data.service';
import { ConflictDataService } from './conflict-data.service';

describe('BattlefieldDataService', () => {
  let service: BattlefieldDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ConflictDataService, useValue: {}}
      ]
    });
    service = TestBed.inject(BattlefieldDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
