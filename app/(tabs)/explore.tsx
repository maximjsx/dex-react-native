import TokenBox from '@/components/TokenBox';
import RevertButton from '@/components/RevertButton';
import useInitTokens from '@/hooks/useInitTokens';
import useGetSwapPrice from '@/hooks/useGetSwapPrice';
import { StyleSheet, Text, View } from 'react-native';
import TokenListModal from '@/components/TokenListModal';
import SwapButton from '@/components/SwapButton';

export default function SwapScreen() {
  const initTokens = useInitTokens();
  const price = useGetSwapPrice();

  if (!initTokens.tokensList) return null;

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TokenBox type='sell' price={price} />
        <RevertButton />
        <TokenBox type='buy' price={price} />
      </View>

      <View style={styles.info}>
        <Text>
          Liquidity:{' '}
          {price.data?.liquidityAvailable ? 'Available' : 'Not available'}
        </Text>
        <Text>Gas: {price.data?.gas}</Text>
        <Text>Min buy amount: {price.data?.minBuyAmount}</Text>
        <Text>
          Allowance (actual):{' '}
          {price.data?.issues?.allowance?.actual
            ? price.data.issues.allowance.actual
            : ''}
        </Text>
        <Text>
          Sell token balance: {price.data?.issues?.balance?.token || '0'}
        </Text>
      </View>

      <SwapButton />
      <TokenListModal data={initTokens.tokensList} />
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
  box: {
    position: 'relative',
    gap: 10,
  },
  info: {
    marginTop: 12,
    marginBottom: 12,
  },
});
