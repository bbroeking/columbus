import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConflictRoundComponent } from './conflict-round.component';

describe('ConflictRoundComponent', () => {
  let component: ConflictRoundComponent;
  let fixture: ComponentFixture<ConflictRoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConflictRoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConflictRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.roundData = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
