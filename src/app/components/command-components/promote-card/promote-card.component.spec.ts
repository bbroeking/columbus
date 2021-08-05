import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoteCardComponent } from './promote-card.component';

describe('PromoteCardComponent', () => {
  let component: PromoteCardComponent;
  let fixture: ComponentFixture<PromoteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoteCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
