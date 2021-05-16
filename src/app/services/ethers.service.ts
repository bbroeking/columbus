import { Injectable } from '@angular/core';
import { BigNumber, ethers } from "ethers";

import {LOCAL_PARCEL_CONTRACT} from '../env';
import * as parcel from "../../../build/contracts/Parcel.json";

import {MetadataService} from '../services/metadata.service'
import { MetadataResponse } from '../models/metadata-response.model';
import { ParcelMetadata } from '../models/parcel-metadata.model';
import { HexagonService } from './hexagon.service';
import { Coordinate } from '../models/coordinate.model';

@Injectable()
export class EthersService {

  private ethereum: any;
  private provider: ethers.providers.Web3Provider;
  private signer: ethers.providers.JsonRpcSigner;
  private unsignedContract: ethers.Contract;
  
  constructor(private window: Window,
              private metadataService: MetadataService,
              private hexagonService: HexagonService)
  { 
    this.ethereum = (window as any).ethereum;
    this.provider = new ethers.providers.Web3Provider(this.ethereum);
    this.signer = this.getSigner();
    this.unsignedContract = this.getContract();
  }

  public ngOnInit(){
    this.unsignedContract.on("Transfer", (from, to, amount, event) => {
      console.log(`${ from } sent ${ ethers.utils.formatEther(amount) } to ${ to}`);
      console.log(event);
      // The event object contains the verbatim log data, the
      // EventFragment and functions to fetch the block,
      // transaction and receipt and event functions
    });
  }

  public ngOnDestory(){
    this.unsignedContract.removeAllListeners();
  }

  isMetamaskInstalled() {
    if (typeof this.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    }  
  }

  async requestAccount() {
    const accounts = await this.ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts);
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

  connectContract(){
    const signedContract = this.unsignedContract.connect(this.signer);
    return signedContract;
  }

  async discover(){
    const signedContract = this.connectContract();
    const account = this.requestAccount();

    const tokenId = await this.getTotalSupply();
    const coords: Coordinate = this.hexagonService.getCoordinatesFromId(tokenId);
    let neighbors: Map<string, Coordinate> = this.hexagonService.getNeighbors(coords);
    neighbors.set('location', coords);

    return this.metadataService.generateMetadata(neighbors)
                               .subscribe(resp => {
                                 return signedContract.discover(account, resp.uuid);
                               });
  }

  async getBalanceOf(){
    const signedContract = this.connectContract();
    const balance = await signedContract.balanceOf(this.requestAccount());
    return balance.toNumber();
  }

  async getTokenOfOwnerByIndex() {
    const account = this.requestAccount();
    const signedContract = this.connectContract();
    const balance: BigNumber = await signedContract.balanceOf(account);
    let tokens: ParcelMetadata[] = [];
    for (let i= 0; i < balance.toNumber(); i++){
      let token = await signedContract.tokenOfOwnerByIndex(account, i);
      const uri: string = await this.getMetadataURIWithBigNumber(token);
      let uriComponents = uri.split("/");
      const blob_id: string = uriComponents[uriComponents.length - 1];
      this.metadataService.getMetadata(blob_id)
                          .subscribe(res => tokens.push(res));
    }
    return tokens;
  }

  async getTotalSupply(): Promise<number> {
    const totalSupply: BigNumber = await this.unsignedContract.totalSupply(); 
    return totalSupply.toNumber();
  }

  getOwnedParcelData(){

  }

  async getTotalSupplyParcelData(){
    const totalSupply = await this.getTotalSupply();

  }

  async getMetadataURI(tokenId: number) {
    const uri = await this.unsignedContract.tokenURI(tokenId);
    console.log(uri);
    return uri;
  }
  async getMetadataURIWithBigNumber(tokenId: BigNumber){
    const uri = await this.unsignedContract.tokenURI(tokenId);
    return uri;
  }


}
