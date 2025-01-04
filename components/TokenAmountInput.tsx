import {
  useSellAmount,
  useSetSellAmount,
  useTokenByType,
} from '@/store/swapStore';
import React from 'react';
import { SwapType } from '@/types/swapTypes';
import { TextInput, StyleSheet, View } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { formatTokenValue } from '@/utils/priceUtils';

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
    return (
      <View style={styles.loader}>
        <ContentLoader
          speed={1}
          width={100}
          height={36}
          viewBox='0 0 100 36'
          backgroundColor='#f3f3f3'
          foregroundColor='#fff'
        >
          <Rect x='0' y='0' rx='8' ry='8' width='100%' height='36' />
        </ContentLoader>
      </View>
    );
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
  loader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 45,
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
  },
});
