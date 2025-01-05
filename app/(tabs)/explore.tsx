import SwapInfo from '@/components/SwapInfo';
import { StyleSheet, View } from 'react-native';
import TokenListModal from '@/components/TokenListModal';

export default function SwapScreen() {
  return (
    <View style={styles.container}>
      <SwapInfo />
      <TokenListModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 16,
  },
});
