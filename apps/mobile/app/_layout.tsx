import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native';
import { Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRef } from 'react';

export const unstable_settings = {
  anchor: '(tabs)'
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);

  // 画面遷移時にログ出力
  if (prevPathRef.current !== pathname) {
    console.log('[📺 screen]', pathname);
    prevPathRef.current = pathname;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerTitle: '',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 17 },
          headerShadowVisible: false
        }}
      >
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen
          name='modal'
          options={{ presentation: 'modal', title: 'Modal' }}
        />
      </Stack>
      <StatusBar style='auto' />
    </ThemeProvider>
  );
}
