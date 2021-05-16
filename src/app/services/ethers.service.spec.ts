import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { EthersService } from './ethers.service';

describe('EthersService', () => {
  let service: EthersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
                  EthersService,
                  { provide: Window, useValue: { ethereum: {} }},
                  HttpClient,
                  HttpHandler
                ]
    });
    service = TestBed.inject(EthersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
