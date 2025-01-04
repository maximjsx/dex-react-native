import { Pressable, StyleSheet, Text } from 'react-native';

export default function SwapButton() {
  return (
    <Pressable style={styles.button}>
      <Text style={styles.text}>Swap</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: '#000',
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});
