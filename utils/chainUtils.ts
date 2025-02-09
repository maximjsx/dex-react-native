import { CHAIN_LIST } from '@/constants/Chains';

export default function activeChainScanDomain(chainId: number): string {
  switch (chainId) {
    case CHAIN_LIST.pol.id:
      return CHAIN_LIST.pol.scanDomain;
    default:
      return CHAIN_LIST.eth.scanDomain;
  }
}
