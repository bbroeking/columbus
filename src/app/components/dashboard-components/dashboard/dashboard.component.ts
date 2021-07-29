import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HoverTileMenuComponent } from '../hover-tile-menu/hover-tile-menu.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  @Input() hoverTileComponent: HoverTileMenuComponent;

  mapId: number;
  selectedTile: number;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.mapId = +(params.get('mapId') || 30);
    });
    this.selectedTile = this.mapId;
  }

  changeSelectedTile(selectedTile: number){
    this.selectedTile = selectedTile
  }
}
