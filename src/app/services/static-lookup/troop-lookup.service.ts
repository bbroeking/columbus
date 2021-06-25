import { Injectable } from '@angular/core';
import { TROOPS } from '../../constants/troops';
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class TroopLookupService {

  constructor() { }

  lookup(type: string) {
    return _.find(TROOPS, (troop) => troop.type == type);
  }
}
