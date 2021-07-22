import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetamaskNotConnectedComponent } from './metamask-not-connected.component';

describe('MetamaskNotConnectedComponent', () => {
  let component: MetamaskNotConnectedComponent;
  let fixture: ComponentFixture<MetamaskNotConnectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetamaskNotConnectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetamaskNotConnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
