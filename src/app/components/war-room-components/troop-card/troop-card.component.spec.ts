import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TroopCardComponent } from './troop-card.component';

describe('TroopCardComponent', () => {
  let component: TroopCardComponent;
  let fixture: ComponentFixture<TroopCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TroopCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TroopCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
