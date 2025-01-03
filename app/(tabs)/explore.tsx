import TokenBox from '@/components/TokenBox';
import useInitSwap from '@/hooks/useInitSwap';
import { StyleSheet, View } from 'react-native';
import SwapButton from '@/components/SwapButton';

export default function SwapScreen() {
  const initSwap = useInitSwap();

  if (!initSwap.tokensList) return null;

  return (
    <View style={styles.container}>
      <TokenBox type='sell' data={initSwap.tokensList} />
      <SwapButton />
      <TokenBox type='buy' data={initSwap.tokensList} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 10,
    padding: 16,
  },
});
