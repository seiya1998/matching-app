import { View, Image } from 'react-native';
import React, { memo } from 'react';
import { Button, Text } from '@/components/bases';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type HomeHeaderProps = {
  onSortPress?: () => void;
  onFilterPress?: () => void;
};

export const HomeHeader = memo<HomeHeaderProps>(({ onSortPress, onFilterPress }) => {
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
        style={{ width: 100, height: 100 }}
      />
      <View className='flex-row items-center gap-3'>
        {/* ソートボタン */}
        <Button
          activeOpacity={0.7}
          onPress={onSortPress}
        >
          <Ionicons name='swap-vertical' size={24} color='#666' />
        </Button>

        {/* 検索・絞り込みボタン */}
        <Button
          activeOpacity={0.7}
          onPress={onFilterPress}
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
