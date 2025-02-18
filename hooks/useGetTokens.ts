import { useAccount } from 'wagmi';
import { getTokens } from '@/apis/tokenApis';
import { useQuery } from '@tanstack/react-query';

export default function useGetTokens() {
  const account = useAccount();

  return useQuery({
    queryKey: ['tokenList', account.chainId],
    queryFn: () => getTokens({ chainId: account.chainId }),
    enabled: !!account.chainId,
  });
}
