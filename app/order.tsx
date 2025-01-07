import OrderButton from '@/components/OrderButton';
import OrderToken from '@/components/OrderToken';
import useGetSwapQuote from '@/hooks/useGetSwapQuote';
import { StyleSheet, Text, View } from 'react-native';

export default function OrderScreen() {
  const quote = useGetSwapQuote();

  const { buyAmount, sellAmount, liquidityAvailable, transaction } =
    quote.data || {};

  return (
    <View style={styles.container}>
      <View>
        <OrderToken
          type='sell'
          amount={sellAmount}
          isLoading={quote.isLoading}
        />
        <OrderToken type='buy' amount={buyAmount} isLoading={quote.isLoading} />
      </View>
      <View style={styles.info}>
        <Text>
          Liquidity status: {liquidityAvailable ? 'Available' : 'Not Available'}
        </Text>
        <Text>Gas price: {transaction?.gasPrice || '-'}</Text>
      </View>
      {transaction ? (
        <OrderButton transaction={transaction} />
      ) : (
        <Text>Getting quotes</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 16,
  },
  info: {
    marginTop: 12,
    marginBottom: 12,
  },
});
