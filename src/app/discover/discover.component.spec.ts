import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { DiscoverParcelComponent } from '../discover-parcel/discover-parcel.component';
import { EthersService } from '../services/ethers.service';
import { TileDataService } from '../services/tile-data.service';
import { TileGeneratorService } from '../services/tile-generator.service';

import { DiscoverComponent } from './discover.component';




describe('DiscoverComponent', () => {
  let component: DiscoverComponent;
  let fixture: ComponentFixture<DiscoverComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: EthersService, useValue: {}},
        { provide: TileDataService, useValue: {}},
        { provide: TileGeneratorService, useValue: {
          getUnclaimedLand: () => (of('somes')),
        }},
      ],
      declarations: [ DiscoverComponent, DiscoverParcelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
