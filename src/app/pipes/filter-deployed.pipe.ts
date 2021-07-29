import { Pipe, PipeTransform } from '@angular/core';
import { Troop } from 'src/app/constants/troops';
import * as _ from 'underscore';

@Pipe({
  name: 'filterDeployed'
})
export class FilterDeployedPipe implements PipeTransform {

  transform(value: Troop[] | null, ...args: unknown[]): Troop[] {
    if(value)
      return this.filterTroops(value);
    return [];
  }

  filterTroops(troops: Troop[]) {
    return _.filter(troops, (val) => val.deployed == false);
  }
}
