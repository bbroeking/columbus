import { Component, Input, OnInit } from '@angular/core';
import { EthersService } from '../services/ethers.service';
import { HexagonService } from '../services/hexagon.service';
import { Coordinate } from '../models/coordinate.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {

  @Input() mapId: number;

  // neighbor Ids
  northWesternTile: string = "northWesternTile";
  northEasternTile: string = "northEasternTile";
  eastTile: string = "eastTile";
  westTile: string = "westTile";
  southWesternTile: string = "southWesternTile";
  southEasternTile: string = "southEasternTile";

  public parcelNorthWesternTile: number;
  public parcelNorthEasternTile: number;
  public parcelEastTile: number;
  public parcelWestTile: number;
  public parcelSouthWesternTile: number;
  public parcelSouthEasternTile: number;

  mapCoordinateBase: Coordinate;
  neighbors: Map<string, Coordinate>;
  neighborsId: Map<string, number>

  constructor(private hexagonService: HexagonService) {}

  async ngOnInit(){
    this.mapCoordinateBase = this.hexagonService.getCoordinatesFromId(this.mapId);
    this.neighbors = this.hexagonService.getNeighbors(this.mapCoordinateBase);
    this.neighborsId = new Map<string, number>();
    this.neighbors.forEach((value: Coordinate, key: string) => {
      this.neighborsId.set(key, this.hexagonService.getIdFromCoordinates(value));
    })
    this.getNeighborParcelIds();
  }


  getNeighborParcelIds() {
    this.parcelNorthWesternTile = this.neighborsId.get(this.northWesternTile) || -1;
    this.parcelNorthEasternTile = this.neighborsId.get(this.northEasternTile) || -1;
    this.parcelEastTile = this.neighborsId.get(this.eastTile) || -1;
    this.parcelWestTile = this.neighborsId.get(this.westTile) || -1;
    this.parcelSouthEasternTile = this.neighborsId.get(this.southEasternTile) || -1;
    this.parcelSouthWesternTile = this.neighborsId.get(this.southWesternTile) || -1;
  }
}
