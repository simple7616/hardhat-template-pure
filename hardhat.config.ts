import '@nomicfoundation/hardhat-toolbox';
import 'hardhat-abi-exporter';
import 'hardhat-contract-sizer';
import 'hardhat-deploy';
import { HardhatUserConfig } from 'hardhat/config';
import { HARDHAT_NETWORK_NAME } from 'hardhat/plugins';

import { ArbitrumNetwork, EthereumNetwork } from './helpers/constants';
import { getCommonNetworkConfig } from './helpers/hardhat-config-helpers';

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.24',
    settings: {
      metadata: {
        bytecodeHash: 'none',
      },
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: HARDHAT_NETWORK_NAME,
  networks: {
    hardhat: {},
    [EthereumNetwork.sepolia]: getCommonNetworkConfig(ArbitrumNetwork.one, 11155111),
    [EthereumNetwork.mainnet]: getCommonNetworkConfig(ArbitrumNetwork.one, 1),
    [ArbitrumNetwork.sepolia]: getCommonNetworkConfig(ArbitrumNetwork.one, 421614),
    [ArbitrumNetwork.one]: getCommonNetworkConfig(ArbitrumNetwork.one, 42161),
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    strict: true,
  },
  abiExporter: {
    path: './abi',
    runOnCompile: true,
    clear: true,
    flat: true,
  },
  typechain: {
    outDir: 'types',
    target: 'ethers-v6',
    externalArtifacts: ['externalArtifacts/*.json'],
  },
};

export default config;
