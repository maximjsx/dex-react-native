export interface TokensList {
  name: string;
  timestamp: string;
  version: TokenVersion;
  keywords: string[];
  tokens: Token[];
  logoURI: string;
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
