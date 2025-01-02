import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';

export default function SwapButton() {
  return (
    <Pressable style={styles.button}>
      <ThemedText style={styles.text}>Swap</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    zIndex: 2,
    top: '49%',
    left: '50%',
    borderWidth: 1,
    backgroundColor: '#fff',
    paddingTop: 4,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 4,
    borderRadius: 12,
    borderColor: '#f4f4f5',
  },
  text: {
    color: '#518afe',
    fontWeight: 500,
  },
});
