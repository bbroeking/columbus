import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureDropdownComponent } from './structure-dropdown.component';

describe('StructureDropdownComponent', () => {
  let component: StructureDropdownComponent;
  let fixture: ComponentFixture<StructureDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
