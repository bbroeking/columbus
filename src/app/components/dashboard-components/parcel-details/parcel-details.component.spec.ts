import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { EthersService } from 'src/app/services/ethers.service';
import { TileDataService } from 'src/app/services/tile-data.service';
import { ParcelDetailsComponent } from './parcel-details.component';

describe('ParcelDetailsComponent', () => {
  let component: ParcelDetailsComponent;
  let fixture: ComponentFixture<ParcelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: TileDataService, useValue: {}},
        { provide: AngularFirestore, useValue: {}},
        {provide: EthersService, useValue:{}}
      ],
      declarations: [ ParcelDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
