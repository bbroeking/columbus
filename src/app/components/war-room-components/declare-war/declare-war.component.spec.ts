import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclareWarComponent } from './declare-war.component';

describe('DeclareWarComponent', () => {
  let component: DeclareWarComponent;
  let fixture: ComponentFixture<DeclareWarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclareWarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclareWarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
