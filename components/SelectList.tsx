import {
  View,
  Text,
  Modal,
  Image,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import { Token, TokensList } from '@/types/token';

type Props = {
  type: 'buy' | 'sell';
  data: TokensList;
  defaultToken: string;
};

export default function SelectList({ type, data, defaultToken }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Token | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedDefaultToken = data.tokens.find(
    (item) => item.symbol.toLowerCase() === defaultToken.toLowerCase()
  );

  const filteredData = searchQuery
    ? data.tokens.filter((item: Token) =>
        item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : data.tokens;

  const handleSelect = (item: Token) => {
    setSelectedValue(item);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.selectBox} onPress={() => setModalVisible(true)}>
        <Image
          style={styles.icon}
          resizeMode='contain'
          source={{
            uri: selectedValue?.logoURI || selectedDefaultToken?.logoURI || '',
          }}
        />
        <Text style={styles.symbol}>
          {selectedValue ? selectedValue.symbol : selectedDefaultToken?.symbol}
        </Text>
      </Pressable>

      <Modal visible={modalVisible} animationType='fade' transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.searchBox}
              placeholder='Search...'
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

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
              onPress={() => setModalVisible(false)}
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
  selectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  modalOverlay: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  optionText: {
    fontSize: 16,
    color: '#333',
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
  icon: {
    width: 25,
    height: 25,
  },
  rowContainer: {
    width: 100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  symbol: {
    fontSize: 16,
    fontWeight: 600,
  },
  name: {
    fontSize: 12,
  },
});
