import { TestBed } from '@angular/core/testing';

import { InitalizeService } from './initalize.service';

describe('InitalizeService', () => {
  let service: InitalizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InitalizeService]
    });
    service = TestBed.inject(InitalizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
