import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Coordinate } from '../models/coordinate.model';
import { EthersService } from '../services/ethers.service';
import { HexagonService } from '../services/hexagon.service';

import { MapComponent } from './map.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapComponent ],
      providers:[
        { provide: HexagonService, useValue:{ getCoordinatesFromId: jasmine.createSpy('getCoordinatesFromId')}},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
