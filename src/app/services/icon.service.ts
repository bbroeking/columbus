import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor() { }
  
  getIconSrc(type: string) {
    if (type == 'marine'){
      return 'assets/units/marine.jpeg';
    } else if (type == 'marauder') {
      return 'assets/units/marauder.jpg';
    } else if (type == 'StimPack') {
      return 'assets/units/stimpack.jpeg';
    } else {
      return '';
    }
  }
}
