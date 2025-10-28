import { View, Image } from 'react-native';
import React, { memo } from 'react';
import { Button, Text } from '@/components/bases';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const HomeHeader = memo(() => {
  const insets = useSafeAreaInsets();
  return (
    <View
      className='absolute left-0 right-0 top-0 z-10 flex-row items-center justify-between bg-white px-5'
      style={{
        paddingTop: insets.top + 8,
        paddingBottom: 8,
        height: insets.top + 64
      }}
    >
      {/* ロゴ */}
      <Image
        source={require('@/assets/images/logo.png')}
        style={{ width: 140, height: 140, marginLeft: -10 }}
        resizeMode='contain'
      />
      <View>
        {/* 検索・絞り込みボタン */}
        <Button
          activeOpacity={0.7}
          onPress={() => {
            // TODO: 検索・絞り込み画面に遷移
            console.log('検索・絞り込み画面を開く');
          }}
          className='flex-row items-center gap-2 rounded-full border border-gray-300 px-4 py-2'
        >
          <Ionicons name='search' size={20} color='#666' />
          <Text className='text-sm text-gray-600'>絞り込み中</Text>
        </Button>
      </View>
    </View>
  );
});

HomeHeader.displayName = 'HomeHeader';
