import { useAccount } from 'wagmi';
import { Link } from 'expo-router';
import SwapButton from './SwapButton';
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
    <Link href='/' />;
  }

  return null;
}
