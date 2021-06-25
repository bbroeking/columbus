import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ConflictDataService } from 'src/app/services/conflict-data.service';

import { WarRoomComponent } from './war-room.component';

describe('WarRoomComponent', () => {
  let component: WarRoomComponent;
  let fixture: ComponentFixture<WarRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarRoomComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: {
          paramMap: of('attacking'),
          }
        },
        { provide: ConflictDataService, useValue: {
            getConflictValuesAsObservable: () => {}
          } 
        }
      ]
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
