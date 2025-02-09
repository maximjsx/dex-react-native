import { ReactNode } from 'react';
import { ThemedText } from './ThemedText';
import { Pressable, StyleSheet } from 'react-native';
import { Href, Link } from 'expo-router';

type Props = {
  children: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  href?: Href;
};

export default function ThemedPressable({
  children,
  href,
  onPress = () => {},
  disabled = false,
}: Props) {
  if (href) {
    return (
      <Link href={href} style={styles.pressable}>
        <ThemedText style={styles.text}>{children}</ThemedText>
      </Link>
    );
  }

  return (
    <Pressable disabled={disabled} onPress={onPress} style={styles.pressable}>
      <ThemedText style={styles.text}>{children}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
});
