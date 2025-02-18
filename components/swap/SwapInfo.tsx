import { Fragment } from 'react';
import TokenBox from '../token/TokenBox';
import { StyleSheet } from 'react-native';
import FieldLoader from '../ui/FieldLoader';
import { useAccount, useBalance } from 'wagmi';
import { ThemedText } from '../theme/ThemedText';
import { ThemedView } from '../theme/ThemedView';
import { formatTokenValue } from '@/utils/swapUtils';
import useGetSwapPrice from '@/hooks/useGetSwapPrice';
import SwapDirectionIndicator from './SwapDirectionIndicator';

export default function SwapInfo() {
  const account = useAccount();
  const balance = useBalance({
    address: account.address,
  });
  const price = useGetSwapPrice({ account });

  const nativeCurrency = account.chain?.nativeCurrency;

  const totalNetworkFee =
    nativeCurrency && price.data?.totalNetworkFee
      ? formatTokenValue(
          BigInt(price.data.totalNetworkFee),
          nativeCurrency.decimals
        )
      : null;

  return (
    <Fragment>
      <ThemedView style={styles.box}>
        <TokenBox type='sell' price={price} />
        <SwapDirectionIndicator />
        <TokenBox type='buy' price={price} />
      </ThemedView>

      <ThemedView style={styles.info}>
        {price.isLoading ? (
          <FieldLoader width={200} height={20} />
        ) : (
          <ThemedText>
            Liquidity status:{' '}
            {price.data?.liquidityAvailable ? 'Available' : 'Not Available'}
          </ThemedText>
        )}

        {price.isLoading ? (
          <FieldLoader width={200} height={20} />
        ) : (
          <ThemedText>
            Wallet balance:{' '}
            {balance.data ? (
              <>
                {formatTokenValue(balance.data.value, balance.data.decimals)}{' '}
                {balance.data.symbol}
              </>
            ) : (
              'Not able to calculate'
            )}
          </ThemedText>
        )}

        {price.isLoading ? (
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
    </Fragment>
  );
}

const styles = StyleSheet.create({
  box: {
    position: 'relative',
    gap: 10,
  },
  info: {
    gap: 4,
    marginTop: 12,
    marginBottom: 12,
  },
});
