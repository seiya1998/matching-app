import { Tabs, router } from 'expo-router';
import React from 'react';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Button } from '@/components/bases';
import { ChevronBack } from '@/assets/svgs';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerTitle: '',
        headerShadowVisible: false,
        tabBarStyle: {
          shadowRadius: 0.5,
          shadowOpacity: 0.03,
          borderTopWidth: 0,
          shadowColor: '#000',
          paddingTop: 6
        },
        headerLeft: () => {
          return (
            <Button activeOpacity={0.7} onPress={() => router.back()}>
              <ChevronBack />
            </Button>
          );
        },
        tabBarButton: HapticTab
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'ホーム',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name='house' color={color} />
          )
        }}
      />
      <Tabs.Screen
        name='likes'
        options={{
          title: 'いいね',
          tabBarIcon: ({ color }) => (
            <EvilIcons size={32} name='like' color={color} />
          )
        }}
      />
      <Tabs.Screen
        name='messages'
        options={{
          headerTitle: 'メッセージ',
          headerLeft: () => null,
          title: 'メッセージ',
          tabBarIcon: ({ color }) => (
            <AntDesign size={22} name='message' color={color} />
          )
        }}
      />
      <Tabs.Screen
        name='mypages'
        options={{
          headerTitle: 'マイページ',
          headerLeft: () => null,
          headerRight: () => {
            return (
              <View className='mr-4 flex-row gap-6'>
                <Button activeOpacity={0.7} onPress={() => router.back()}>
                  <Ionicons name='settings-outline' size={24} color='black' />
                </Button>
                <Button activeOpacity={0.7} onPress={() => router.back()}>
                  <Ionicons
                    name='notifications-outline'
                    size={24}
                    color='black'
                  />
                </Button>
              </View>
            );
          },
          title: 'マイページ',
          tabBarIcon: ({ color }) => (
            <EvilIcons size={32} name='user' color={color} />
          )
        }}
      />
    </Tabs>
  );
}
