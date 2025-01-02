import {
  Text,
  View,
  Image,
  Modal,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import {
  useSwapStore,
  useOpenTokenList,
  useSetTokenByType,
  useIsTokenListOpen,
} from '@/store/swapStore';
import { useState } from 'react';
import { Token } from '@/types/tokenTypes';
import { SwapType } from '@/types/swapTypes';
import tokensListData from '../data/tokensListData.json';

type Props = {
  type: SwapType;
};

export default function TokenListModal({ type }: Props) {
  const isTokenListOpen = useIsTokenListOpen();
  const setTokenByType = useSetTokenByType();
  const openTokenList = useOpenTokenList();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = searchQuery
    ? tokensListData.tokens.filter((item) =>
        item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tokensListData.tokens;

  const handleSelect = (item: Token) => {
    setTokenByType(type, item);
    openTokenList(false);
  };

  return (
    <View style={styles.container}>
      <Modal visible={isTokenListOpen} animationType='fade' transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* <TextInput
              style={styles.searchBox}
              placeholder='Search...'
              value={searchQuery}
              onChangeText={onSearchChange}
            /> */}

            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.address}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.option}
                  onPress={() => handleSelect(item)}
                >
                  <View style={styles.rowContainer}>
                    <Image
                      style={styles.icon}
                      resizeMode='contain'
                      source={{ uri: item.logoURI }}
                    />
                    <View style={styles.column}>
                      <Text style={styles.symbol}>{item.symbol}</Text>
                      <Text style={styles.name}>{item.name}</Text>
                    </View>
                  </View>
                </Pressable>
              )}
            />

            <Pressable
              style={styles.closeButton}
              onPress={() => useSwapStore.getState().openTokenList(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  modalOverlay: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  selectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
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
  modalContent: {
    width: '100%',
    maxHeight: '100%',
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
    padding: 16,
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
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  rowContainer: {
    width: 100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  name: {
    fontSize: 12,
  },
});
