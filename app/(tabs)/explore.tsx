import TokenBox from '@/components/TokenBox';
import { StyleSheet, View } from 'react-native';
import SwapButton from '@/components/SwapButton';
import useInitTokens from '@/hooks/useInitTokens';
import useGetSwapPrice from '@/hooks/useGetSwapPrice';
import TokenListModal from '@/components/TokenListModal';

export default function SwapScreen() {
  const initTokens = useInitTokens();
  useGetSwapPrice();

  if (!initTokens.tokensList) return null;

  return (
    <View style={styles.container}>
      <TokenBox type='sell' data={initTokens.tokensList} />
      <SwapButton />
      <TokenBox type='buy' data={initTokens.tokensList} />
      <TokenListModal data={initTokens.tokensList} />
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
