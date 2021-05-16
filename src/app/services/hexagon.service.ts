import { Injectable } from '@angular/core';
import { Coordinate } from '../models/coordinate.model';

@Injectable({
  providedIn: 'root'
})
export class HexagonService {

  constructor() { }

  getNeighbors(coords: Coordinate) {
    let neighbors = new Map<string, Coordinate>([
      ['eastTile', coords.getEast()],
      ['northEastTile', coords.getNorthEast()],
      ['northWesternTile', coords.getNorthWest()],
      ['westTile', coords.getWest()],
      ['southEastTile', coords.getSouthEast()],
      ['southWestTile', coords.getSouthWest()]
    ]);
    return neighbors;
  }

  getIdFromCoordinates(coords: Coordinate): number {
    const r = (Math.abs(coords.x) + Math.abs(coords.y) + Math.abs(coords.z)) / 2;
    const id = this.totalHexagonsAtRadius(r-1) + this.matchCoordinate(r, coords);
    return id;
  }

  matchCoordinate(r: number, coords: Coordinate): number {
    let count = 0;

    let x = -r;
    let y = 0;
    let z = r;

    if (coords.isEqualComponents(x, y, z)) return count;

    for (let i = 0; i < r; i++){
      x = x + 1;
      y = y - 1;
      z = z;
      count++;
      if (coords.isEqualComponents(x, y, z)) return count;
    }

    // move northeast
    for (let i = 0; i < r; i++){
      x = x + 1;
      y = y;
      z = z - 1;
      count++;
      if (coords.isEqualComponents(x, y, z)) return count;
    }

    // move northwest
    for (let i = 0; i < r; i++){
      x = x;
      y = y + 1;
      z = z - 1;
      count++;
      if (coords.isEqualComponents(x, y, z)) return count;
    }

    // move west
    for (let i = 0; i < r; i++){
      x = x - 1;
      y = y + 1;
      z = z;
      count++;
      if (coords.isEqualComponents(x, y, z)) return count;
    }

    // move southwest
    for (let i = 0; i < r; i++){
      x = x - 1;
      y = y;
      z = z + 1;
      count++;
      if (coords.isEqualComponents(x, y, z)) return count;
    }

    // move southeast
    for (let i = 0; i < r-1; i++){
      x = x;
      y = y - 1;
      z = z + 1;
      count++;
      if (coords.isEqualComponents(x, y, z)) return count;
    }
    return count;
  }

  getCoordinatesFromId(id: number): Coordinate {
    let r = 0;
    while (6*r < id){ r++; }
    let positionOnRing = id - this.totalHexagonsAtRadius(r-1);
    return this.getCoordinates(r, positionOnRing);
  }

  totalHexagonsAtRadius(r: number){
    if (r < 1) return 0;
    return 1 + (3*r) * (r+1);
  }

  getCoordinates(r: number, supply: number): Coordinate {
    let count = 0
    let x = -r;
    let y = 0;
    let z = r;
    if (count == supply) return new Coordinate(x, y, z);
    
    // move east
    for (let i = 0; i < r; i++){
      x = x + 1;
      y = y - 1;
      z = z;
      count++;
      if (count == supply) return new Coordinate(x, y, z);
    }

    // move northeast
    for (let i = 0; i < r; i++){
      x = x + 1;
      y = y;
      z = z - 1;
      count++;
      if (count == supply) return new Coordinate(x, y, z);
    }

    // move northwest
    for (let i = 0; i < r; i++){
      x = x;
      y = y + 1;
      z = z - 1;
      count++;
      if (count == supply) return new Coordinate(x, y, z);
    }

    // move west
    for (let i = 0; i < r; i++){
      x = x - 1;
      y = y + 1;
      z = z;
      count++;
      if (count == supply) return new Coordinate(x, y, z);
    }

    // move southwest
    for (let i = 0; i < r; i++){
      x = x - 1;
      y = y;
      z = z + 1;
      count++;
      if (count == supply) return new Coordinate(x, y, z);
    }

    // move southeast
    for (let i = 0; i < r-1; i++){
      x = x;
      y = y - 1;
      z = z + 1;
      count++;
      if (count == supply) return new Coordinate(x, y, z);
    }

    return new Coordinate(x, y, z);
  }

}
