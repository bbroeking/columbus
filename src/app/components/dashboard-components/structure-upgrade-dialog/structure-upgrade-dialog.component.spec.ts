import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureUpgradeDialogComponent } from './structure-upgrade-dialog.component';

describe('StructureUpgradeDialogComponent', () => {
  let component: StructureUpgradeDialogComponent;
  let fixture: ComponentFixture<StructureUpgradeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureUpgradeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureUpgradeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
