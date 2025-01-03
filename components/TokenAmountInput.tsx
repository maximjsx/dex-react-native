import { SwapType } from '@/types/swapTypes';
import { TextInput, StyleSheet } from 'react-native';
import { useSellAmount, useSetSellAmount } from '@/store/swapStore';

type Props = {
  type: SwapType;
};

export default function TokenAmountInput({ type }: Props) {
  const setSellAmount = useSetSellAmount();
  const sellAmount = useSellAmount();

  const handleInputChange = (input: string) => {
    if (type === 'buy') return;
    // Allow only numbers
    const sanitizedInput = input.replace(/[^0-9]/g, '');
    setSellAmount(sanitizedInput);
  };

  return (
    <TextInput
      value={sellAmount}
      style={styles.input}
      keyboardType='numeric'
      editable={type === 'sell'}
      onChangeText={handleInputChange}
      placeholder={type === 'sell' ? 'Enter amount' : ''}
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
