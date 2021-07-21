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
      ['northWestTile', coords.getNorthWest()],
      ['westTile', coords.getWest()],
      ['southEastTile', coords.getSouthEast()],
      ['southWestTile', coords.getSouthWest()]
    ]);
    return neighbors;
  }

  mapGridHidden(r: number, id: number) {
    const columns = (r * 2) - 1;
    const row = (id / columns >> 0);
    const posInRow = id % columns;
    const middleRow = (columns - 1) / 2; // zero indexed middle row
    const numberOfHiddenTiles = Math.abs(row - middleRow);
    const front = Math.floor(numberOfHiddenTiles / 2);
    const back = Math.ceil(numberOfHiddenTiles / 2);
    if(posInRow < front || posInRow >= (columns - back)){
      return 0;
    }
    else {
      return this.updateId(row, middleRow, r, posInRow - front) + 1; // start index from 1
    }
  }

  updateId(row: number, middleRow: number, topRowLength: number, posInRow: number) {
    let currRowLength = topRowLength;
    let id = 0;
    for(let i = 0; i < row; i++){
      
      if (i > middleRow) {
        currRowLength--;
        id += currRowLength;
      } else {
        id += currRowLength;
        currRowLength++;
      }
    }
    return id + posInRow;
  }

  getIdFromCoordinates(coords: Coordinate): number {
    if (coords.isEqualComponents(0, 0, 0)) return 0;
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
    while (this.totalHexagonsAtRadius(r) <= id){ r++; }
    let positionOnRing = id - this.totalHexagonsAtRadius(r-1);
    return this.getCoordinates(r, positionOnRing);
  }

  totalHexagonsAtRadius(r: number){
    if (r < 1) return 1;
    return 1 + (3*r) * (r+1);
  }

  getCoordinates(r: number, supply: number): Coordinate {
    if (r == 0) return new Coordinate(0,0,0);

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
