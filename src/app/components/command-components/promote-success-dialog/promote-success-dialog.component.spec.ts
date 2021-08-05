import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoteSuccessDialogComponent } from './promote-success-dialog.component';

describe('PromoteSuccessDialogComponent', () => {
  let component: PromoteSuccessDialogComponent;
  let fixture: ComponentFixture<PromoteSuccessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoteSuccessDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoteSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
