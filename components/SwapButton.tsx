import { Token } from '@/types/tokenTypes';
import { Address } from '@/types/swapTypes';
import { erc20Abi, parseUnits } from 'viem';
import AllowSwapButton from './AllowSwapButton';
import { useBalance, useReadContract } from 'wagmi';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NATIVE_TOKEN_ADDRESS, SWAP_PROXY_ADDRESS } from '@/constants';

type Props = {
  sellToken: Token;
  sellAmount: string;
  walletAddress: Address;
};

export default function SwapButton({
  sellToken,
  sellAmount,
  walletAddress,
}: Props) {
  // Read from erc20, does spender `SWAP_PROXY_ADDRESS` have allowance?
  // Retunrns `0n` if no allowance
  const readContractResult = useReadContract({
    abi: erc20Abi,
    address: sellToken.address as Address,
    functionName: 'allowance',
    args: [walletAddress, SWAP_PROXY_ADDRESS],
  });

  const sellTokenAllowance = readContractResult.data;

  const isNativeToken = sellToken.address === NATIVE_TOKEN_ADDRESS;

  const balanceResult = useBalance({
    address: walletAddress,
    // Do not pass `sellTokenAddress` if it's a chain native token.
    ...(isNativeToken ? {} : { token: sellToken.address as Address }),
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
      <View>
        <Pressable style={styles.button}>
          <Text style={styles.text}>
            Insufficient {sellToken.symbol} balance
          </Text>
        </Pressable>
      </View>
    );
  }

  if (allowedToSwap) {
    return (
      <Pressable style={styles.button}>
        <Text style={styles.text}>Swap</Text>
      </Pressable>
    );
  }

  if (needsApprove) {
    return <AllowSwapButton sellToken={sellToken} />;
  }

  return null;
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: '#000',
    borderRadius: 8,
  },
  text: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
});
