import { Transaction } from '@/types/quoteTypes';
import { useAccount, useSendTransaction } from 'wagmi';
import ThemedPressable from '../theme/ThemedPressable';
import activeChainScanDomain from '@/utils/chainUtils';

type Props = {
  transaction: Transaction;
};

export default function OrderActions({ transaction }: Props) {
  const { data, sendTransaction } = useSendTransaction();
  const account = useAccount();

  const handleSendTransaction = () => {
    sendTransaction({
      to: transaction.to,
      value: BigInt(transaction.value),
      data: transaction.data,
    });
  };

  if (data && account.chainId) {
    const scanDomain = activeChainScanDomain(account.chainId);
    return (
      <ThemedPressable href={`https://${scanDomain}/tx/${data}`}>
        Check transaction
      </ThemedPressable>
    );
  }

  return (
    <ThemedPressable onPress={handleSendTransaction}>
      Confirm order
    </ThemedPressable>
  );
}
