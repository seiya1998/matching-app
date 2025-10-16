import { MatchedUserCard } from './MatchedUserCard';
import React, { memo } from 'react';
import { View, ScrollView, ImageSourcePropType } from 'react-native';

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
  onUserPress?: (userId: number | string) => void;
}

export const MatchedUsersList = memo<MatchedUsersListProps>(
  ({ users, onUserPress }) => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className='mt-3'
      >
        <View className='flex flex-row'>
          {users.map((user) => (
            <MatchedUserCard
              key={user.id}
              imageSource={
                user.imageSource ||
                require('@/assets/images/users/default-user.jpg')
              }
              userId={user.id}
              age={user.age}
              location={user.location}
              onlineStatus={user.status}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
);

MatchedUsersList.displayName = 'MatchedUsersList';
