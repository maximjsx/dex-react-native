import { create } from 'zustand';
import { Token } from '@/types/tokenTypes';
import { SwapType } from '@/types/swapTypes';
import defaultSelectedTokensData from '../data/defautTokensData.json';

interface SwapState {
  sellToken: Token | null;
  buyToken: Token | null;
  sellAmount: string;
  isTokenListOpen: { sell: boolean; buy: boolean };
  setTokenByType: (type: SwapType, token: Token) => void;
  setDefaultTokens: () => void;
  setSellAmount: (amount: string) => void;
  openTokenListByType: (type: SwapType, open: boolean) => void;
}

export const useSwapStore = create<SwapState>((set) => ({
  sellToken: null,
  buyToken: null,
  sellAmount: '0.1',
  isTokenListOpen: { sell: false, buy: false },
  setTokenByType: (type, token) =>
    set((state) => ({
      ...state,
      [type === 'buy' ? 'buyToken' : 'sellToken']: token,
    })),
  setDefaultTokens: () =>
    set((state) => ({
      ...state,
      sellToken: defaultSelectedTokensData.tokens[0],
      buyToken: defaultSelectedTokensData.tokens[1],
    })),
  setSellAmount: (sellAmount) => set((state) => ({ ...state, sellAmount })),
  openTokenListByType: (type, open) =>
    set((state) => ({
      isTokenListOpen: {
        ...state.isTokenListOpen,
        [type]: open,
      },
    })),
}));

useSwapStore.getState().setDefaultTokens(); // Set initial default selected tokens

// Selectors
export const useTokenByType = (type: SwapType) =>
  useSwapStore((state) => (type === 'buy' ? state.buyToken : state.sellToken));
export const useSellToken = () => useSwapStore((state) => state.sellToken);
export const useBuyToken = () => useSwapStore((state) => state.buyToken);
export const isTokenListOpen = (type: SwapType) =>
  useSwapStore((state) =>
    type === 'buy' ? state.isTokenListOpen.buy : state.isTokenListOpen.sell
  );
export const useSellAmount = () => useSwapStore((state) => state.sellAmount);

// Actions
export const useSetTokenByType = () =>
  useSwapStore((state) => state.setTokenByType);
export const useSetDefaultTokens = () =>
  useSwapStore((state) => state.setDefaultTokens);
export const useSetSellAmount = () =>
  useSwapStore((state) => state.setSellAmount);
export const useOpenTokenListByType = () =>
  useSwapStore((state) => state.openTokenListByType);
