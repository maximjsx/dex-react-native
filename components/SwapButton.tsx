import { useBalance } from 'wagmi';
import { parseUnits } from 'viem';
import { Token } from '@/types/tokenTypes';
import { Address } from '@/types/swapTypes';
import AllowSwapButton from './AllowSwapButton';
import { NATIVE_TOKEN_ADDRESS } from '@/constants';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  allowance: string | undefined;
  sellToken: Token;
  sellAmount: string;
  walletAddress: Address;
};

export default function SwapButton({
  allowance,
  sellToken,
  sellAmount,
  walletAddress,
}: Props) {
  // Since the price API returns the allowance field, we don't need this hook, but a ready-to-use hook is included just in case.
  // Read from erc20, does spender `SWAP_PROXY_ADDRESS` have allowance?
  // Retunrns `0n` if no allowance
  // const readContractResult = useReadContract({
  //   abi: erc20Abi,
  //   address: sellTokenAddress as Address,
  //   functionName: 'allowance',
  //   args: [walletAddress, SWAP_PROXY_ADDRESS],
  // });

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
    : Boolean(enoughWalletBalance && allowance && allowance !== '0');

  const needsApprove = Boolean(
    !isNativeToken &&
      walletBalanceValue &&
      walletBalanceValue !== 0n &&
      allowance &&
      allowance === '0'
  );

  if (walletBalanceValue === 0n) {
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
