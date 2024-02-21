import { ArbitrumNetwork, EthereumNetwork, Network } from './constants';
import { ParamsPerNetwork } from './types';

require('dotenv').config();

export const DEFAULT_BLOCK_GAS_LIMIT = 32000000;
export const ALCHEMY_KEY = process.env.ALCHEMY_KEY || '';
const MNEMONIC_PATH = "m/44'/60'/0'/0";
const MNEMONIC = process.env.MNEMONIC || '';

export const getAlchemyKey = (network: Network) => {
  switch (network) {
    case EthereumNetwork.sepolia:
      return process.env.ETHEREUM_SEPOLIA_ALCHEMY_KEY || ALCHEMY_KEY;
    case EthereumNetwork.mainnet:
      return process.env.ETHEREUM_MAINNET_ALCHEMY_KEY || ALCHEMY_KEY;
    case ArbitrumNetwork.sepolia:
      return process.env.ARBITRUM_SEPOLIA_ALCHEMY_KEY || ALCHEMY_KEY;
    case ArbitrumNetwork.one:
      return process.env.ARBITRUM_ONE_ALCHEMY_KEY || ALCHEMY_KEY;
    default:
      return ALCHEMY_KEY;
  }
};

export const NETWORKS_RPC_URL: ParamsPerNetwork<string> = {
  [EthereumNetwork.sepolia]: ``,
  [EthereumNetwork.mainnet]: ``,
  [ArbitrumNetwork.sepolia]: `https://arb-sepolia.g.alchemy.com/v2/${getAlchemyKey(ArbitrumNetwork.sepolia)}`,
  [ArbitrumNetwork.one]: ``,
};

export const LIVE_NETWORKS: ParamsPerNetwork<boolean> = {
  [EthereumNetwork.mainnet]: true,
  [ArbitrumNetwork.one]: true,
};

const GAS_PRICE_PER_NET: ParamsPerNetwork<number | 'auto'> = {
  [ArbitrumNetwork.sepolia]: 100000001,
  [ArbitrumNetwork.one]: 'auto',
};

export const getCommonNetworkConfig = (networkName: Network, chainId?: number) => ({
  url: NETWORKS_RPC_URL[networkName] || '',
  blockGasLimit: DEFAULT_BLOCK_GAS_LIMIT,
  chainId,
  gasPrice: GAS_PRICE_PER_NET[networkName] || undefined,
  ...((!!MNEMONICS[networkName] || !!MNEMONIC) && {
    accounts: {
      mnemonic: MNEMONICS[networkName] || MNEMONIC,
      path: MNEMONIC_PATH,
      initialIndex: 0,
      count: 10,
    },
  }),
  live: LIVE_NETWORKS[networkName] || false,
  zksync: false,
});

const MNEMONICS: ParamsPerNetwork<string> = {
  [EthereumNetwork.sepolia]: process.env.ETHEREUM_SEPOLIA_MNEMONIC,
  [EthereumNetwork.mainnet]: process.env.ETHEREUM_MAINNET_MNEMONIC,
  [ArbitrumNetwork.sepolia]: process.env.ARBITRUM_SEPOLIA_MNEMONIC,
  [ArbitrumNetwork.one]: process.env.ARBITRUM_MAINNET_MNEMONIC,
};
