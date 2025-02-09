import { erc20Abi } from 'viem';
import { Token } from '@/types/tokenTypes';
import { useWriteContract, useSimulateContract } from 'wagmi';
import { MAX_ALLOWANCE, SWAP_PROXY_ADDRESS } from '@/constants';
import ThemedPressable from '../theme/ThemedPressable';

// `SWAP_PROXY_ADDRESS` contract acts like a proxy between sell token contract and erc20 contract.

// 1. Read `SWAP_PROXY_ADDRESS` contract to check if my token has allowance on it.
// 2. Specify the Spender: The spender should be the 0x Exchange Proxy contract address.
// 3. Verify the Allowance: Ensure the returned allowance is greater than or equal to the amount you intend to swap.

type Props = {
  sellToken: Token;
};

export default function SwapAllowancePressable({ sellToken }: Props) {
  const simulateContractResult = useSimulateContract({
    abi: erc20Abi,
    address: sellToken.address,
    functionName: 'approve',
    args: [SWAP_PROXY_ADDRESS, MAX_ALLOWANCE],
  });

  const writeContractResult = useWriteContract();

  const handleAllowSwap = () => {
    if (simulateContractResult.data?.result) {
      writeContractResult.writeContract(simulateContractResult.data.request);
    }
  };

  return (
    <ThemedPressable onPress={handleAllowSwap}>
      Allow {sellToken.symbol} for swap
    </ThemedPressable>
  );
}
