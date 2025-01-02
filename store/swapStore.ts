import { create } from 'zustand';
import { Token } from '@/types/tokenTypes';
import { SwapType } from '@/types/swapTypes';
import defaultSelectedTokensData from '../data/defautTokensData.json';

interface SwapState {
  sellToken: Token | null;
  buyToken: Token | null;
  isTokenListOpen: boolean;
  sellAmount: string;
  setTokenByType: (type: SwapType, token: Token) => void;
  getTokenByType: (type: SwapType) => Token | null;
  openTokenList: (open: boolean) => void;
  setDefaultTokens: () => void;
  setSellAmount: (amount: string) => void;
  getSellAmount: () => string;
}

export const useSwapStore = create<SwapState>((set, get) => ({
  sellToken: null,
  buyToken: null,
  isTokenListOpen: false,
  sellAmount: '0.1',
  setTokenByType: (type, token) =>
    set({
      [type === 'buy' ? 'buyToken' : 'sellToken']: token,
    }),
  getTokenByType: (type) => (type === 'buy' ? get().buyToken : get().sellToken),
  openTokenList: (open) => set({ isTokenListOpen: open }),
  setDefaultTokens: () =>
    set({
      sellToken: defaultSelectedTokensData.tokens[0],
      buyToken: defaultSelectedTokensData.tokens[1],
    }),
  setSellAmount: (sellAmount) => set({ sellAmount }),
  getSellAmount: () => get().sellAmount,
}));
