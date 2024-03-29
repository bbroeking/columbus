import { Inject, Injectable } from '@angular/core';
import { Contract } from 'ethers';
import { environment } from 'src/environments/environment';
import * as parcel from "../../../../build/contracts/Parcel.json";
import { PROVIDER } from './provider-injection-token';

@Injectable({ providedIn: 'root' })
export class ParcelContract extends Contract {
  constructor(@Inject(PROVIDER) provider: any) {
    const abi = JSON.parse(JSON.stringify(parcel)).default.abi;
    super(environment.contract, abi, provider);
  }
}