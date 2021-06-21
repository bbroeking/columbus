import { Component, Input, OnInit } from '@angular/core';
import { Structure } from 'src/app/services/tile-data.service';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.less']
})
export class StructureComponent implements OnInit {
  @Input() structure: Structure;
  @Input() selectedTile: number;
  constructor() { }
  
  
  display = false;
  onPress() {
    this.display = !this.display
  }

  
  ngOnInit(): void {
  }

}
