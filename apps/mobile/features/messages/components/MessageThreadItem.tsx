import { Text } from '@/components/bases';
import { OnlineStatusIndicator } from '@/components/modules/OnlineStatusIndicator';
import { router } from 'expo-router';
import React, { memo, useRef, useEffect } from 'react';
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
  isOpen?: boolean;
  hasOtherOpen?: boolean;
  onSwipeableWillOpen?: () => void;
  onSwipeableClose?: () => void;
  onOtherItemPress?: () => void;
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
    isOpen = false,
    hasOtherOpen = false,
    onSwipeableWillOpen,
    onSwipeableClose,
    onOtherItemPress
  }) => {
    const swipeableRef = useRef<any>(null);
    const prevIsOpenRef = useRef(false);
    const isSwipingRef = useRef(false);

    // isOpen が true→false に変化したら close() を呼ぶ
    useEffect(() => {
      if (prevIsOpenRef.current && !isOpen) {
        swipeableRef.current?.close();
        // close()を呼んだら即座にisSwipingRefをfalseに
        isSwipingRef.current = false;
      }
      prevIsOpenRef.current = isOpen;
    }, [isOpen]);

    return (
      <ReanimatedSwipeable
        ref={swipeableRef}
        friction={1}
        overshootFriction={8}
        overshootLeft={false}
        rightThreshold={10}
        onSwipeableWillOpen={() => {
          isSwipingRef.current = true;
          onSwipeableWillOpen?.();
        }}
        onSwipeableClose={() => {
          isSwipingRef.current = false;
          onSwipeableClose?.();
        }}
        renderRightActions={RightAction}
      >
        <TouchableHighlight
          onPress={() => {
            // スワイプ中（まだStateが更新されていない）の場合は何もしない
            if (isSwipingRef.current) {
              return;
            }

            if (isOpen) {
              // 仕様2: スワイプ中にそのアイテムをタップしたら、スワイプを閉じる（画面遷移しない）
              swipeableRef.current?.close();
              isSwipingRef.current = false;
              return;
            }

            if (hasOtherOpen) {
              // 仕様3: スワイプ中に他のアイテムをタップしたら、スワイプを閉じる（画面遷移しない）
              onOtherItemPress?.();
              return;
            }

            // 仕様4: スワイプしていない状態でアイテムをタップしたら、画面遷移する
            router.push(`/(app)/(stack)/messages/${String(userId)}`);
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
