import { Injectable } from '@angular/core';
import { ethers } from "ethers";
import * as parcel from "../../../build/contracts/Parcel.json";

// import detectEthereumProvider from '@metamask/detect-provider'
 
@Injectable()
export class EthersService {

  private ethereum;
  private provider;
  private signer;
  private contract;
  
  constructor(private window: Window) { 
    this.ethereum = (window as any).ethereum;
    this.provider = new ethers.providers.Web3Provider(this.ethereum);
    this.signer = this.getSigner();
    this.contract = this.getContract();
  }

  isMetamaskInstalled() {
    if (typeof this.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    }  
  }

  async requestAccounts() {
    const accounts = await this.ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts[0]);
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
    const daiWithSigner = this.contract.connect(this.signer);
    return daiWithSigner;
  }

  discover(){
    const diaWithSigner = this.connectContract();
    diaWithSigner.discover('0xAee8ee2f7fc0B8d7d7E421d6BD9bDc31Fb99ceE4', 'uri');
  }
}
