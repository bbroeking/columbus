import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Coordinate } from 'src/app/models/coordinate.model';
import { HexagonService } from 'src/app/services/hexagon.service';
import { HoverTileMenuComponent } from '../hover-tile-menu/hover-tile-menu.component';
import * as _ from 'underscore';

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
  // numSlots: boolean[] = Array(49).fill(false).map((x, i) => x); // 4
  numSlots: number[] = Array(81).fill(false).map((x, i) => i); // 5

  mapCoordinateBase: Coordinate;
  neighbors: Map<string, Coordinate>;
  neighborsId: Map<string, number>
  mapTiles: Array<string>;

  constructor(private hexagonService: HexagonService) {}
  ngOnInit(): void {
    const mapIdAsString = this.mapId.toString();
    this.mapTiles = Array(65).fill('0').map(() => this.getTile());
    this.scrollIntoView(mapIdAsString);
  }

  openTooltip(e: MouseEvent) {
    this.menu.open(e);
  }

  closeTooltip(e: MouseEvent){
    this.menu.close();
  }

  updateDetailsTile(selectedTile:any){
    this.updateCurrentTile.emit(selectedTile);
    this.scrollIntoView(selectedTile);
  }

  scrollIntoView(selectedTile: string) {
    const itemToScrollTo = document.getElementById(selectedTile);
    // null check to ensure that the element actually exists
    if (itemToScrollTo) {
      itemToScrollTo.scrollIntoView({
        block: "center",
        inline: "center",
        behavior: "smooth"
      });
    }
  }

  getStyles(id: number) {
    const isHidden = this.mapGridHidden(id) == 0 ? 'hidden' : '';
    const tile = this.getTile()
    return isHidden + " " + tile;
  }

  mapGridHidden(id: number) {
    return this.hexagonService.mapGridHidden(5, id); // 5 is number of columns
  }

  getTile(){
    const tiles = ['stone', 'stone-moss', 'stone-moss-2', 'stone-moss-3', 
      'dirt-moss', 'dirt-moss-2', 'dirt-moss-3', 
      'rock-snow', 'rock-snow-2', 'rock-snow-3'];
    return _.sample(tiles) || '';
  }

  setTileClass(slot: number) {
    const id = this.mapGridHidden(slot);
    return this.mapTiles[id];
  }
}
