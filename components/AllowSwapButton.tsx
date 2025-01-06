import { erc20Abi } from 'viem';
import { Token } from '@/types/tokenTypes';
import { Address } from '@/types/swapTypes';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useWriteContract, useSimulateContract } from 'wagmi';
import { MAX_ALLOWANCE, SWAP_PROXY_ADDRESS } from '@/constants';

// `SWAP_PROXY_ADDRESS` contract acts like a proxy between sell token contract and erc20 contract.

// 1. Read `SWAP_PROXY_ADDRESS` contract to check if my token has allowance on it.
// 2. Specify the Spender: The spender should be the 0x Exchange Proxy contract address.
// 3. Verify the Allowance: Ensure the returned allowance is greater than or equal to the amount you intend to swap.

type Props = {
  sellToken: Token;
};

export default function AllowSwapButton({ sellToken }: Props) {
  const simulateContractResult = useSimulateContract({
    abi: erc20Abi,
    address: sellToken.address as Address,
    functionName: 'approve',
    args: [SWAP_PROXY_ADDRESS, MAX_ALLOWANCE],
  });

  const writeContractResult = useWriteContract();

  const handleAllowSwap = () => {
    if (simulateContractResult.data?.result) {
      writeContractResult.writeContract(simulateContractResult.data.request);
    }
  };

  console.log('writeContractResult', writeContractResult.data);

  return (
    <Pressable style={styles.button} onPress={handleAllowSwap}>
      <Text style={styles.text}>Allow {sellToken.symbol} for swap</Text>
    </Pressable>
  );
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
