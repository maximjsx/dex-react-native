import { useAccount } from 'wagmi';
import SwapActions from './SwapActions';
import { useSellAmount, useTokenByType } from '@/store/swapStore';
import ThemedPressable from '../theme/ThemedPressable';

export default function SwapActionsWrapper() {
  const sellToken = useTokenByType('sell');
  const sellAmount = useSellAmount();
  const account = useAccount();

  if (sellToken && account.address) {
    return (
      <SwapActions
        sellAmount={sellAmount}
        sellToken={sellToken}
        walletAddress={account.address}
      />
    );
  }

  return <ThemedPressable href='/'>Connect wallet</ThemedPressable>;
}
