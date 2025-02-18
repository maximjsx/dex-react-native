import { getSwapPrice } from '@/apis/swapApis';
import { useQuery } from '@tanstack/react-query';
import { Config, UseAccountReturnType } from 'wagmi';
import { formatToBaseUnits } from '@/utils/swapUtils';
import { useBuyToken, useSellToken, useSellAmount } from '@/store/swapStore';

type Args = {
  account: UseAccountReturnType<Config>;
};

export default function useGetSwapPrice({ account }: Args) {
  const buyToken = useBuyToken();
  const sellToken = useSellToken();
  const sellAmount = useSellAmount();

  const chainId = account.chainId;
  const buyTokenAddress = buyToken?.address;
  const sellTokenAddress = sellToken?.address;
  const sellTokenDecimals = sellToken?.decimals;

  const formattedSellAmount =
    sellAmount !== undefined && sellTokenDecimals !== undefined
      ? formatToBaseUnits(sellAmount, sellTokenDecimals).toString()
      : undefined;

  const isEnabled =
    chainId !== undefined &&
    buyTokenAddress !== undefined &&
    sellTokenAddress !== undefined &&
    formattedSellAmount !== undefined;

  const priceQueryParams = isEnabled
    ? {
        chainId,
        buyToken: buyTokenAddress,
        sellToken: sellTokenAddress,
        sellAmount: formattedSellAmount,
      }
    : undefined;

  return useQuery({
    queryKey: ['swapPrice', priceQueryParams],
    queryFn: () =>
      priceQueryParams ? getSwapPrice(priceQueryParams) : undefined,
    enabled: isEnabled,
  });
}
