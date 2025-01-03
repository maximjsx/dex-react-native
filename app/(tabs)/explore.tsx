import {
  useBuyToken,
  useSellAmount,
  useSellToken,
  useSwapStore,
} from '@/store/swapStore';
import { useAccount } from 'wagmi';
import { getSwapPrice } from '@/apis/swap';
import TokenBox from '@/components/TokenBox';
import { StyleSheet, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { SwapPriceApiResponse } from '@/types/priceTypes';
import SwapButton from '@/components/SwapButton';

export default function SwapScreen() {
  const buyToken = useBuyToken();
  const sellToken = useSellToken();
  const sellAmmount = useSellAmount();

  const account = useAccount();

  // Find a good default pair that works
  const priceQueryParams = {
    chainId: account.chainId || 1,
    buyToken: buyToken?.address || '',
    sellToken: sellToken?.address || '',
    sellAmount: sellAmmount,
  };

  // Working example
  const params = {
    chainId: 1,
    buyToken: '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDT
    sellToken: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC
    sellAmount: '1000000',
  };

  // const swapPriceApiResponse = useQuery<SwapPriceApiResponse, Error>({
  //   queryKey: ['swapPrice', params],
  //   queryFn: () => getSwapPrice(params),
  // });

  // console.log(
  //   'PRICE API status:' + swapPriceApiResponse.status,
  //   swapPriceApiResponse.data
  // );

  return (
    <View style={styles.container}>
      <TokenBox type='sell' />
      <SwapButton />
      <TokenBox type='buy' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 10,
    padding: 16,
  },
});
