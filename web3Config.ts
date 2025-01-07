import { defaultWagmiConfig } from '@reown/appkit-wagmi-react-native';
import { mainnet, polygon, arbitrum } from '@wagmi/core/chains';

export const REOWN_PROJECT_ID = process.env.EXPO_PUBLIC_REOWN_PROJECT_ID || '';

const metadata = {
  name: 'Dex React Native',
  description: 'Dex Swap React Native MVP',
  url: 'https://reown.com/appkit',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com',
  },
};

const chains = [mainnet, polygon, arbitrum] as const;

export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId: REOWN_PROJECT_ID,
  metadata,
});
