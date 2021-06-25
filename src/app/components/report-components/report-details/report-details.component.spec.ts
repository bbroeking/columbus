import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TileDataService } from 'src/app/services/tile-data.service';

import { ReportDetailsComponent } from './report-details.component';

describe('ReportDetailsComponent', () => {
  let component: ReportDetailsComponent;
  let fixture: ComponentFixture<ReportDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDetailsComponent ],
      providers: [
        {
          provide: TileDataService, useValue: { 
            getTileValuesAsObservable: () => {}
          } 
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
