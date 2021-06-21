import { Inject, Injectable } from '@angular/core';
import { BigNumber, Contract, ethers } from "ethers";

import { environment } from '../../environments/environment';
import * as parcel from "../../../build/contracts/Parcel.json";

import {MetadataService} from '../services/metadata.service'
import { forkJoin } from 'rxjs';
import { Provider } from './ethers-utils/web3-provider';
import { ParcelContract } from './ethers-utils/contract';

@Injectable({
  providedIn: 'root'
})
export class EthersService {

  private ethereum;
  private provider: ethers.providers.Web3Provider;
  private unsignedContract: ethers.Contract;
  private signedContract: ethers.Contract;
  
  constructor(@Inject(Provider) provider: Provider,
              @Inject(ParcelContract) parcelContract: Contract,
              private metadataService: MetadataService,
              private window: Window)
  { 
    this.ethereum = (window as any).ethereum;
    this.provider = provider;
    this.unsignedContract = parcelContract;
    this.signedContract = parcelContract;
  }

  public ngOnInit() {}

  public ngOnDestory(){
    this.unsignedContract.removeAllListeners();
  }

  async requestAccount() {
    const accounts = await this.ethereum.request({ method: 'eth_requestAccounts' });
    return accounts[0];
  }

  getBalance() {
    return this.provider.getBalance("ethers.eth")
                        .then(balance => ethers.utils.formatEther(balance));
  }

  getSigner() {
    return this.provider.getSigner()
  }

  getContract() {
    const daiAddress = environment.contract;
    const daiAbi = JSON.parse(JSON.stringify(parcel)).default.abi;
    return new ethers.Contract(daiAddress, daiAbi, this.provider);
  }

  async discover(): Promise<any> {
    const account = this.requestAccount();
    const metadata = await this.metadataService.generateMetadata().toPromise();
    await this.signedContract.discover(account, metadata.uuid);
    return metadata.uuid;
  }

  async getBalanceOf(){
    const balance = await this.signedContract.balanceOf(await this.requestAccount());
    return balance.toNumber();
  }

  async getTokenIdByOwner(): Promise<number[]> {
    const account = await this.requestAccount();
    const balance: BigNumber = await this.signedContract.balanceOf(account);
    let tokensIds = [];
    for (let i= 0; i < balance.toNumber(); i++){
      let token = await this.signedContract.tokenOfOwnerByIndex(account, i);
      tokensIds.push(token.toNumber()-1);
    }               
    return tokensIds;
  }

  async getTokenMetadataIdsByOwner() {
    const account = await this.requestAccount();
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

  async getTotalSupplyParcelData(){
    const totalSupply = await this.getTotalSupply();

  }

  getMetadataURI(tokenId: number): Promise<string> {
    return this.unsignedContract.tokenURI(tokenId + 1)
  }

  getMetadataURIWithBigNumber(tokenId: BigNumber): Promise<string> {
    return this.unsignedContract.tokenURI(tokenId);
  }


}
