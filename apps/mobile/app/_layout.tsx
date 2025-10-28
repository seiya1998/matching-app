import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native';
import { Slot, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRef, useState, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const unstable_settings = {
  anchor: '(app)/(tabs)'
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);

  // 画面遷移時にログ出力
  if (prevPathRef.current !== pathname) {
    console.log('[📺 screen]', pathname);
    prevPathRef.current = pathname;
  }

  useEffect(() => {
    async function prepare() {
      try {
        // 必要な初期化処理があればここに記述
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // 準備完了
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    const hideSplash = async () => {
      if (appIsReady) {
        try {
          await SplashScreen.hideAsync();
        } catch (e) {
          console.warn('Failed to hide splash screen:', e);
        }
      }
    };

    hideSplash();
  }, [appIsReady]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Slot />
        <StatusBar style='auto' />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
