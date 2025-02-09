import TokenSelect from './TokenSelect';
import { SwapType } from '@/types/swapTypes';
import { StyleSheet } from 'react-native';
import TokenAmountInput from './TokenAmountInput';
import { UseQueryResult } from '@tanstack/react-query';
import { SwapPriceApiResponse } from '@/types/priceTypes';
import { ThemedView } from '../theme/ThemedView';

type Props = {
  type: SwapType;
  price: UseQueryResult<SwapPriceApiResponse | undefined, Error>;
};

export default function TokenBox({ type, price }: Props) {
  return (
    <ThemedView style={styles.container}>
      <TokenSelect type={type} />
      <TokenAmountInput
        type={type}
        isLoading={price.isLoading}
        buyAmount={price.data?.buyAmount}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#f4f4f5',
  },
});
