import { SwapType } from '@/types/swapTypes';
import { Image, StyleSheet } from 'react-native';
import { ThemedText } from '../theme/ThemedText';
import { ThemedView } from '../theme/ThemedView';
import { useTokenByType } from '@/store/swapStore';
import { formatTokenValue } from '@/utils/swapUtils';
import FieldLoader from '../ui/FieldLoader';

type Props = {
  type: SwapType;
  isLoading: boolean;
  amount: string | undefined;
};

export default function OrderToken({ type, amount, isLoading }: Props) {
  const token = useTokenByType(type);

  const orderAmount =
    amount && token?.decimals
      ? formatTokenValue(BigInt(amount), token.decimals)
      : amount;

  return (
    <ThemedView style={styles.container}>
      {isLoading ? (
        <FieldLoader />
      ) : (
        <ThemedView style={styles.row}>
          {token?.logoURI ? (
            <Image
              style={styles.icon}
              resizeMode='contain'
              source={{
                uri: token?.logoURI,
              }}
            />
          ) : null}
          <ThemedText style={styles.symbol}>{token?.symbol || ''}</ThemedText>
        </ThemedView>
      )}

      {isLoading ? (
        <FieldLoader />
      ) : (
        <ThemedText style={styles.symbol}>{orderAmount}</ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#f4f4f5',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  icon: {
    width: 25,
    height: 25,
  },
  symbol: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
