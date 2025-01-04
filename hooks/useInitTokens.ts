import { useAccount } from 'wagmi';
import { useEffect, useMemo } from 'react';
import { useSetDefaultTokens } from '@/store/swapStore';
import ethTokensData from '../data/ethTokensData.json';
import polTokensData from '../data/polTokensData.json';

export default function useInitTokens() {
  const account = useAccount();
  const setDefaultTokens = useSetDefaultTokens();

  const tokensList = useMemo(() => {
    if (account.chainId === 1) {
      return ethTokensData;
    }
    if (account.chainId === 137) {
      return polTokensData;
    }
  }, [account.chainId]);

  useEffect(() => {
    if (tokensList) {
      const flattenedTokens = tokensList.defaultPair.flatMap((tokenObject) =>
        Object.values(tokenObject)
      );
      setDefaultTokens(flattenedTokens);
    }
  }, [tokensList]);

  return { tokensList };
}
