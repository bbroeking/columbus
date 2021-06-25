import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EthersService } from 'src/app/services/ethers.service';

import { ReportsComponent } from './reports.component';

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsComponent ],
      providers: [
        { provide: EthersService, 
          useValue: {
            getTokenMetadataIdsByOwner: () => {}
          }}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
