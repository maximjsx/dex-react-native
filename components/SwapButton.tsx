import { useBalance } from 'wagmi';
import { Address } from '@/types/swapTypes';
import AllowSwapButton from './AllowSwapButton';
import { NATIVE_TOKEN_ADDRESS } from '@/constants';
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  allowance: string | undefined;
  sellTokenAddress: string;
  walletAddress: Address;
};

export default function SwapButton({
  allowance,
  sellTokenAddress,
  walletAddress,
}: Props) {
  const allowedToSwap = allowance && allowance !== '0';
  const notAllowedToSwap = allowance && allowance === '0';

  const balanceResult = useBalance({
    address: walletAddress,
    // Do not pass `sellTokenAddress` if it's a chain native token.
    ...(sellTokenAddress.toLowerCase() !== NATIVE_TOKEN_ADDRESS
      ? { token: sellTokenAddress as Address }
      : {}),
  });

  console.log('BALANCE_RES', balanceResult.data);

  if (!balanceResult.data?.value) {
    return (
      <Pressable style={styles.button}>
        <Text style={styles.text}>Insufficient balance</Text>
      </Pressable>
    );
  }

  // should I check inside <AllowButton/> and display or here?
  if (allowedToSwap) {
    return (
      <Pressable style={styles.button}>
        <Text style={styles.text}>Swap</Text>
      </Pressable>
    );
  }

  if (notAllowedToSwap) {
    return (
      <AllowSwapButton
        sellTokenAddress={sellTokenAddress}
        walletAddress={walletAddress}
      />
    );
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
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});
