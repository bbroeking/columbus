const Parcel = artifacts.require("Parcel");

module.exports = function (deployer, network, account) {
  deployer.deploy(Parcel);
};
