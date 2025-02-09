import {
  useTokenListOpen,
  useSetTokenByType,
  useOpenTokenListByType,
} from '@/store/swapStore';
import { useState } from 'react';
import TokenSearch from './TokenSearch';
import { Token } from '@/types/tokenTypes';
import { ThemedText } from '../theme/ThemedText';
import { ThemedView } from '../theme/ThemedView';
import useInitTokenList from '@/hooks/useInitTokenList';
import { Modal, Image, FlatList, Pressable, StyleSheet } from 'react-native';

const ITEM_HEIGHT = 70;

export default function TokenListModal() {
  const { tokenList } = useInitTokenList();

  const tokenListOpen = useTokenListOpen();
  const type = tokenListOpen.buy ? 'buy' : 'sell';

  const setTokenByType = useSetTokenByType();
  const openTokenList = useOpenTokenListByType();

  const [searchQuery, setSearchQuery] = useState('');

  if (!tokenList) return null;

  const filteredData = searchQuery
    ? tokenList.filter((item) =>
        item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tokenList;

  const handleSelect = (item: Token) => {
    setTokenByType(type, item);
    openTokenList(type, false);
    setSearchQuery('');
  };

  const handleClose = () => {
    openTokenList(type, false);
    setSearchQuery('');
  };

  return (
    <Modal
      transparent={true}
      animationType='fade'
      visible={tokenListOpen.buy || tokenListOpen.sell}
    >
      <ThemedView style={styles.modalContent}>
        <TokenSearch query={searchQuery} onChange={setSearchQuery} />

        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.address}
          renderItem={({ item }) => (
            <Pressable style={styles.option} onPress={() => handleSelect(item)}>
              <ThemedView style={styles.rowContainer}>
                <Image
                  style={styles.icon}
                  resizeMode='contain'
                  source={{ uri: item.logoURI || '' }}
                />
                <ThemedText style={styles.symbol}>{item.symbol}</ThemedText>
                <ThemedText style={styles.name}>{item.name}</ThemedText>
              </ThemedView>
            </Pressable>
          )}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
          removeClippedSubviews={true}
          getItemLayout={(data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
        />

        <Pressable style={styles.closePressable} onPress={handleClose}>
          <ThemedText style={styles.closePressableText}>Close</ThemedText>
        </Pressable>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
  symbol: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalContent: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
  },
  searchBox: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  option: {
    height: ITEM_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closePressable: {
    marginTop: 16,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#007BFF',
  },
  closePressableText: {
    color: '#fff',
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  name: {
    fontSize: 16,
  },
});
