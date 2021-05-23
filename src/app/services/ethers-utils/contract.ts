import { Injectable } from '@angular/core';
import { Contract } from 'ethers';
import { Provider } from './web3-provider';
import { environment } from 'src/environments/environment';
import * as parcel from "../../../../build/contracts/Parcel.json";

@Injectable({ providedIn: 'root' })
export class ParcelContract extends Contract {
  constructor(provider: Provider) {
    const abi = JSON.parse(JSON.stringify(parcel)).default.abi;
    super(environment.contract, abi, provider.getSigner());
  }
}