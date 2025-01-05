import { useAccount } from 'wagmi';
import SwapButton from './SwapButton';
import { useSellAmount, useTokenByType } from '@/store/swapStore';

type Props = {
  allowance: string | undefined;
};

export default function SwapButtonWrapper({ allowance }: Props) {
  const sellToken = useTokenByType('sell');
  const sellAmount = useSellAmount();
  const account = useAccount();

  if (sellToken && account.address) {
    return (
      <SwapButton
        allowance={allowance}
        walletAddress={account.address}
        sellAmount={sellAmount}
        sellToken={sellToken}
      />
    );
  }

  return null;
}
