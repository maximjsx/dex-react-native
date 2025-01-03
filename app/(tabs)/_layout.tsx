import React from 'react';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Colors } from '@/constants/Colors';
import { HapticTab } from '@/components/HapticTab';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useColorScheme } from '@/hooks/useColorScheme';
import TabBarBackground from '@/components/ui/TabBarBackground';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color }) => (
            <Ionicons name='wallet-outline' size={20} color='grey' />
          ),
        }}
      />
      <Tabs.Screen
        name='explore'
        options={{
          title: 'Swap',
          tabBarIcon: ({ color }) => (
            <Ionicons name='swap-vertical' size={20} color='grey' />
          ),
        }}
      />
    </Tabs>
  );
}
