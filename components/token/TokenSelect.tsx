import { SwapType } from '@/types/swapTypes';
import { ThemedText } from '../theme/ThemedText';
import { ThemedView } from '../theme/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, Pressable, StyleSheet } from 'react-native';
import { useOpenTokenListByType, useTokenByType } from '@/store/swapStore';

type Props = {
  type: SwapType;
};

export default function TokenSelect({ type }: Props) {
  const token = useTokenByType(type);
  const openTokenList = useOpenTokenListByType();

  const hanldePress = () => {
    openTokenList(type, true);
  };

  return (
    <Pressable style={styles.pressable} onPress={hanldePress}>
      {token?.logoURI ? (
        <Image
          style={styles.icon}
          resizeMode='contain'
          source={{
            uri: token?.logoURI,
          }}
        />
      ) : (
        <ThemedView style={styles.placeholder} />
      )}
      <ThemedText style={styles.symbol}>{token?.symbol || ''}</ThemedText>
      <Ionicons name='chevron-down' size={20} color='grey' />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
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
  },
  placeholder: {
    width: 25,
    height: 25,
    borderRadius: '50%',
    backgroundColor: '#f4f4f5',
  },
});
