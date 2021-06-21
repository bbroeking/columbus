import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Coordinate } from 'src/app/models/coordinate.model';
import { HexagonService } from 'src/app/services/hexagon.service';
import { HoverTileMenuComponent } from '../hover-tile-menu/hover-tile-menu.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {

  @Input() mapId: number;
  @Output() updateCurrentTile: EventEmitter<any> = new EventEmitter();
  @ViewChild(HoverTileMenuComponent) menu: HoverTileMenuComponent;

  // neighbor Ids
  northWestTile: string = "northWestTile";
  northEastTile: string = "northEastTile";
  eastTile: string = "eastTile";
  westTile: string = "westTile";
  southWestTile: string = "southWestTile";
  southEastTile: string = "southEastTile";

  public parcelNorthWesternTile: number | undefined;
  public parcelNorthEasternTile: number | undefined;
  public parcelEastTile: number | undefined;
  public parcelWestTile: number | undefined;
  public parcelSouthWesternTile: number | undefined;
  public parcelSouthEasternTile: number | undefined;

  mapCoordinateBase: Coordinate;
  neighbors: Map<string, Coordinate>;
  neighborsId: Map<string, number>

  constructor(private hexagonService: HexagonService) {}

  async ngOnInit(){
    this.update();
  }

  ngOnChanges() {
    this.update();
  }

  update() {
    this.mapCoordinateBase = this.hexagonService.getCoordinatesFromId(this.mapId);
    this.neighbors = this.hexagonService.getNeighbors(this.mapCoordinateBase);
    this.neighborsId = new Map<string, number>();
    this.neighbors.forEach((value: Coordinate, key: string) => {
      this.neighborsId.set(key, this.hexagonService.getIdFromCoordinates(value));
    })
    this.getNeighborParcelIds();
  }

  getNeighborParcelIds() {
    this.parcelNorthWesternTile = this.neighborsId.get(this.northWestTile);
    this.parcelNorthEasternTile = this.neighborsId.get(this.northEastTile);
    this.parcelEastTile = this.neighborsId.get(this.eastTile);
    this.parcelWestTile = this.neighborsId.get(this.westTile);
    this.parcelSouthEasternTile = this.neighborsId.get(this.southEastTile);
    this.parcelSouthWesternTile = this.neighborsId.get(this.southWestTile);
  }

  openTooltip(e: MouseEvent) {
    this.menu.open(e);
  }

  closeTooltip(e: MouseEvent){
    this.menu.close();
  }

  updateDetailsTile(selectedTile:any){
    this.updateCurrentTile.emit(selectedTile);
  }
}
