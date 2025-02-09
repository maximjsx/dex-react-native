import { useAccount } from 'wagmi';
import { StyleSheet } from 'react-native';
import OrderActions from '@/components/order/OrderActions';
import OrderToken from '@/components/order/OrderToken';
import { ThemedText } from '@/components/theme/ThemedText';
import { ThemedView } from '@/components/theme/ThemedView';
import useGetSwapQuote from '@/hooks/useGetSwapQuote';
import { formatTokenValue } from '@/utils/swapUtils';
import FieldLoader from '@/components/ui/FieldLoader';
import SwapDirectionIndicator from '@/components/swap/SwapDirectionIndicator';

export default function OrderScreen() {
  const quote = useGetSwapQuote();
  const account = useAccount();

  const { buyAmount, sellAmount, liquidityAvailable, transaction } =
    quote.data || {};

  const nativeCurrency = account.chain?.nativeCurrency;

  const totalNetworkFee =
    nativeCurrency && quote.data?.totalNetworkFee
      ? formatTokenValue(
          BigInt(quote.data.totalNetworkFee),
          nativeCurrency.decimals
        )
      : null;

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.box}>
        <OrderToken
          type='sell'
          amount={sellAmount}
          isLoading={quote.isLoading}
        />
        <SwapDirectionIndicator />
        <OrderToken type='buy' amount={buyAmount} isLoading={quote.isLoading} />
      </ThemedView>
      <ThemedView style={styles.info}>
        {quote.isLoading ? (
          <FieldLoader width={200} height={20} />
        ) : (
          <ThemedText>
            Liquidity status:{' '}
            {liquidityAvailable ? 'Available' : 'Not Available'}
          </ThemedText>
        )}

        {quote.isLoading ? (
          <FieldLoader width={200} height={20} />
        ) : (
          <ThemedText>
            Total network fee:{' '}
            {nativeCurrency && totalNetworkFee ? (
              <>
                {totalNetworkFee} {nativeCurrency.symbol}
              </>
            ) : (
              'Not able to calculate'
            )}
          </ThemedText>
        )}
      </ThemedView>

      {transaction ? (
        <OrderActions transaction={transaction} />
      ) : (
        <ThemedText>Getting quotes</ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 16,
  },
  box: {
    gap: 10,
  },
  info: {
    marginTop: 12,
    marginBottom: 12,
    gap: 4,
  },
});
