import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/services/auth.service';
import { BattlefieldDataService } from 'src/app/services/battlefield-data.service';
import { TroopDataService } from 'src/app/services/troop-data.service';

import { GarrisonComponent } from './garrison.component';

describe('GarrisonComponent', () => {
  let component: GarrisonComponent;
  let fixture: ComponentFixture<GarrisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GarrisonComponent ],
      providers: [
        {provide: AuthService, useValue: {} },
        {provide: TroopDataService, useValue: {} },
        {provide: BattlefieldDataService, useValue: {}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GarrisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
