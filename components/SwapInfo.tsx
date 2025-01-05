import { Fragment } from 'react';
import TokenBox from './TokenBox';
import RevertButton from './RevertButton';
import { StyleSheet, Text, View } from 'react-native';
import useGetSwapPrice from '@/hooks/useGetSwapPrice';
import SwapButtonWrapper from './SwapButtonWrapper';

export default function SwapInfo() {
  const price = useGetSwapPrice();

  return (
    <Fragment>
      <View style={styles.box}>
        <TokenBox type='sell' price={price} />
        <RevertButton />
        <TokenBox type='buy' price={price} />
      </View>

      <View style={styles.info}>
        <Text>Gas: {price.data?.gas || ''}</Text>
        <Text>
          Liquidity status:{' '}
          {price.data?.liquidityAvailable ? 'Available' : 'Not Available'}
        </Text>
        <Text>Min buy amount: {price.data?.minBuyAmount || ''}</Text>
      </View>

      <SwapButtonWrapper allowance={price.data?.issues?.allowance?.actual} />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  box: {
    position: 'relative',
    gap: 10,
  },
  info: {
    marginTop: 12,
    marginBottom: 12,
  },
});
