import { SwapType } from '@/types/swapTypes';
import { TextInput, StyleSheet } from 'react-native';
import { useSellAmount, useSetSellAmount } from '@/store/swapStore';

type Props = {
  type: SwapType;
};

export default function TokenAmountInput({ type }: Props) {
  const isSellType = type === 'sell';

  const setSellAmount = useSetSellAmount();
  const sellAmount = useSellAmount();

  const handleInputChange = (input: string) => {
    if (isSellType) {
      // Allow only numbers
      const sanitizedInput = input.replace(/[^0-9]/g, '');
      setSellAmount(sanitizedInput);
    }
  };

  return (
    <TextInput
      style={styles.input}
      keyboardType='numeric'
      editable={isSellType}
      onChangeText={handleInputChange}
      value={isSellType ? sellAmount : ''}
      placeholder={isSellType ? 'Enter amount' : ''}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    fontSize: 20,
    fontWeight: 500,
    color: '#333',
  },
});
