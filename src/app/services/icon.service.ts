import { Injectable } from '@angular/core';
import { BARRACKS, BIO_RESEARCH, ENERGY_REFINERY, MINERALS_REFINERY } from '../constants/buildings';
import { STIMPACK } from '../constants/research';
import { MARAUDER, MARINE } from '../constants/troops';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor() { }
  
  getIconSrc(type: string) {
    if (type == MARINE){
      return 'assets/units/marine.jpeg';
    } else if (type == MARAUDER) {
      return 'assets/units/marauder.jpg';
    } else if (type == STIMPACK) {
      return 'assets/units/stimpack.jpeg';
    } else if (type == BARRACKS) {
      return 'assets/structures/barracks.jpeg';
    } else if (type == ENERGY_REFINERY || type == MINERALS_REFINERY) {
      return 'assets/structures/refinery.jpeg';
    } else if (type == BIO_RESEARCH) {
      return 'assets/structures/bioresearch-lab.jpeg';
    } else {
      return '';
    }
  }
}
