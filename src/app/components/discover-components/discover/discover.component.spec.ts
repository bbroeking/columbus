import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EthersService } from 'src/app/services/ethers.service';
import { TileDataService } from 'src/app/services/tile-data.service';
import { TileGeneratorService } from 'src/app/services/tile-generator.service';
import { DiscoverParcelComponent } from '../discover-parcel/discover-parcel.component';
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
