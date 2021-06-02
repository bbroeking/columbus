import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EthersService } from '../services/ethers.service';
import { TileDataService } from '../services/tile-data.service';

import { DiscoverComponent } from './discover.component';

describe('DiscoverComponent', () => {
  let component: DiscoverComponent;
  let fixture: ComponentFixture<DiscoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: EthersService, useValue: {}},
        { provide: TileDataService, useValue: {}}
      ],
      declarations: [ DiscoverComponent ]
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
