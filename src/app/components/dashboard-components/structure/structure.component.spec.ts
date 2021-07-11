import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QueueItem } from 'src/app/services/queue.service';

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
    component.structure = { 
      position: 1 , sid: "xxxxx", queued: [] as unknown as QueueItem,
      id: 'xxxxx', level: 1, built: true, queue: [], type: 'barracks'}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
