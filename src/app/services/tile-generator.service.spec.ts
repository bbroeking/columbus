import { TestBed } from '@angular/core/testing';

import { TileGeneratorService } from './tile-generator.service';

describe('TileGeneratorService', () => {
  let service: TileGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        {provide:TileGeneratorService, useValue:{}}
      ]
    });
    service = TestBed.inject(TileGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
