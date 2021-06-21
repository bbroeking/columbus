import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarRoomComponent } from './war-room.component';

describe('WarRoomComponent', () => {
  let component: WarRoomComponent;
  let fixture: ComponentFixture<WarRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
