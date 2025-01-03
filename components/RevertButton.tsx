import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet } from 'react-native';

export default function RevertButton() {
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
    top: '50%',
    left: '50%',
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f4f4f5',
    backgroundColor: '#fff',
  },
});
