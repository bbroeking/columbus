import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HoverTileMenuComponent } from '../hover-tile-menu/hover-tile-menu.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  mapId: number;
  selectedTile: number;
  @Input() hoverTileComponent: HoverTileMenuComponent;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.mapId = +(params.get('mapId') || 0);
    });
    this.selectedTile = this.mapId;
  }

  handleDetailChange(selectedTile: number){
    this.selectedTile = selectedTile
    console.log(selectedTile);
  }
}
