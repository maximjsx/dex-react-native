import { create } from 'zustand';
import { Token } from '@/types/tokenTypes';
import { SwapType } from '@/types/swapTypes';

interface SwapState {
  sellToken: Token | null;
  buyToken: Token | null;
  sellAmount: string;
  isTokenListOpen: { sell: boolean; buy: boolean };
  setTokenByType: (type: SwapType, token: Token) => void;
  setDefaultTokens: (defaultPair: Token[]) => void;
  setSellAmount: (amount: string) => void;
  openTokenListByType: (type: SwapType, open: boolean) => void;
}

export const useSwapStore = create<SwapState>((set) => ({
  sellToken: null,
  buyToken: null,
  sellAmount: '1',
  isTokenListOpen: { sell: false, buy: false },
  setTokenByType: (type, token) =>
    set((state) => ({
      ...state,
      [type === 'buy' ? 'buyToken' : 'sellToken']: token,
    })),
  setDefaultTokens: (defaultPair) =>
    set((state) => ({
      ...state,
      sellToken: defaultPair[0],
      buyToken: defaultPair[1],
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
export const useSetSellAmount = () =>
  useSwapStore((state) => state.setSellAmount);
export const useOpenTokenListByType = () =>
  useSwapStore((state) => state.openTokenListByType);
export const useSetDefaultTokens = () =>
  useSwapStore((state) => state.setDefaultTokens);
