import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarrisonComponent } from './garrison.component';

describe('GarrisonComponent', () => {
  let component: GarrisonComponent;
  let fixture: ComponentFixture<GarrisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GarrisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GarrisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
