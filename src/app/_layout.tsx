import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { SettingsProvider, useSettings } from '@/context/SettingsContext';
import { BookmarksProvider } from '@/context/BookmarksContext';

// Prevent splash screen from auto-hiding while resources load
SplashScreen.preventAutoHideAsync().catch(() => {});

function RootNavigator() {
  const { isDark, colors } = useSettings();

  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'fade_from_bottom',
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="article/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="part/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="schedule/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="preamble" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <BookmarksProvider>
          <RootNavigator />
        </BookmarksProvider>
      </SettingsProvider>
    </SafeAreaProvider>
  );
}
