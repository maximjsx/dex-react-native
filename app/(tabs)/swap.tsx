import { StyleSheet } from 'react-native';
import SwapInfo from '@/components/swap/SwapInfo';
import SwapActionsWrapper from '@/components/swap/SwapActionsWrapper';
import TokenListModal from '@/components/token/TokenListModal';
import { ThemedView } from '@/components/theme/ThemedView';

export default function SwapScreen() {
  return (
    <ThemedView style={styles.container}>
      <SwapInfo />
      <SwapActionsWrapper />
      <TokenListModal />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 16,
  },
});
