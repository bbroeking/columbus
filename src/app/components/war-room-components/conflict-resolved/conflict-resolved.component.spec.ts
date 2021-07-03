import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConflictResolvedComponent } from './conflict-resolved.component';

describe('ConflictResolvedComponent', () => {
  let component: ConflictResolvedComponent;
  let fixture: ComponentFixture<ConflictResolvedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConflictResolvedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConflictResolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
