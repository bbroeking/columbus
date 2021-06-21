import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureComponent } from './structure.component';

describe('StructureComponent', () => {
  let component: StructureComponent;
  let fixture: ComponentFixture<StructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureComponent);
    component = fixture.componentInstance;
    component.structure = { position: 1 , sid: "xxxxx", id: 'xxxxx', level: 1}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
