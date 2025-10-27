import { Text } from '@/components/bases';
import { OnlineStatusIndicator } from '@/components/modules/OnlineStatusIndicator';
import { router } from 'expo-router';
import React, { memo, useState, useRef, useEffect, useCallback } from 'react';
import { View, ImageSourcePropType, TouchableHighlight } from 'react-native';
import { Image } from 'expo-image';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { MaterialIcons } from '@expo/vector-icons';
import Reanimated, {
  SharedValue,
  useAnimatedStyle
} from 'react-native-reanimated';

type OnlineStatus = 'online' | 'recent' | 'offline';

interface MessageThreadItemProps {
  imageSource: ImageSourcePropType;
  userId: number | string;
  nickname: string;
  age: number;
  location: string;
  onlineStatus?: OnlineStatus;
  lastMessage: string;
  formattedTime?: string;
  onSwipeableWillOpen?: (ref: any) => void;
  onItemPress?: () => boolean;
}

// 定数定義（Tailwind準拠）
const ACTION_WIDTH = 160; // w-40 × 2 = 160px

// RightActionをコンポーネント外に定義
function RightAction(_prog: SharedValue<number>, drag: SharedValue<number>) {
  const containerStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{ translateX: drag.value + ACTION_WIDTH }],
      height: '100%',
      width: ACTION_WIDTH,
      flexDirection: 'row'
    };
  }, []);

  return (
    <Reanimated.View style={containerStyle}>
      <View className='h-full flex-1 items-center justify-center bg-gray-400'>
        <MaterialIcons name='visibility-off' size={24} color='white' />
        <Text className='mt-1 text-xs font-semibold text-white'>非表示</Text>
      </View>
      <View className='h-full flex-1 items-center justify-center bg-gray-400'>
        <MaterialIcons name='block' size={24} color='white' />
        <Text className='mt-1 text-xs font-semibold text-white'>ブロック</Text>
      </View>
    </Reanimated.View>
  );
}

export const MessageThreadItem = memo<MessageThreadItemProps>(
  ({
    imageSource,
    nickname,
    location,
    onlineStatus = 'offline',
    userId,
    age,
    lastMessage,
    formattedTime,
    onSwipeableWillOpen,
    onItemPress
  }) => {
    const [isSwiping, setIsSwiping] = useState(false);
    const swipeableRef = useRef<any>(null);

    // スワイプ状態をリセットする関数
    const resetSwipingState = useCallback(() => {
      setIsSwiping(false);
    }, []);

    const handleSwipeOpen = useCallback(() => {
      setIsSwiping(true);
    }, []);

    // 外部からスワイプ状態をリセットできるメソッドを追加
    useEffect(() => {
      if (swipeableRef.current) {
        swipeableRef.current.resetSwipingState = resetSwipingState;
      }
    }, [resetSwipingState]);

    return (
      <ReanimatedSwipeable
        ref={swipeableRef}
        friction={1}
        overshootFriction={8}
        overshootLeft={false}
        rightThreshold={10}
        onSwipeableWillOpen={() => {
          onSwipeableWillOpen?.(swipeableRef.current);
        }}
        onSwipeableOpen={handleSwipeOpen}
        onSwipeableClose={resetSwipingState}
        renderRightActions={RightAction}
      >
        <TouchableHighlight
          onPress={() => {
            // まず他のスワイプを閉じる（あれば）
            const hadOpenSwipeable = onItemPress?.();

            if (isSwiping) {
              // このアイテム自身がスワイプ中の場合は、閉じるだけ
              swipeableRef.current?.close();
            } else if (!hadOpenSwipeable) {
              // スワイプ中でなく、他に開いているスワイプもなければ画面遷移
              router.push(`/(app)/(stack)/messages/${String(userId)}`);
            }
          }}
          underlayColor='#f3f4f6'
          activeOpacity={0.95}
        >
          <View className='mx-5 flex-row items-start py-3'>
            <Image
              source={imageSource}
              style={{ width: 64, height: 64, borderRadius: 32 }}
              contentFit='cover'
              cachePolicy='memory-disk'
              priority='high'
            />
            <View className='flex-1'>
              <View className='ml-4 flex-row items-center justify-between'>
                <Text className='text-m font-bold text-body'>
                  {nickname} {age}歳 {location}
                </Text>
                {formattedTime && (
                  <Text className='text-xs text-gray-500'>{formattedTime}</Text>
                )}
              </View>
              <Text className='ml-4 mt-1 text-s text-description'>
                {lastMessage}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </ReanimatedSwipeable>
    );
  }
);

MessageThreadItem.displayName = 'MessageThreadItem';
