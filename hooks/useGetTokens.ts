import { useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { getTokens } from '@/apis/tokenApis';

export default function useGetTokens() {
  const account = useAccount();

  return useQuery({
    queryKey: ['tokenList', account.chainId],
    queryFn: () => getTokens({ chainId: account.chainId }),
    enabled: !!account.chainId,
  });
}
