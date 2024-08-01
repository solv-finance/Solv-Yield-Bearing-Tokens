const colors = require('colors');

module.exports = async ({ getNamedAccounts, deployments, network }) => {
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const version = '_v2.0';
  
  const deterministicSuffix = {
    dev_sepolia: '_dev' + version,
    sepolia: '_tnt' + version,
    merlin_test: '_tnt' + version,
    blast_test: '_tnt' + version,
    ailayer_test: '_tnt' + version,
    bob_test: '_tnt' + version,

    mainnet: version,
    arb: version,
    bsc: version,
    merlin: version,
    mantle: version,
    ailayer: version,
    bob: version,
    avax: version,
  }

  const admin = deployer;
  const governor = deployer;

  const instance = await deploy('SolvBTCYieldTokenFactory', {
    contract: 'SolvBTCFactory',
    from: deployer,
    log: true,
    args: [ admin, governor ],
    deterministicDeployment: ethers.utils.keccak256(ethers.utils.toUtf8Bytes('SolvBTCYieldTokenFactory' + deterministicSuffix[network.name]))
  });
  console.log(`* INFO: ${colors.yellow(`SolvBTCYieldTokenFactory`)} deployed at ${colors.green(instance.address)} on ${colors.red(network.name)}`);
  
};

module.exports.tags = ['SolvBTCYTFactory']