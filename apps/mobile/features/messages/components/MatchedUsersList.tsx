import { MatchedUserCard } from './MatchedUserCard';
import React, { memo } from 'react';
import { View, ImageSourcePropType } from 'react-native';
import { FlashList } from '@shopify/flash-list';

type OnlineStatus = 'online' | 'recent' | 'offline';

interface User {
  id: number | string;
  age: number;
  location: string;
  status: OnlineStatus;
  imageSource?: ImageSourcePropType;
}

interface MatchedUsersListProps {
  users: User[];
}

export const MatchedUsersList = memo<MatchedUsersListProps>(({ users }) => {
  return (
    <View className='-mx-4 mt-3' style={{ height: 120 }}>
      <FlashList
        data={users}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <MatchedUserCard
            imageSource={
              item.imageSource ||
              require('@/assets/images/users/default-user.jpg')
            }
            userId={item.id}
            age={item.age}
            location={item.location}
            onlineStatus={item.status}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
});

MatchedUsersList.displayName = 'MatchedUsersList';
