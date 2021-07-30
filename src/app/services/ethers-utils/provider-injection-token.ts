import { Inject, Injectable, InjectionToken } from '@angular/core';
import { getDefaultProvider, providers } from 'ethers';
import { environment } from 'src/environments/environment';

export const PROVIDER = new InjectionToken<providers.BaseProvider>('Ethereum Provider', {
  providedIn: 'root',
  factory: () => getDefaultProvider(environment.network, {
    alchemy: environment.alchemy
  })
});

@Injectable({ providedIn: 'root' })
export class BaseProvider extends providers.BaseProvider {

  constructor(@Inject(PROVIDER) web3Provider: any) {
    super(web3Provider);
  }
}