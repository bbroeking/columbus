import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EthersService } from '../services/ethers.service';
import { TileDataService } from '../services/tile-data.service';
import { TileGeneratorService } from '../services/tile-generator.service';

import { DiscoverParcelComponent } from './discover-parcel.component';

describe('DiscoverParcelComponent', () => {
  let component: DiscoverParcelComponent;
  let fixture: ComponentFixture<DiscoverParcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscoverParcelComponent ],
      providers:[
        {provide: EthersService, useValue: {}},
        {provide: TileDataService, useValue: {}},
        {provide: TileGeneratorService, useValue: {}},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverParcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
