import { TestBed } from '@angular/core/testing';

import { TileDataService } from './tile-data.service';

describe('TileDataService', () => {
  let service: TileDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TileDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
