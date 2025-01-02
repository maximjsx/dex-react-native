import { StyleSheet, View } from 'react-native';
import AmountInput from './AmountInput';
import TokenListModal from './TokenListModal';
import { SwapType } from '@/types/swapTypes';
import TokenSelect from './TokenSelect';

type Props = {
  type: SwapType;
};

export default function TokenBox({ type }: Props) {
  return (
    <View style={styles.container}>
      <TokenSelect type={type} />
      <AmountInput />
      <TokenListModal type={type} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
