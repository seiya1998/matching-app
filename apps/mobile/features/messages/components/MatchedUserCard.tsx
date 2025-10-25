import { Text, Button } from '@/components/bases';
import { OnlineStatusIndicator } from '@/components/modules';
import { router } from 'expo-router';
import React, { memo } from 'react';
import { View, ImageSourcePropType } from 'react-native';
import { Image } from 'expo-image';

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
      <Button
        onPress={() => {
          router.push(`/(app)/(stack)/messages/${String(userId)}`);
        }}
        className='mr-3 items-center'
        activeOpacity={1}
      >
        <Image
          source={imageSource}
          style={{ width: 80, height: 80, borderRadius: 40 }}
          contentFit='cover'
          cachePolicy='memory-disk'
          priority='high'
        />
        <View className='mt-1 flex-row items-center'>
          <OnlineStatusIndicator status={onlineStatus} />
          <Text className='ml-1 text-sm text-body'>
            {age}歳 {location}
          </Text>
        </View>
      </Button>
    );
  }
);

MatchedUserCard.displayName = 'MatchedUserCard';
