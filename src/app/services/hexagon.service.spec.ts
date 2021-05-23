import { TestBed } from '@angular/core/testing';
import { Coordinate } from '../models/coordinate.model';

import { HexagonService } from './hexagon.service';

describe('HexagonService', () => {
  let service: HexagonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HexagonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a working set of coordinates around 0,0,0', () => {
    let neighbors = service.getNeighbors(new Coordinate(0,0,0));
    
    expect(neighbors.has('northWesternTile'))
    expect(neighbors.has('northEasternTile'))
    expect(neighbors.has('eastTile'))
    expect(neighbors.has('westTile'))
    expect(neighbors.has('southWesternTile'))
    expect(neighbors.has('southEasternTile'))


  })
});
