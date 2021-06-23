import { TestBed } from '@angular/core/testing';

import { BattlefieldDataService } from './battlefield-data.service';

describe('BattlefieldDataService', () => {
  let service: BattlefieldDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BattlefieldDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
