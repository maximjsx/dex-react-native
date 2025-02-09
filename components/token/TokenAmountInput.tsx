import {
  useSellAmount,
  useTokenByType,
  useSetSellAmount,
} from '@/store/swapStore';
import React from 'react';
import { SwapType } from '@/types/swapTypes';
import { formatTokenValue } from '@/utils/swapUtils';
import { TextInput, StyleSheet } from 'react-native';
import FieldLoader from '../ui/FieldLoader';

type Props = {
  type: SwapType;
  isLoading: boolean;
  buyAmount: string | undefined;
};

export default function TokenAmountInput({
  type,
  buyAmount,
  isLoading,
}: Props) {
  const isSellType = type === 'sell';
  const token = useTokenByType(type);

  const setSellAmount = useSetSellAmount();
  const sellAmount = useSellAmount();

  const buyAmountPrice =
    buyAmount && token?.decimals
      ? formatTokenValue(BigInt(buyAmount), token.decimals)
      : buyAmount;

  const handleInputChange = (input: string) => {
    if (isSellType) {
      // Allow only numbers and one dot
      const sanitizedInput = input
        .replace(/[^0-9.]/g, '')
        .replace(/(\..*)\./g, '$1');

      setSellAmount(sanitizedInput);
    }
  };

  if (isLoading && !isSellType) {
    return <FieldLoader borderRadius={12} />;
  }

  return (
    <TextInput
      style={styles.input}
      editable={isSellType}
      keyboardType='numeric'
      onChangeText={handleInputChange}
      value={isSellType ? sellAmount : buyAmountPrice || 'Unavailable'}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    fontSize: 20,
    fontWeight: '500',
  },
});
