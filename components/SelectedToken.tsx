import SelectList from './SelectList';
import AmountInput from './AmountInput';
import { StyleSheet, View } from 'react-native';
import tokensList from '../data/tokensList.json';

type Props = {
  type: 'buy' | 'sell';
  defaultToken: string;
};

export default function SelectedToken({ type, defaultToken }: Props) {
  return (
    <View style={styles.container}>
      <SelectList type={type} data={tokensList} defaultToken={defaultToken} />
      <AmountInput />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f5',
    gap: 10,
    borderRadius: 12,
    padding: 16,
  },
});
