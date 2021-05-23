import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EthersService } from '../services/ethers.service';

import { BrowserComponent } from './browser.component';

describe('BrowserComponent', () => {
  let component: BrowserComponent;
  let fixture: ComponentFixture<BrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowserComponent ],
      providers: [
        { provide: EthersService, useValue: { getBalanceOf: jasmine.createSpy('getBalanceOf'),
                                              getTokenOfOwnerByIdex: jasmine.createSpy('getTokenOfOwnerByIndex').and.returnValue(Promise.resolve({}))}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
