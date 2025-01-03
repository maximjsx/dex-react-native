import { useAccount } from 'wagmi';
import { useEffect, useMemo } from 'react';
import { useSetDefaultTokens } from '@/store/swapStore';
import polygonTokenListData from '../data/polygonTokensListData.json';
import ethereumTokenListData from '../data/ethereumTokensListData.json';

export default function useInitTokens() {
  const account = useAccount();
  const setDefaultTokens = useSetDefaultTokens();

  const tokensList = useMemo(() => {
    if (account.chainId === 1) {
      return ethereumTokenListData;
    }
    if (account.chainId === 137) {
      return polygonTokenListData;
    }
  }, [account.chainId]);

  useEffect(() => {
    if (tokensList) {
      setDefaultTokens(tokensList.defaultPair);
    }
  }, [tokensList]);

  return { tokensList };
}
