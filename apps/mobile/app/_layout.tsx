import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native';
import { Slot, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const unstable_settings = {
  anchor: '(app)/(tabs)'
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider
        value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <Slot />
        <StatusBar style='auto' />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
