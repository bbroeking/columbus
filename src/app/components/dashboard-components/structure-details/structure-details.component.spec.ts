import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EthersService } from 'src/app/services/ethers.service';
import { TileDataService } from 'src/app/services/tile-data.service';

import { StructureDetailsComponent } from './structure-details.component';

describe('StructureDetailsComponent', () => {
  let component: StructureDetailsComponent;
  let fixture: ComponentFixture<StructureDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureDetailsComponent ],
      providers:[
        {provide: EthersService, useValue:{}},
        {provide: TileDataService, useValue: {}},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureDetailsComponent);
    component = fixture.componentInstance;
    component.structure = {'id' : 'build', 'sid' : 'blah', 'position': 2, 'level': 1}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
