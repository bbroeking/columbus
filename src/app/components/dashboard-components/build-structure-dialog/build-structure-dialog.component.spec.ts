import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildStructureDialogComponent } from './build-structure-dialog.component';

describe('BuildStructureDialogComponent', () => {
  let component: BuildStructureDialogComponent;
  let fixture: ComponentFixture<BuildStructureDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildStructureDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildStructureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
