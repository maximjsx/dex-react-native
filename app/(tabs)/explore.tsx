import { StyleSheet, View } from 'react-native';
import SelectedToken from '@/components/SelectedToken';
import { useQuery } from '@tanstack/react-query';
import { getSwapPrice } from '@/apis/swap';
import { SwapPriceApiResponse } from '@/types/price';

export default function TabTwoScreen() {
  // const params = {
  //   chainId: 1,
  //   buyToken: '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDT
  //   sellToken: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC
  //   sellAmount: '1000000',
  // };

  // const swapPriceApiResponse = useQuery<SwapPriceApiResponse, Error>({
  //   queryKey: ['swapPrice', params], // Use queryKey with params for caching
  //   queryFn: () => getSwapPrice(params), // Pass params directly to the function
  // });

  // console.log('PRICE', swapPriceApiResponse.data);

  return (
    <View style={styles.container}>
      <SelectedToken type='buy' defaultToken='matic' />
      <SelectedToken type='sell' defaultToken='usdt' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 10,
    padding: 16,
  },
});
