import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoverTileMenuComponent } from './hover-tile-menu.component';

describe('HoverTileMenuComponent', () => {
  let component: HoverTileMenuComponent;
  let fixture: ComponentFixture<HoverTileMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoverTileMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoverTileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
