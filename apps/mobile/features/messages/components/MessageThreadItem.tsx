import { Text } from '@/components/bases';
import { OnlineStatusIndicator } from '@/components/modules/OnlineStatusIndicator';
import { router } from 'expo-router';
import React, { memo, useState, useRef } from 'react';
import { View, ImageSourcePropType, TouchableHighlight } from 'react-native';
import { Image } from 'expo-image';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
  onItemPress?: () => void;
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

    return (
      <GestureHandlerRootView>
        <ReanimatedSwipeable
          ref={swipeableRef}
          friction={2}
          overshootFriction={8}
          overshootLeft={false}
          rightThreshold={40}
          onSwipeableWillOpen={() => {
            setIsSwiping(true);
            onSwipeableWillOpen?.(swipeableRef.current);
          }}
          onSwipeableClose={() => setIsSwiping(false)}
          renderRightActions={RightAction}
        >
          <TouchableHighlight
            onPress={() => {
              onItemPress?.();
              if (!isSwiping) {
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
                    <Text className='text-xs text-gray-500'>
                      {formattedTime}
                    </Text>
                  )}
                </View>
                <Text className='ml-4 mt-1 text-s text-description'>
                  {lastMessage}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        </ReanimatedSwipeable>
      </GestureHandlerRootView>
    );
  }
);

MessageThreadItem.displayName = 'MessageThreadItem';
