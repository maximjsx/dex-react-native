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
  openTokenList: (open: boolean) => void;
  setDefaultTokens: () => void;
  setSellAmount: (amount: string) => void;
}

export const useSwapStore = create<SwapState>((set) => ({
  sellToken: null,
  buyToken: null,
  isTokenListOpen: false,
  sellAmount: '0.1',
  setTokenByType: (type, token) =>
    set((state) => ({
      ...state,
      [type === 'buy' ? 'buyToken' : 'sellToken']: token,
    })),
  openTokenList: (open) =>
    set((state) => ({ ...state, isTokenListOpen: open })),
  setDefaultTokens: () =>
    set((state) => ({
      ...state,
      sellToken: defaultSelectedTokensData.tokens[0],
      buyToken: defaultSelectedTokensData.tokens[1],
    })),
  setSellAmount: (sellAmount) => set((state) => ({ ...state, sellAmount })),
}));

// Selectors
export const useTokenByType = (type: SwapType) =>
  useSwapStore((state) => (type === 'buy' ? state.buyToken : state.sellToken));
export const useSellToken = () => useSwapStore((state) => state.sellToken);
export const useBuyToken = () => useSwapStore((state) => state.buyToken);
export const useIsTokenListOpen = () =>
  useSwapStore((state) => state.isTokenListOpen);
export const useSellAmount = () => useSwapStore((state) => state.sellAmount);

// Actions
export const useSetTokenByType = () =>
  useSwapStore((state) => state.setTokenByType);
export const useOpenTokenList = () =>
  useSwapStore((state) => state.openTokenList);
export const useSetDefaultTokens = () =>
  useSwapStore((state) => state.setDefaultTokens);
export const useSetSellAmount = () =>
  useSwapStore((state) => state.setSellAmount);
