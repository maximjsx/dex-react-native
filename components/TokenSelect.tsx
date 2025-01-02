import { ThemedText } from './ThemedText';
import { SwapType } from '@/types/swapTypes';
import { useSwapStore } from '@/store/swapStore';
import { Image, Pressable, StyleSheet } from 'react-native';

type Props = {
  type: SwapType;
};

export default function TokenSelect({ type }: Props) {
  const token = useSwapStore((state) => state.getTokenByType(type));

  const hanldePress = () => {
    useSwapStore.getState().openTokenList(true);
  };

  return (
    <Pressable style={styles.selectBox} onPress={hanldePress}>
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
  selectBox: {
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
