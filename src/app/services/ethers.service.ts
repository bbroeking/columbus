import { Inject, Injectable } from '@angular/core';
import { BigNumber, Contract, ethers } from "ethers";

import {LOCAL_PARCEL_CONTRACT} from '../env';
import * as parcel from "../../../build/contracts/Parcel.json";

import {MetadataService} from '../services/metadata.service'
import { HexagonService } from './hexagon.service';
import { Coordinate } from '../models/coordinate.model';
import { forkJoin } from 'rxjs';
import { Provider } from './ethers-utils/web3-provider';
import { ParcelContract } from './ethers-utils/contract';

@Injectable()
export class EthersService {

  private ethereum;
  private provider: ethers.providers.Web3Provider;
  private unsignedContract: ethers.Contract;
  private signedContract: ethers.Contract;
  
  constructor(@Inject(Provider) provider: Provider,
              @Inject(ParcelContract) parcelContract: Contract,
              private metadataService: MetadataService,
              private hexagonService: HexagonService,
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
    const daiAddress = LOCAL_PARCEL_CONTRACT;
    const daiAbi = JSON.parse(JSON.stringify(parcel)).default.abi;
    return new ethers.Contract(daiAddress, daiAbi, this.provider);
  }

  // connectContract(){
  //   const signedContract = this.unsignedContract.connect(this.signer);
  //   return signedContract;
  // }

  async discover(){
    const account = this.requestAccount();

    const tokenId = await this.getTotalSupply();
    const coords: Coordinate = this.hexagonService.getCoordinatesFromId(tokenId);
    let neighbors: Map<string, Coordinate> = this.hexagonService.getNeighbors(coords);
    neighbors.set('location', coords);

    return this.metadataService.generateMetadata(neighbors)
                               .subscribe(resp => {
                                 return this.signedContract.discover(account, resp.uuid);
                               });
  }

  async getBalanceOf(){
    const balance = await this.signedContract.balanceOf(this.requestAccount());
    return balance.toNumber();
  }

  async getTokenOfOwnerByIndex(){
    const account = this.requestAccount();
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
    return this.unsignedContract.tokenURI(tokenId)
  }

  getMetadataURIWithBigNumber(tokenId: BigNumber): Promise<string> {
    return this.unsignedContract.tokenURI(tokenId);
  }


}
