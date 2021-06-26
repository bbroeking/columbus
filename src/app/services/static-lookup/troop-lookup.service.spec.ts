import { TestBed } from '@angular/core/testing';
import { ENERGY, MINERALS, RARE_ENERGY, RARE_MINERALS } from 'src/app/constants/resources';
import { Attributes, MARINE } from 'src/app/constants/troops';

import { TroopLookupService } from './troop-lookup.service';

describe('TroopLookupService', () => {
  let service: TroopLookupService;

  let marineData = {
      'type': MARINE,
      'buildResources': {
          [MINERALS]: 0,
          [RARE_MINERALS]: 0,
          [ENERGY]: 0,
          [RARE_ENERGY]: 0
      },
      'baseStats': {
          [Attributes.HP]: 20,
          [Attributes.ATTACK]: 5,
          [Attributes.DEFENSE]: 5,
          [Attributes.MINDAMAGE]: 0,
          [Attributes.MAXDAMAGE]: 5,
          [Attributes.SKEWDAMAGE]: 1
      }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TroopLookupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return marine', () => {
    const marine = service.lookup('marine')
    expect(marine).toEqual(marineData);
  })
});
