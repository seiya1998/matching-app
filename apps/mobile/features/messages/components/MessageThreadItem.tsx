import { Text } from '@/components/bases';
import { OnlineStatusIndicator } from '@/components/modules/OnlineStatusIndicator';
import React, { memo } from 'react';
import {
  View,
  Image,
  ImageSourcePropType,
  TouchableHighlight
} from 'react-native';

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
    formattedTime
  }) => {
    const handleUserPress = (userId: number | string) => {
      console.log(`User ${userId} pressed`);
      // ここでナビゲーション処理など
    };

    return (
      <TouchableHighlight
        onPress={() => handleUserPress(userId)}
        underlayColor='#f3f4f6'
        activeOpacity={0.95}
      >
        <View className='flex-row items-start px-4 py-3'>
          <Image source={imageSource} className='h-16 w-16 rounded-full' />
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
    );
  }
);

MessageThreadItem.displayName = 'MessageThreadItem';
