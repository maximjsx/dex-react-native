import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title} type='title'>
        Swap
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 16,
  },
  title: {
    marginTop: 48,
    marginBottom: 40,
  },
});
