import React from 'react';
import AmountInput from './AmountInput';
import TokenSelect from './TokenSelect';
import { SwapType } from '@/types/swapTypes';
import TokenListModal from './TokenListModal';
import { StyleSheet, View } from 'react-native';

type Props = {
  type: SwapType;
};

export default function TokenBox({ type }: Props) {
  return (
    <React.Fragment>
      <View style={styles.container}>
        <TokenSelect type={type} />
        <AmountInput />
      </View>
      <TokenListModal type={type} />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#f4f4f5',
  },
});
