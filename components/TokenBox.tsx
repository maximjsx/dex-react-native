import TokenSelect from './TokenSelect';
import { SwapType } from '@/types/swapTypes';
import { StyleSheet, View } from 'react-native';
import TokenAmountInput from './TokenAmountInput';
import { TokensList } from '@/types/tokenTypes';

type Props = {
  type: SwapType;
  data: TokensList;
};

export default function TokenBox({ type, data }: Props) {
  return (
    <View style={styles.container}>
      <TokenSelect type={type} />
      <TokenAmountInput type={type} />
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
