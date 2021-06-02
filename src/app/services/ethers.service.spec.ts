import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { ethers } from 'ethers';
import { AuthService } from './auth.service';
import { ParcelContract } from './ethers-utils/contract';
import { Provider } from './ethers-utils/web3-provider';

import { EthersService } from './ethers.service';
import { HexagonService } from './hexagon.service';
import { MetadataService } from './metadata.service';

describe('EthersService', () => {
  let service: EthersService;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ethers', ['provider']);
    TestBed.configureTestingModule({
      providers:[
                  EthersService,
                  { provide: Window, useValue: { ethereum: {}}},
                  { provide: ParcelContract, useValue: {}},
                  { provide: Provider, useValue: {}},
                  { provide: MetadataService, useValue: {}},
                  { provide: HexagonService, useValue: {}},
                  { provide: AuthService, useValue: {}},
                ]
    });
    service = TestBed.inject(EthersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
