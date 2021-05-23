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
    
    expect(neighbors.get('northWestTile')).toEqual(new Coordinate(0, 1, -1))
    expect(neighbors.get('northEastTile')).toEqual(new Coordinate(1, 0, -1))
    expect(neighbors.get('eastTile')).toEqual(new Coordinate(1, -1, 0))
    expect(neighbors.get('westTile')).toEqual(new Coordinate(-1, 1, 0))
    expect(neighbors.get('southWestTile')).toEqual(new Coordinate(-1, 0, 1))
    expect(neighbors.get('southEastTile')).toEqual(new Coordinate(0, -1, 1))
  })

  it('should get coordinates from id', () => {
    let zero = service.getCoordinatesFromId(0);
    expect(zero).toEqual(new Coordinate(0,0,0));

    let one = service.getCoordinatesFromId(1);
    expect(one).toEqual(new Coordinate(-1, 0, 1));

    let two = service.getCoordinatesFromId(2);
    expect(two).toEqual(new Coordinate(0, -1, 1));

    let three = service.getCoordinatesFromId(3);
    expect(three).toEqual(new Coordinate(1, -1, 0));

    let four = service.getCoordinatesFromId(4);
    expect(four).toEqual(new Coordinate(1, 0, -1));

    let five = service.getCoordinatesFromId(5);
    expect(five).toEqual(new Coordinate(0, 1, -1));

    let six = service.getCoordinatesFromId(6);
    expect(six).toEqual(new Coordinate(-1, 1, 0));

  })

  it('should get id from coordinates', () => {
    let zero = service.getIdFromCoordinates(new Coordinate(0,0,0));
    expect(zero).toEqual(0);

    let one = service.getIdFromCoordinates(new Coordinate(-1, 0, 1));
    expect(one).toEqual(1);

    let two = service.getIdFromCoordinates(new Coordinate(0, -1, 1))
    expect(two).toEqual(2);

    let three = service.getIdFromCoordinates(new Coordinate(1, -1, 0))
    expect(three).toEqual(3);

    let four = service.getIdFromCoordinates(new Coordinate(1, 0, -1))
    expect(four).toEqual(4);

    let five = service.getIdFromCoordinates(new Coordinate(0, 1, -1));
    expect(five).toEqual(5);

    let six = service.getIdFromCoordinates(new Coordinate(-1, 1, 0));
    expect(six).toEqual(6);
  })

  it('should get coordinates for hexagons where r > 1', () => {
    let seven = service.getCoordinatesFromId(7);
    expect(seven).toEqual(new Coordinate(-2, 0, 2));

    let ten = service.getCoordinatesFromId(10);
    expect(ten).toEqual(new Coordinate(1, -2, 1));

    let twelve = service.getCoordinatesFromId(12);
    expect(twelve).toEqual(new Coordinate(2, -1, -1));

    let thirteen = service.getCoordinatesFromId(13);
    expect(thirteen).toEqual(new Coordinate(2, 0, -2));

    let eighteen = service.getCoordinatesFromId(18);
    expect(eighteen).toEqual(new Coordinate(-2, 1, 1));
  })

  it('should get correct total number of hexagons', () => {
    let radiusZero = service.totalHexagonsAtRadius(0);
    let radiusOne = service.totalHexagonsAtRadius(1);
    let radiusTwo = service.totalHexagonsAtRadius(2);
    expect(radiusZero).toEqual(1);
    expect(radiusOne).toEqual(6*1 + 1) // 6 * radius
    expect(radiusTwo).toEqual(6*2 + 6*1 + 1)
  })

  it('should convert to and from coordinates and ids properly', () => {
    let coord = service.getCoordinatesFromId(22);
    let id = service.getIdFromCoordinates(coord);
    let coord2 = service.getCoordinatesFromId(id);
    expect(id).toEqual(22);
    expect(coord).toEqual(coord2);
  })
});
