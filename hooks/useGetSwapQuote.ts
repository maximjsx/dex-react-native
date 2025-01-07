import { useAccount } from 'wagmi';
import { getSwapQuote } from '@/apis/swapApis';
import { useQuery } from '@tanstack/react-query';
import { formatToBaseUnits } from '@/utils/swapUtils';
import { useBuyToken, useSellToken, useSellAmount } from '@/store/swapStore';

export default function useGetSwapQuote() {
  const account = useAccount();
  const buyToken = useBuyToken();
  const sellToken = useSellToken();
  const sellAmount = useSellAmount();

  const chainId = account.chainId;
  const buyTokenAddress = buyToken?.address;
  const sellTokenAddress = sellToken?.address;
  const sellTokenDecimals = sellToken?.decimals;
  const takerAddress = account.address;

  const formattedSellAmount =
    sellAmount !== undefined && sellTokenDecimals !== undefined
      ? formatToBaseUnits(sellAmount, sellTokenDecimals).toString()
      : undefined;

  const isEnabled =
    chainId !== undefined &&
    buyTokenAddress !== undefined &&
    sellTokenAddress !== undefined &&
    formattedSellAmount !== undefined &&
    takerAddress !== undefined;

  const quoteQueryParams = isEnabled
    ? {
        chainId,
        buyToken: buyTokenAddress,
        sellToken: sellTokenAddress,
        sellAmount: formattedSellAmount,
        taker: takerAddress,
      }
    : undefined;

  return useQuery({
    queryKey: ['swapQuote', quoteQueryParams],
    queryFn: () =>
      quoteQueryParams ? getSwapQuote(quoteQueryParams) : undefined,
    enabled: isEnabled,
  });
}
