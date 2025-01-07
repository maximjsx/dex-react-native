import { ThemedText } from './ThemedText';
import { SwapType } from '@/types/swapTypes';
import { useTokenByType } from '@/store/swapStore';
import { formatTokenValue } from '@/utils/swapUtils';
import { Image, StyleSheet, View } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';

type Props = {
  type: SwapType;
  amount: string | undefined;
  isLoading: boolean;
};

export default function OrderToken({ type, amount, isLoading }: Props) {
  const token = useTokenByType(type);

  const orderAmount =
    amount && token?.decimals
      ? formatTokenValue(BigInt(amount), token.decimals)
      : amount;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
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
      </View>
      {isLoading ? (
        <View style={styles.loader}>
          <ContentLoader
            speed={1}
            width={100}
            height={36}
            viewBox='0 0 100 36'
            backgroundColor='#f3f3f3'
            foregroundColor='#fff'
          >
            <Rect x='0' y='0' rx='8' ry='8' width='100%' height='36' />
          </ContentLoader>
        </View>
      ) : (
        <ThemedText style={styles.symbol}>{orderAmount}</ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
  loader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
