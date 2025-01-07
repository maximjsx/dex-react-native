import TokenSelect from './TokenSelect';
import { SwapType } from '@/types/swapTypes';
import { StyleSheet, View } from 'react-native';
import TokenAmountInput from './TokenAmountInput';
import { UseQueryResult } from '@tanstack/react-query';
import { SwapPriceApiResponse } from '@/types/priceTypes';

type Props = {
  type: SwapType;
  price: UseQueryResult<SwapPriceApiResponse | undefined, Error>;
};

export default function TokenBox({ type, price }: Props) {
  return (
    <View style={styles.container}>
      <TokenSelect type={type} />
      <TokenAmountInput
        type={type}
        isLoading={price.isLoading}
        buyAmount={price.data?.buyAmount}
      />
    </View>
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
