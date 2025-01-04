import { useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { useBuyToken, useSellToken, useSellAmount } from '@/store/swapStore';
import { formatToBaseUnits } from '@/utils/priceUtils';
import { getSwapPrice } from '@/apis/swapApis';

export default function useGetSwapPrice() {
  const account = useAccount();
  const buyToken = useBuyToken();
  const sellToken = useSellToken();
  const sellAmmount = useSellAmount();

  const priceQueryParams = {
    chainId: account.chainId as number,
    buyToken: buyToken?.address as string,
    sellToken: sellToken?.address as string,
    sellAmount: formatToBaseUnits(
      sellAmmount,
      sellToken?.decimals || 0
    ).toString(),
  };

  return useQuery({
    queryKey: ['swapPrice', priceQueryParams],
    queryFn: () => getSwapPrice(priceQueryParams),
    enabled:
      !!priceQueryParams.chainId &&
      !!priceQueryParams.buyToken &&
      !!priceQueryParams.sellAmount,
  });
}
