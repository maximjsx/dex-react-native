import { StyleSheet, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedView } from '../theme/ThemedView';

type Props = {
  query: string;
  onChange: (value: string) => void;
};

export default function TokenSearch({ query, onChange }: Props) {
  return (
    <ThemedView style={styles.container}>
      <TextInput
        value={query}
        style={styles.input}
        onChangeText={(value) => onChange(value)}
        placeholder='Search by symbol or name...'
      />
      <Ionicons name='search-outline' size={20} color='grey' />
    </ThemedView>
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
