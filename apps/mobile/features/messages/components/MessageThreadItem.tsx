import { Text } from '@/components/bases';
import { OnlineStatusIndicator } from '@/components/modules/OnlineStatusIndicator';
import { router } from 'expo-router';
import React, { memo } from 'react';
import { View, ImageSourcePropType, TouchableHighlight } from 'react-native';
import { Image } from 'expo-image';

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
    return (
      <TouchableHighlight
        onPress={() => {
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
    );
  }
);

MessageThreadItem.displayName = 'MessageThreadItem';
