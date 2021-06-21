import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireFunctions } from '@angular/fire/functions';
import { CloudFunctionsService } from '../services/cloud-functions.service';
import { EthersService } from '../services/ethers.service';
import { MetadataService } from '../services/metadata.service';
import { ExplorerComponent } from './explorer.component';

describe('ExplorerComponent', () => {
  let component: ExplorerComponent;
  let fixture: ComponentFixture<ExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplorerComponent ],
      providers:[
        { provide: AngularFireFunctions, useValue: {
          useEmulator: jasmine.createSpy(),
          httpsCallable: jasmine.createSpy()
        }},
        { provide: EthersService, useValue: { 
          getBalanceOf: jasmine.createSpy('getBalanceOf'),
          getTokenOfOwnerByIndex: jasmine.createSpy('getTokenOfOwnerByIndex').and.returnValue({
            then: jasmine.createSpy() 
          }),                                             
          getTotalSupply: jasmine.createSpy('getTotalSupply').and.returnValue(Promise.resolve({}))
        }},
        { provide: MetadataService, useValue: {}},
        { provide: CloudFunctionsService, useValue: {
          buildStructure: jasmine.createSpy()
        }}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
