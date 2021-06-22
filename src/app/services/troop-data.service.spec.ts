import { TestBed } from '@angular/core/testing';

import { TroopDataService } from './troop-data.service';

describe('TroopDataService', () => {
  let service: TroopDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TroopDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
