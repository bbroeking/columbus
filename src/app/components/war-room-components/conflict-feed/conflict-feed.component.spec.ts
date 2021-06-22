import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConflictFeedComponent } from './conflict-feed.component';

describe('ConflictFeedComponent', () => {
  let component: ConflictFeedComponent;
  let fixture: ComponentFixture<ConflictFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConflictFeedComponent ]
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
