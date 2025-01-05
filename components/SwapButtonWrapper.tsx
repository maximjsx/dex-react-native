import { useAccount } from 'wagmi';
import SwapButton from './SwapButton';
import { useTokenByType } from '@/store/swapStore';

type Props = {
  allowance: string | undefined;
};

export default function SwapButtonWrapper({ allowance }: Props) {
  const sellToken = useTokenByType('sell');
  const account = useAccount();

  if (sellToken?.address && account.address) {
    return (
      <SwapButton
        allowance={allowance}
        sellTokenAddress={sellToken.address}
        walletAddress={account.address}
      />
    );
  }

  return null;
}
