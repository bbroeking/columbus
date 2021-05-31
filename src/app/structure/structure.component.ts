import { Component, Input, OnInit } from '@angular/core';
import { Building } from '../services/tile-data.service';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.less']
})
export class StructureComponent implements OnInit {
  @Input() structure: Building
  constructor() { }
  
  
  display = false;
  onPress() {
    this.display = !this.display
  }

  
  ngOnInit(): void {
  }

}
