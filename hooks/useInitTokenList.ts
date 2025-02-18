import { useAccount } from 'wagmi';
import { Token } from '@/types/tokenTypes';
import { CHAIN_LIST } from '@/constants/Chains';
import { useEffect, useMemo, useState } from 'react';
import ethTokensData from '../data/ethTokensData.json';
import polTokensData from '../data/polTokensData.json';
import { useSetDefaultTokens } from '@/store/swapStore';

export default function useInitTokenList() {
  const account = useAccount();
  const setDefaultTokens = useSetDefaultTokens();
  const [tokenList, setTokenList] = useState<Token[] | null>(null);

  const rawTokenList = useMemo(() => {
    if (account.chainId === CHAIN_LIST.eth.id) {
      return ethTokensData;
    }
    if (account.chainId === CHAIN_LIST.pol.id) {
      return polTokensData;
    }
  }, [account.chainId]);

  useEffect(() => {
    if (rawTokenList) {
      const defaultPair = rawTokenList.defaultPair.flatMap((tokenObject) =>
        Object.values(tokenObject)
      );
      const flattenedTokens = rawTokenList.list.flatMap((tokenObject) =>
        Object.values(tokenObject)
      );
      setDefaultTokens(defaultPair);
      // The `address` field in `flattenedTokens` is a generic `string`, but we require it to match the Ethereum address format (`0x${string}`).
      // Using `as Token[]` to assert the type, ensuring the `address` field is properly recognized as the required format in the `Token[]` type.
      setTokenList(flattenedTokens as Token[]);
    }
  }, [rawTokenList]);

  return { tokenList };
}
