import { Tabs } from 'expo-router';
import React from 'react';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          shadowRadius: 0.5,
          shadowOpacity: 0.03,
          borderTopWidth: 0,
          shadowColor: '#000',
          paddingTop: 6
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
          title: 'メッセージ',
          tabBarIcon: ({ color }) => (
            <AntDesign size={22} name='message' color={color} />
          )
        }}
      />
      <Tabs.Screen
        name='mypages'
        options={{
          title: 'マイページ',
          tabBarIcon: ({ color }) => (
            <EvilIcons size={32} name='user' color={color} />
          )
        }}
      />
    </Tabs>
  );
}
