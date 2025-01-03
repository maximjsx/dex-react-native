import {
  useBuyToken,
  useSellToken,
  useSellAmount,
  useSetDefaultTokens,
} from '@/store/swapStore';
import { useAccount } from 'wagmi';
import { useEffect, useMemo } from 'react';
import { getSwapPrice } from '@/apis/swap';
import { useQuery } from '@tanstack/react-query';
import polygonTokenListData from '../data/polygonTokensListData.json';
import ethereumTokenListData from '../data/ethereumTokensListData.json';

export default function useInitSwap() {
  const account = useAccount();
  const buyToken = useBuyToken();
  const sellToken = useSellToken();
  const sellAmmount = useSellAmount();
  const setDefaultTokens = useSetDefaultTokens();

  const tokensList = useMemo(() => {
    if (account.chainId === 1) {
      return ethereumTokenListData;
    }
    if (account.chainId === 137) {
      return polygonTokenListData;
    }
  }, [account.chainId]);

  useEffect(() => {
    if (tokensList) {
      setDefaultTokens(tokensList.defaultPair);
    }
  }, [tokensList]);

  const priceQueryParams = {
    chainId: account.chainId as number,
    buyToken: buyToken?.address as string,
    sellToken: sellToken?.address as string,
    sellAmount: sellAmmount,
  };

  const swapPriceApiResponse = useQuery({
    queryKey: ['swapPrice', priceQueryParams],
    queryFn: () => getSwapPrice(priceQueryParams),
    enabled:
      !!priceQueryParams.chainId &&
      !!priceQueryParams.buyToken &&
      !!priceQueryParams.sellAmount,
  });

  console.log(
    'PRICE API status:' + swapPriceApiResponse.status,
    swapPriceApiResponse.data
  );

  return { tokensList };
}
