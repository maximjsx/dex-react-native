import { StyleSheet, TextInput, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
  query: string;
  onChange: (value: string) => void;
};

export default function TokenSearch({ query, onChange }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        style={styles.input}
        onChangeText={(value) => onChange(value)}
        placeholder='Search by symbol or name...'
      />
      <Ionicons name='search-outline' size={20} color='grey' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 16,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f4f4f5',
  },
  input: {
    width: '95%',
    fontSize: 16,
  },
});
