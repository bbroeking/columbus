import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BattlefieldDataService } from 'src/app/services/battlefield-data.service';
import { ConflictDataService } from 'src/app/services/conflict-data.service';

import { PlanningTableComponent } from './planning-table.component';

describe('PlanningTableComponent', () => {
  let component: PlanningTableComponent;
  let fixture: ComponentFixture<PlanningTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningTableComponent ],
      providers: [
        { provide: BattlefieldDataService, 
          useValue: {
            currentAttacking: of([]),
            currentDefending: of([]),
            isValidBattlefield: jasmine.createSpy('isValidBattlefield').and.returnValue(true)
          } 
        },
        { provide: ConflictDataService, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
