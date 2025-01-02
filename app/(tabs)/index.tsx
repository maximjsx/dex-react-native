import React from 'react';
import { useAccount } from 'wagmi';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet, View, Image } from 'react-native';
import { AppKitButton, useWalletInfo } from '@reown/appkit-wagmi-react-native';

export default function HomeScreen() {
  const { walletInfo } = useWalletInfo();
  const account = useAccount();

  let statusIndicator = '';

  switch (account.status) {
    case 'connected':
      statusIndicator = '🟢';
      break;
    case 'reconnecting':
      statusIndicator = '🟡';
      break;
    default:
      statusIndicator = '';
  }

  return (
    <View style={styles.container}>
      {walletInfo?.name ? (
        <ThemedText style={styles.title} type='title'>
          {walletInfo.name}
        </ThemedText>
      ) : null}

      {walletInfo?.icon ? (
        <Image
          source={{ uri: walletInfo.icon }}
          style={styles.icon}
          resizeMode='contain'
        />
      ) : null}

      <ThemedText>
        Status: {account.status} {statusIndicator}
      </ThemedText>

      <View style={styles.buttonContainer}>
        <AppKitButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 48,
    marginBottom: 16,
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 16,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 16,
  },
  link: {
    color: '#007BFF',
    textDecorationLine: 'underline',
    marginBottom: 32,
  },
});
