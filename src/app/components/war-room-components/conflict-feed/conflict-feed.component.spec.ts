import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ConflictDataService } from 'src/app/services/conflict-data.service';

import { ConflictFeedComponent } from './conflict-feed.component';

describe('ConflictFeedComponent', () => {
  let component: ConflictFeedComponent;
  let fixture: ComponentFixture<ConflictFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConflictFeedComponent ],
      providers: [
        { 
          provide: ConflictDataService, useValue: { getConflictUpdatesValuesAsObservable: () => of('this') }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConflictFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
