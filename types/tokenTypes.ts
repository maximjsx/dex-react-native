export interface TokensList {
  defaultPair: Token[];
  tokens: Token[];
}

export interface TokenVersion {
  major: number;
  minor: number;
  patch: number;
}

export interface Token {
  address: string;
  chainId: number;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
}
