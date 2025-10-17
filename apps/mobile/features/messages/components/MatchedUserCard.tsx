import { Text } from '@/components/bases';
import { OnlineStatusIndicator } from '@/components/modules/OnlineStatusIndicator';
import { router } from 'expo-router';
import React, { memo } from 'react';
import {
  View,
  Image,
  ImageSourcePropType,
  TouchableOpacity
} from 'react-native';

type OnlineStatus = 'online' | 'recent' | 'offline';

interface MatchedUserCardProps {
  imageSource: ImageSourcePropType;
  userId: number | string;
  age: number;
  location: string;
  onlineStatus?: OnlineStatus;
}

export const MatchedUserCard = memo<MatchedUserCardProps>(
  ({ imageSource, age, location, onlineStatus = 'offline', userId }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          router.push(`/(app)/(stack)/messages/${String(userId)}`);
        }}
        className='mr-3 items-center'
        activeOpacity={1}
      >
        <Image source={imageSource} className='h-20 w-20 rounded-full' />
        <View className='mt-1 flex-row items-center'>
          <OnlineStatusIndicator status={onlineStatus} />
          <Text className='ml-1 text-sm text-body'>
            {age}歳 {location}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
);

MatchedUserCard.displayName = 'MatchedUserCard';
