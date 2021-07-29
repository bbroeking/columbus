import { Pipe, PipeTransform } from '@angular/core';
import { Parcel } from '../interfaces/parcel';
import * as _ from 'underscore';

@Pipe({
  name: 'filterAnnexed'
})
export class FilterAnnexedPipe implements PipeTransform {

  transform(value: Parcel[] | null, ...args: unknown[]): Parcel[] {
    if(value)
      return this.filterAnnexed(value);
    return [];
  }

  filterAnnexed(values: Parcel[]) {
    return _.filter(values, (val) => val.annexed == false);
  }
}

