import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Coordinate } from '../models/coordinate.model';
import { EthersService } from '../services/ethers.service';
import { HexagonService } from '../services/hexagon.service';
import { MetadataService } from '../services/metadata.service';

import { ExplorerComponent } from './explorer.component';

describe('ExplorerComponent', () => {
  let component: ExplorerComponent;
  let fixture: ComponentFixture<ExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplorerComponent ],
      providers:[
        { provide: EthersService, useValue: { getBalanceOf: jasmine.createSpy('getBalanceOf'),
                                              getTokenOfOwnerByIdex: jasmine.createSpy('getTokenOfOwnerByIndex') }},
        { provide: MetadataService, useValue: {}},
        { provide: HexagonService, useValue: { getCoordinatesFromId: () => new Coordinate(0,0,0) }}                   
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
