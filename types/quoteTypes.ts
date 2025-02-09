import { Address } from './swapTypes';

export type SwapQuoteApiPayload = {
  chainId: number;
  buyToken: string;
  sellToken: string;
  sellAmount: string;
  taker: string;
};

export interface SwapQuoteApiResponse {
  blockNumber: string;
  buyAmount: string;
  buyToken: string;
  fees: Fees;
  issues: Issues;
  liquidityAvailable: boolean;
  minBuyAmount: string;
  permit2: Permit2;
  route: Route;
  sellAmount: string;
  sellToken: string;
  tokenMetadata: TokenMetadata;
  totalNetworkFee: string;
  transaction: Transaction;
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

export interface Permit2 {
  type: string;
  hash: string;
  eip712: Eip712;
}

export interface Eip712 {
  types: Types;
  domain: Domain;
  message: Message;
  primaryType: string;
}

export interface Types {
  PermitTransferFrom: PermitTransferFrom[];
  TokenPermissions: TokenPermission[];
  EIP712Domain: Eip712Domain[];
}

export interface PermitTransferFrom {
  name: string;
  type: string;
}

export interface TokenPermission {
  name: string;
  type: string;
}

export interface Eip712Domain {
  name: string;
  type: string;
}

export interface Domain {
  name: string;
  chainId: number;
  verifyingContract: string;
}

export interface Message {
  permitted: Permitted;
  spender: string;
  nonce: string;
  deadline: string;
}

export interface Permitted {
  token: string;
  amount: string;
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

export interface Transaction {
  to: Address;
  data: Address;
  gas: string;
  gasPrice: string;
  value: string;
}
