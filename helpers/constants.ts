export enum EthereumNetwork {
  mainnet = 'ethereum-mainnet',
  sepolia = 'ethereum-sepolia',
}

export enum ArbitrumNetwork {
  one = 'arbitrum-one',
  sepolia = 'arbitrum-sepolia',
}

export type Network = EthereumNetwork | ArbitrumNetwork;
