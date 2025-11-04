import { Tabs, router } from 'expo-router';
import React from 'react';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Button, Text } from '@/components/bases';
import { ChevronBack } from '@/assets/svgs';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#5DBAEB',
        headerTitle: '',
        headerShadowVisible: false,
        tabBarStyle: {
          shadowRadius: 1,
          shadowOpacity: 0.03,
          borderTopWidth: 0,
          shadowColor: '#000',
          paddingTop: 6
        },
        tabBarLabelStyle: {
          fontWeight: '700'
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
          headerShown: false,
          headerLeft: () => null,
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name={focused ? 'house.fill' : 'house'}
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name='likes'
        options={{
          title: 'いいね',
          headerShown: false,
          headerLeft: () => null,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              size={24}
              name={focused ? 'thumb-up' : 'thumb-up-outline'}
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name='messages'
        options={{
          headerTitle: 'メッセージ',
          headerLeft: () => null,
          title: 'メッセージ',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              size={26}
              name={focused ? 'comment-processing' : 'comment-processing-outline'}
              color={color}
            />
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
                <Button
                  activeOpacity={0.7}
                  onPress={() => router.push('/(app)/(stack)/settings')}
                >
                  <Ionicons name='settings-outline' size={24} color='black' />
                </Button>
                <Button
                  activeOpacity={0.7}
                  onPress={() => router.push('/(app)/(stack)/notifications')}
                >
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
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={26}
              name={focused ? 'person' : 'person-outline'}
              color={color}
            />
          )
        }}
      />
    </Tabs>
  );
}
