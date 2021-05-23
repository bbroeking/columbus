import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { EthersService } from '../services/ethers.service';

import { ParcelTileComponent } from './parcel-tile.component';

describe('ParcelTileComponent', () => {
  let component: ParcelTileComponent;
  let fixture: ComponentFixture<ParcelTileComponent>;

  const docStub = {
    valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of({})),
    set: jasmine.createSpy('set'),
    update: jasmine.createSpy('update')
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcelTileComponent ],
      providers:[ 
                  { provide: AngularFirestore, useValue: { doc: jasmine.createSpy('doc').and.returnValue(docStub) } },
                  { provide: EthersService, useValue: {} }
                ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
