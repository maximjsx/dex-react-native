import { Token } from '@/types/tokenTypes';
import { Address } from '@/types/swapTypes';
import { erc20Abi, parseUnits } from 'viem';
import { useBalance, useReadContract } from 'wagmi';
import ThemedPressable from '../theme/ThemedPressable';
import SwapAllowancePressable from './SwapAllowancePressable';
import { NATIVE_TOKEN_ADDRESS, SWAP_PROXY_ADDRESS } from '@/constants';

type Props = {
  sellToken: Token;
  sellAmount: string;
  walletAddress: Address;
};

export default function SwapActions({
  sellToken,
  sellAmount,
  walletAddress,
}: Props) {
  // Read from erc20, does spender `SWAP_PROXY_ADDRESS` have allowance?
  // Retunrns `0n` if no allowance
  const readContractResult = useReadContract({
    abi: erc20Abi,
    address: sellToken.address,
    functionName: 'allowance',
    args: [walletAddress, SWAP_PROXY_ADDRESS],
  });

  const sellTokenAllowance = readContractResult.data;

  const isNativeToken = sellToken.address === NATIVE_TOKEN_ADDRESS;

  const balanceResult = useBalance({
    address: walletAddress,
    // Do not pass `sellTokenAddress` if it's a chain native token.
    ...(isNativeToken ? {} : { token: sellToken.address }),
  });

  const walletBalanceValue = balanceResult.data?.value;

  const enoughWalletBalance = Boolean(
    walletBalanceValue &&
      walletBalanceValue > parseUnits(sellAmount, sellToken.decimals)
  );

  const allowedToSwap = isNativeToken
    ? enoughWalletBalance
    : Boolean(
        enoughWalletBalance && sellTokenAllowance && sellTokenAllowance !== 0n
      );

  const needsApprove = Boolean(
    !isNativeToken && enoughWalletBalance && sellTokenAllowance === 0n
  );

  if (!enoughWalletBalance) {
    return (
      <ThemedPressable disabled={true}>
        Insufficient {sellToken.symbol} balance
      </ThemedPressable>
    );
  }

  if (allowedToSwap) {
    return <ThemedPressable href='/order'>Swap</ThemedPressable>;
  }

  if (needsApprove) {
    return <SwapAllowancePressable sellToken={sellToken} />;
  }

  return null;
}
