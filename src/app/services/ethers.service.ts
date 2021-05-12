import { Injectable } from '@angular/core';
import { BigNumber, ethers } from "ethers";
import * as parcel from "../../../build/contracts/Parcel.json";

// import detectEthereumProvider from '@metamask/detect-provider'
 
@Injectable()
export class EthersService {

  private ethereum: any;
  private provider: ethers.providers.Web3Provider;
  private signer: ethers.providers.JsonRpcSigner;
  private unsignedContract: ethers.Contract;
  
  constructor(private window: Window) { 
    this.ethereum = (window as any).ethereum;
    this.provider = new ethers.providers.Web3Provider(this.ethereum);
    this.signer = this.getSigner();
    this.unsignedContract = this.getContract();
  }

  isMetamaskInstalled() {
    if (typeof this.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    }  
  }

  async requestAccount() {
    const accounts = await this.ethereum.request({ method: 'eth_requestAccounts' });
    return accounts[0];
  }

  async getBalance() {
    const balance = await this.provider.getBalance("ethers.eth");
    console.log(ethers.utils.formatEther(balance));
    return ethers.utils.formatEther(balance);
  }

  getSigner() {
    return this.provider.getSigner()
  }

  getContract() {
    const daiAddress = '0x584686B6993E1E04888274578554d7C983683b11';
    const daiAbi = JSON.parse(JSON.stringify(parcel)).default.abi;
    return new ethers.Contract(daiAddress, daiAbi, this.provider);
  }

  connectContract(){
    const daiWithSigner = this.unsignedContract.connect(this.signer);
    return daiWithSigner;
  }

  discover(){
    const diaWithSigner = this.connectContract();
    const account = this.requestAccount();
    diaWithSigner.discover(account, 'uri');
  }

  async getBalanceOf(){
    const diaWithSigner = this.connectContract();
    const balance = await diaWithSigner.balanceOf(this.requestAccount());
    console.log(balance);
    return balance.toNumber();
  }

  async getTokenOfOwnerByIndex() {
    const account = this.requestAccount();
    const diaWithSigner = this.connectContract();
    const balance: BigNumber = await diaWithSigner.balanceOf(account);
    let tokens = [];
    for (let i= 0; i < balance.toNumber(); i++){
      let token = await diaWithSigner.tokenOfOwnerByIndex(account, i);
      tokens.push(token);
    }
    console.log(tokens);
    return tokens;
  }

  async getTotalSupply() {
    const signedContract = this.connectContract();
    const totalSupply: BigNumber = await signedContract.totalSupply(); // do we need the signed contract?
    let tokens = [];
    for(let i=0; i < totalSupply.toNumber(); i++){
      let token = await signedContract.tokenByIndex(i);
      tokens.push(token);
    }
    return tokens;
  }

  async getMetadataURI(tokenId: number) {
    const uri = await this.unsignedContract.tokenURI(tokenId);
    console.log(uri);
    return uri;
  }
}
