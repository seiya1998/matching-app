import { Container, Text } from '@/components/bases';
import { FlashList } from '@shopify/flash-list';
import {
  MatchedUserCard,
  MessageThreadItem
} from '@/features/messages/components';
import { View, TouchableWithoutFeedback } from 'react-native';
import { formatRelativeTime } from '@/utils';
import { useMemo, useState, useCallback } from 'react';

export default function Messages() {
  const [openSwipeableId, setOpenSwipeableId] = useState<
    number | string | null
  >(null);

  const handleSwipeableWillOpen = useCallback((id: number | string) => {
    setOpenSwipeableId(id);
  }, []);

  const handleSwipeableClose = useCallback(() => {
    setOpenSwipeableId(null);
  }, []);

  const handleBackgroundPress = useCallback(() => {
    setOpenSwipeableId(null);
  }, []);

  const matchedUsers = useMemo(
    () => [
      { id: 1, age: 26, location: '北海道', status: 'online' as const },
      { id: 2, age: 30, location: '東京', status: 'recent' as const },
      { id: 3, age: 22, location: '大阪', status: 'offline' as const },
      { id: 4, age: 28, location: '福岡', status: 'online' as const },
      { id: 5, age: 25, location: '沖縄', status: 'recent' as const }
    ],
    []
  );

  const users = useMemo(
    () => [
      {
        id: 1,
        age: 26,
        nickname: 'ユーザー1',
        location: '北海道',
        status: 'online' as const,
        lastMessage: 'こんにちは！お元気ですか？',
        lastMessagedAt: new Date('2024-06-20T10:30:00'),
        imageSource: require('@/assets/images/users/01.png')
      },
      {
        id: 2,
        age: 30,
        nickname: 'ユーザー2',
        location: '東京',
        status: 'recent' as const,
        lastMessage:
          'お久しぶりです！最近どうしていますか？今度お時間があるときにでもお話ししませんか？',
        lastMessagedAt: new Date('2024-06-19T14:20:00'),
        imageSource: require('@/assets/images/users/02.png')
      },
      {
        id: 3,
        age: 22,
        nickname: 'ユーザー3',
        location: '大阪',
        status: 'offline' as const,
        lastMessage: 'お元気ですか？',
        lastMessagedAt: new Date('2024-06-18T09:15:00'),
        imageSource: require('@/assets/images/users/03.png')
      },
      {
        id: 4,
        age: 28,
        nickname: 'ユーザー4',
        location: '福岡',
        status: 'online' as const,
        lastMessage: 'こんにちは！',
        lastMessagedAt: new Date('2024-06-20T10:30:00'),
        imageSource: require('@/assets/images/users/default-user.jpg')
      },
      {
        id: 5,
        age: 25,
        nickname: 'ユーザー5',
        location: '沖縄',
        status: 'recent' as const,
        lastMessage: 'また会いましょう！',
        lastMessagedAt: new Date('2024-06-19T14:20:00'),
        imageSource: require('@/assets/images/users/01.png')
      },
      {
        id: 6,
        age: 27,
        nickname: 'ユーザー6',
        location: '名古屋',
        status: 'online' as const,
        lastMessage: '今日はいい天気ですね',
        lastMessagedAt: new Date('2024-06-20T11:00:00'),
        imageSource: require('@/assets/images/users/02.png')
      },
      {
        id: 7,
        age: 23,
        nickname: 'ユーザー7',
        location: '神戸',
        status: 'offline' as const,
        lastMessage: 'お疲れ様でした',
        lastMessagedAt: new Date('2024-06-17T18:45:00'),
        imageSource: require('@/assets/images/users/03.png')
      },
      {
        id: 8,
        age: 29,
        nickname: 'ユーザー8',
        location: '横浜',
        status: 'recent' as const,
        lastMessage: '明日時間ありますか？',
        lastMessagedAt: new Date('2024-06-19T16:30:00'),
        imageSource: require('@/assets/images/users/default-user.jpg')
      },
      {
        id: 9,
        age: 24,
        nickname: 'ユーザー9',
        location: '札幌',
        status: 'online' as const,
        lastMessage: '趣味は何ですか？',
        lastMessagedAt: new Date('2024-06-20T12:15:00'),
        imageSource: require('@/assets/images/users/01.png')
      },
      {
        id: 10,
        age: 31,
        nickname: 'ユーザー10',
        location: '仙台',
        status: 'offline' as const,
        lastMessage: 'よろしくお願いします',
        lastMessagedAt: new Date('2024-06-16T08:00:00'),
        imageSource: require('@/assets/images/users/02.png')
      }
    ],
    []
  );

  // メッセージ一覧データに相対時間を追加
  const usersWithFormattedTime = useMemo(() => {
    const now = new Date();
    return users.map((user) => ({
      ...user,
      formattedTime: formatRelativeTime(user.lastMessagedAt, now)
    }));
  }, [users]);

  return (
    <TouchableWithoutFeedback onPress={handleBackgroundPress}>
      <View style={{ flex: 1 }}>
        <Container isPaddingTop={false}>
          {/* 新しいマッチング一覧 */}
          <Text className='text-m font-bold text-body'>マッチング中</Text>
          <View className='-mx-5 mt-3'>
            <FlashList
              data={matchedUsers}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              renderItem={({ item }) => (
                <MatchedUserCard
                  imageSource={require('@/assets/images/users/default-user.jpg')}
                  userId={item.id}
                  age={item.age}
                  location={item.location}
                  onlineStatus={item.status}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
          <View className='my-8 border-b border-gray-200' />

          {/* メッセージ一覧 */}
          <View className='-mx-5'>
            <FlashList
              data={usersWithFormattedTime}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <MessageThreadItem
                  imageSource={item.imageSource}
                  userId={item.id}
                  nickname={item.nickname}
                  age={item.age}
                  location={item.location}
                  onlineStatus={item.status}
                  lastMessage={item.lastMessage}
                  formattedTime={item.formattedTime}
                  isOpen={openSwipeableId === item.id}
                  hasOtherOpen={
                    openSwipeableId !== null && openSwipeableId !== item.id
                  }
                  onSwipeableWillOpen={() => handleSwipeableWillOpen(item.id)}
                  onSwipeableClose={handleSwipeableClose}
                  onOtherItemPress={handleBackgroundPress}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </Container>
      </View>
    </TouchableWithoutFeedback>
  );
}
