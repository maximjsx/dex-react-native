import { useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { getTokens } from '@/apis/tokenApis';

export default function useGetTokens() {
  const account = useAccount();

  const priceQueryParams = {
    chainId: account.chainId as number,
  };

  return useQuery({
    queryKey: ['tokensList', priceQueryParams],
    queryFn: () => getTokens({ chainId: account.chainId as number }),
    enabled: !!priceQueryParams.chainId,
  });
}
