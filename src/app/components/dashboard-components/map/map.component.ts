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

  // numSlots: boolean[] = Array(9).fill(false).map((x,i)=>x); // 2
  // numSlots: boolean[] = Array(30).fill(false).map((x,i)=>x); // 3 -- we get 30 from 5 * num rows
  numSlots: boolean[] = Array(49).fill(false).map((x, i) => x);

  mapCoordinateBase: Coordinate;
  neighbors: Map<string, Coordinate>;
  neighborsId: Map<string, number>

  constructor(private hexagonService: HexagonService) {}

  async ngOnInit(){
    console.log(this.hexagonService.totalHexagonsAtRadius(4));
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
