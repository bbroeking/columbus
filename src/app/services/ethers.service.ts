import { Inject, Injectable } from '@angular/core';
import { BigNumber, Contract, ethers } from "ethers";
import {MetadataService} from '../services/metadata.service'
import { forkJoin } from 'rxjs';
import { Provider } from './ethers-utils/web3-provider';
import { ParcelContract } from './ethers-utils/contract';
import { BaseProvider, PROVIDER } from './ethers-utils/provider-injection-token';

export interface LandDiscovery {
  tokenId: number,
  uuid: string
}

@Injectable({
  providedIn: 'root'
})
export class EthersService {

  private ethereum;
  private unsignedContract: ethers.Contract;
  private signedContract: ethers.Contract;
  
  constructor(@Inject(ParcelContract) parcelContract: Contract,
              private metadataService: MetadataService) { 
    this.ethereum = (window as any).ethereum;
    this.unsignedContract = parcelContract;
    this.signedContract = parcelContract;
  }

  public ngOnDestory(){
    this.unsignedContract.removeAllListeners();
  }

  async requestAccount() {
    const accounts = await this.ethereum.request({ method: 'eth_accounts' });
    return accounts[0];
  }

  async redeem(account: string, tokenId: number, signature: string): Promise<LandDiscovery> {
    const rawTransaction = await this.signedContract.redeem(account, tokenId, signature);
    const confirmations = await rawTransaction.wait();
    return {tokenId: tokenId, uuid: tokenId.toString()};
  }

  async getBalanceOf(){
    const balance = await this.signedContract.balanceOf(await this.requestAccount());
    return balance.toNumber();
  }

  async getOwnerOf(id: number){
    try {
      const addr:string = await this.signedContract.ownerOf(id);
      return addr.toLowerCase();
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async getTokenIdByOwner(account: string): Promise<number[]> {
    const balance: BigNumber = await this.signedContract.balanceOf(account);
    let tokensIds = [];
    for (let i= 0; i < balance.toNumber(); i++){
      let token = await this.signedContract.tokenOfOwnerByIndex(account, i);
      tokensIds.push(token.toNumber());
    }               
    return tokensIds;
  }

  async getTokenMetadataIdsByOwner(account: string) {
    const balance: BigNumber = await this.signedContract.balanceOf(account);
    let tokens = [];
    for (let i= 0; i < balance.toNumber(); i++){
      let token = await this.signedContract.tokenOfOwnerByIndex(account, i);
      const uri: string = await this.getMetadataURIWithBigNumber(token);
      let uriComponents = uri.split("/");
      const blob_id: string = uriComponents[uriComponents.length - 1];
      tokens.push(blob_id);
    }               
    return tokens;
  }

  async getTokenMetadataByOwner(){
    const account = await this.requestAccount();
    const balance: BigNumber = await this.signedContract.balanceOf(account);
    let tokens = [];
    for (let i= 0; i < balance.toNumber(); i++){
      let token = await this.signedContract.tokenOfOwnerByIndex(account, i);
      const uri: string = await this.getMetadataURIWithBigNumber(token);
      let uriComponents = uri.split("/");
      const blob_id: string = uriComponents[uriComponents.length - 1];
      tokens.push(this.metadataService.getMetadata(blob_id));
    }               
    return forkJoin(...tokens)
  }

  async getTotalSupply(): Promise<number> {
    const totalSupply: BigNumber = await this.unsignedContract.totalSupply(); 
    return totalSupply.toNumber();
  }

  async getMetadataURI(tokenId: number): Promise<string> {
    return tokenId.toString();
    // try {
    //   const fullURI = await this.unsignedContract.tokenURI(tokenId)
    //   return this.cleanURI(fullURI);  
    // } catch(error) {
    //   console.error(error);
    //   return '';
    // }
  }

  cleanURI(fullURI: string): string {
    let uriComponents = fullURI.split("/");
    return uriComponents[uriComponents.length - 1];  
  }


  getMetadataURIWithBigNumber(tokenId: BigNumber): Promise<string> {
    return this.unsignedContract.tokenURI(tokenId);
  }
}
