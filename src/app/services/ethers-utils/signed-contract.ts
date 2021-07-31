import { Inject, Injectable } from '@angular/core';
import { Contract } from 'ethers';
import { environment } from 'src/environments/environment';
import * as parcel from "../../../../build/contracts/Parcel.json";
import { Provider } from './web3-provider';

@Injectable({ providedIn: 'root' })
export class SignedParcelContract extends Contract {
  constructor(provider: Provider) {
    const abi = JSON.parse(JSON.stringify(parcel)).default.abi;
    super(environment.contract, abi, provider.getSigner());
  }
}