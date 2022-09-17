/** @type import('hardhat/config').HardhatUserConfig */

require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: {
    version: '0.8.13',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 1337
    }
  }
}
