import {
  Text,
  View,
  Modal,
  Image,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import {
  useTokenListOpen,
  useSetTokenByType,
  useOpenTokenListByType,
} from '@/store/swapStore';
import { useState } from 'react';
import TokenSearch from './TokenSearch';
import { Token } from '@/types/tokenTypes';
import useInitTokens from '@/hooks/useInitTokens';

const ITEM_HEIGHT = 70;

export default function TokenListModal() {
  const { tokensList } = useInitTokens();

  const tokenListOpen = useTokenListOpen();
  const type = tokenListOpen.buy ? 'buy' : 'sell';

  const setTokenByType = useSetTokenByType();
  const openTokenList = useOpenTokenListByType();

  const [searchQuery, setSearchQuery] = useState('');

  if (!tokensList) return null;

  const flattenedList: Token[] = tokensList.list.flatMap((tokenObject) =>
    Object.values(tokenObject)
  );

  const filteredData = searchQuery
    ? flattenedList.filter((item) =>
        item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : flattenedList;

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
      <View style={styles.modalContent}>
        <TokenSearch query={searchQuery} onChange={setSearchQuery} />

        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.address}
          renderItem={({ item }) => (
            <Pressable style={styles.option} onPress={() => handleSelect(item)}>
              <View style={styles.rowContainer}>
                <Image
                  style={styles.icon}
                  resizeMode='contain'
                  source={{ uri: item.logoURI || '' }}
                />
                <Text style={styles.symbol}>{item.symbol}</Text>
                <Text style={styles.name}>{item.name}</Text>
              </View>
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

        <Pressable style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </Pressable>
      </View>
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
  closeButton: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 8,
  },
  closeButtonText: {
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
