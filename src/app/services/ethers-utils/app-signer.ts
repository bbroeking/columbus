import { Inject, Injectable } from '@angular/core';
import { Signer, utils, providers, Wallet } from 'ethers';
// import { PROVIDER } from './provider-injection-token';
import { Provider } from './web3-provider';

@Injectable({ providedIn: 'root' })
export class AppSigner extends Signer {

  constructor(@Inject(Provider) public provider: providers.BaseProvider) {
    super();
  }

  getAddress(): Promise<string> {
    throw new Error('Method not implemented.');
  }
  signMessage(message: string | utils.Bytes): Promise<string> {
    throw new Error('Method not implemented.');
  }
  signTransaction(transaction: utils.Deferrable<providers.TransactionRequest>): Promise<string> {
    throw new Error('Method not implemented.');
  }
  connect(provider: providers.Provider): Signer {
    throw new Error('Method not implemented.');
  }
    
}