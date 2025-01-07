import { useAccount } from 'wagmi';
import { Link } from 'expo-router';
import SwapButton from './SwapButton';
import { StyleSheet } from 'react-native';
import { useSellAmount, useTokenByType } from '@/store/swapStore';

export default function SwapButtonWrapper() {
  const sellToken = useTokenByType('sell');
  const sellAmount = useSellAmount();
  const account = useAccount();

  if (sellToken && account.address) {
    return (
      <SwapButton
        walletAddress={account.address}
        sellAmount={sellAmount}
        sellToken={sellToken}
      />
    );
  } else {
    <Link style={styles.link} href='/'>
      Connect wallet
    </Link>;
  }

  return null;
}

const styles = StyleSheet.create({
  link: {
    padding: 12,
    backgroundColor: '#000',
    borderRadius: 8,
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
});
