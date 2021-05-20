import { Component, OnInit } from '@angular/core';
import { EthersService } from '../services/ethers.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HexagonService } from '../services/hexagon.service';
import { Coordinate } from '../models/coordinate.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {

  mapId: number;
  mapCoordinateBase: Coordinate;
  neighbors: Map<string, Coordinate>;
  neighborsId: Map<string, number>

  constructor(private ethersService: EthersService,
              private hexagonService: HexagonService,
              private route: ActivatedRoute) {}

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.mapId = +(params.get('mapId') || 0);
    });
    this.mapCoordinateBase = this.hexagonService.getCoordinatesFromId(this.mapId);
    this.neighbors = this.hexagonService.getNeighbors(this.mapCoordinateBase);
    this.neighborsId = new Map<string, number>();
    this.neighbors.forEach((value: Coordinate, key: string) => {
      this.neighborsId.set(key, this.hexagonService.getIdFromCoordinates(value));
    })
    console.log(this.neighborsId);

  }

  
}
