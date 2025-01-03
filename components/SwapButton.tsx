import { Pressable, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SwapButton() {
  return (
    <Pressable style={styles.button}>
      <Ionicons name='arrow-down' size={20} color='grey' />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    zIndex: 2,
    top: '49%',
    left: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f4f4f5',
    backgroundColor: '#fff',
  },
});
