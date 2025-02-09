import { useAccount } from 'wagmi';
import { StatusColors } from '@/constants/Colors';
import { StyleSheet, View, Image } from 'react-native';
import { ThemedText } from '@/components/theme/ThemedText';
import { ThemedView } from '@/components/theme/ThemedView';
import { AppKitButton, useWalletInfo } from '@reown/appkit-wagmi-react-native';

export default function HomeScreen() {
  const { walletInfo } = useWalletInfo();
  const account = useAccount();

  let borderColor = StatusColors.default;

  switch (account.status) {
    case 'connected':
      borderColor = StatusColors.connected;
      break;
    case 'reconnecting':
      borderColor = StatusColors.connecting;
      break;
    default:
      borderColor = StatusColors.default;
  }

  return (
    <ThemedView style={styles.container}>
      {walletInfo?.name ? (
        <ThemedText type='title'>{walletInfo.name}</ThemedText>
      ) : null}

      {walletInfo?.icon ? (
        <View style={[styles.iconContainer, { borderColor }]}>
          <Image
            source={{ uri: walletInfo.icon }}
            style={styles.icon}
            resizeMode='contain'
          />
        </View>
      ) : null}

      <View style={styles.buttonContainer}>
        <AppKitButton />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonContainer: {
    marginTop: 12,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 16,
    backgroundColor: '#000',
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
