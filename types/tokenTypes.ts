export type Token = {
  address: string;
  chainId: number;
  decimals: number;
  eip2612: boolean;
  isFoT: boolean;
  logoURI: string | null;
  name: string;
  providers: string[];
  symbol: string;
  tags: string[];
};

export type TokenObject = {
  [address: string]: Token;
};

export interface Tokens {
  defaultPair: TokenObject[];
  list: TokenObject[];
}

export interface TokensList {
  list: TokenObject[];
}
