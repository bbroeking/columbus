import { Component, Input, OnInit } from '@angular/core';
import {BARRACKS, BUILDINGS} from '../../../constants/buildings';
import * as _ from 'underscore';
// import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-structure-dropdown',
  templateUrl: './structure-dropdown.component.html',
  styleUrls: ['./structure-dropdown.component.less']
})
export class StructureDropdownComponent implements OnInit {
  @Input() type: string
  options: string[];
  selectedValue: string;

  // opts = new FormControl();
  constructor() { }

  ngOnInit(): void {
    let structure = BUILDINGS[this.type];
    if (structure)
      this.options = _.keys(structure.options);
      console.log(this.options)
  }

}
