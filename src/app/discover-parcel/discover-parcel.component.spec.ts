import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverParcelComponent } from './discover-parcel.component';

describe('DiscoverParcelComponent', () => {
  let component: DiscoverParcelComponent;
  let fixture: ComponentFixture<DiscoverParcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscoverParcelComponent ]
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
