const Parcel = artifacts.require("Parcel");
const { ethers } = require("hardhat");

async function attach(name, address) {
  const contractFactory = await ethers.getContractFactory(name);
  return contractFactory.attach(address);
}

module.exports = async function (deployer) {
  // deployer.deploy(Parcel);
  console.log(ethers);
  const [admin, minter, relayer] = await ethers.getSigners();
  console.log(`Deploying contracts:`);
  // console.log(`- admin:   ${admin.address} (${ethers.utils.formatEther(await admin.getBalance())} ${ethers.constants.EtherSymbol})`);
  // console.log(`- minter:  ${minter.address} (${ethers.utils.formatEther(await minter.getBalance())} ${ethers.constants.EtherSymbol})`);
  // console.log(`- relayer: ${relayer.address} (${ethers.utils.formatEther(await relayer.getBalance())} ${ethers.constants.EtherSymbol})`);

  const registry = (await deploy('ERC721LazyMintWith712', 'Name', 'Symbol')).connect(admin);
  await registry.grantRole(await registry.MINTER_ROLE(), minter.address);

  console.log({ registry: registry.address });

  console.log(`Sign authorization:`);
  // console.log(`- admin:   ${admin.address} (${ethers.utils.formatEther(await admin.getBalance())} ${ethers.constants.EtherSymbol})`);
  // console.log(`- minter:  ${minter.address} (${ethers.utils.formatEther(await minter.getBalance())} ${ethers.constants.EtherSymbol})`);
  // console.log(`- relayer: ${relayer.address} (${ethers.utils.formatEther(await relayer.getBalance())} ${ethers.constants.EtherSymbol})`);

  const addr = process.env.ADDRESS ||'0eeebb0a6b0f1214892444a6a8b641fcdc16e8c8d07b9c8709f1989bad9778d6'
  // const registry    = (await attach('ERC721LazyMintWith712', addr)).connect(minter);
  const { chainId } = await ethers.provider.getNetwork();
  const tokenId     = process.env.TOKENID || 1;
  const account     = process.env.ACCOUNT || '0xA9C2CFbc976eE945EA97b56E3F73A3acE93503b7';
  const signature   = await minter._signTypedData(
    // Domain
    {
      name: 'Name',
      version: '1.0.0',
      chainId,
      verifyingContract: registry.address,
    },
    // Types
    {
      NFT: [
        { name: 'tokenId', type: 'uint256' },
        { name: 'account', type: 'address' },
      ],
    },
    // Value
    { tokenId, account },
  );

  console.log({ registry: registry.address, tokenId, account, signature });
};
