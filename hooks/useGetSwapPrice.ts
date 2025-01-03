import { useAccount } from 'wagmi';
import { getSwapPrice } from '@/apis/swap';
import { useQuery } from '@tanstack/react-query';
import { useBuyToken, useSellToken, useSellAmount } from '@/store/swapStore';

export default function useGetSwapPrice() {
  const account = useAccount();
  const buyToken = useBuyToken();
  const sellToken = useSellToken();
  const sellAmmount = useSellAmount();

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
}
