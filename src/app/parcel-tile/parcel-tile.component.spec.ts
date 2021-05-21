import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelTileComponent } from './parcel-tile.component';

describe('ParcelTileComponent', () => {
  let component: ParcelTileComponent;
  let fixture: ComponentFixture<ParcelTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcelTileComponent ]
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
