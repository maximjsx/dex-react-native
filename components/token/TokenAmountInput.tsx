import {
  useSellAmount,
  useTokenByType,
  useSetSellAmount,
} from '@/store/swapStore';
import React from 'react';
import FieldLoader from '../ui/FieldLoader';
import { SwapType } from '@/types/swapTypes';
import { TextInput, StyleSheet } from 'react-native';
import { formatTokenValue, sanitizeInput } from '@/utils/swapUtils';

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

  const handleInputChange = (value: string) => {
    if (isSellType) {
      setSellAmount(sanitizeInput(value));
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
