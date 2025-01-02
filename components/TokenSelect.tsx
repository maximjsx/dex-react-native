import { ThemedText } from './ThemedText';
import { SwapType } from '@/types/swapTypes';
import { Image, Pressable, StyleSheet } from 'react-native';
import { useOpenTokenList, useTokenByType } from '@/store/swapStore';

type Props = {
  type: SwapType;
};

export default function TokenSelect({ type }: Props) {
  const token = useTokenByType(type);
  const openTokenList = useOpenTokenList();

  const hanldePress = () => {
    openTokenList(true);
  };

  return (
    <Pressable style={styles.container} onPress={hanldePress}>
      <Image
        style={styles.icon}
        resizeMode='contain'
        source={{
          uri: token?.logoURI,
        }}
      />
      <ThemedText style={styles.symbol}>{token?.symbol}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
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
