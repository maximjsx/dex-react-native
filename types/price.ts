export interface GetSwapPriceApiPayload {
  chainId: number;
  buyToken: string;
  sellToken: string;
  sellAmount: string;
}

export interface SwapPriceApiResponse {
  blockNumber: string;
  buyAmount: string;
  buyToken: string;
  fees: Fees;
  gas: string;
  gasPrice: string;
  issues: Issues;
  liquidityAvailable: boolean;
  minBuyAmount: string;
  route: Route;
  sellAmount: string;
  sellToken: string;
  tokenMetadata: TokenMetadata;
  totalNetworkFee: string;
  zid: string;
}

export interface Fees {
  integratorFee: any;
  zeroExFee: any;
  gasFee: any;
}

export interface Issues {
  allowance: Allowance;
  balance: Balance;
  simulationIncomplete: boolean;
  invalidSourcesPassed: any[];
}

export interface Allowance {
  actual: string;
  spender: string;
}

export interface Balance {
  token: string;
  actual: string;
  expected: string;
}

export interface Route {
  fills: Fill[];
  tokens: Token[];
}

export interface Fill {
  from: string;
  to: string;
  source: string;
  proportionBps: string;
}

export interface Token {
  address: string;
  symbol: string;
}

export interface TokenMetadata {
  buyToken: BuyToken;
  sellToken: SellToken;
}

export interface BuyToken {
  buyTaxBps: string;
  sellTaxBps: string;
}

export interface SellToken {
  buyTaxBps: string;
  sellTaxBps: string;
}
