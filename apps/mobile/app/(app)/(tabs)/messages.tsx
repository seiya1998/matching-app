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
      {
        id: 1,
        age: 26,
        location: '北海道',
        status: 'online' as const,
        imageSource: require('@/assets/images/users/01.png')
      },
      {
        id: 2,
        age: 30,
        location: '東京',
        status: 'recent' as const,
        imageSource: require('@/assets/images/users/sample-cat.png')
      },
      {
        id: 3,
        age: 22,
        location: '大阪',
        status: 'offline' as const,
        imageSource: require('@/assets/images/users/02.png')
      },
      {
        id: 4,
        age: 28,
        location: '福岡',
        status: 'online' as const,
        imageSource: require('@/assets/images/users/sample-dog.png')
      },
      {
        id: 5,
        age: 25,
        location: '沖縄',
        status: 'recent' as const,
        imageSource: require('@/assets/images/users/03.png')
      }
    ],
    []
  );

  const users = useMemo(
    () => [
      {
        id: 1,
        age: 26,
        nickname: 'さくら',
        location: '北海道',
        status: 'online' as const,
        lastMessage: 'おはようございます☀️今日はいい天気ですね！',
        lastMessagedAt: new Date(Date.now() - 5 * 60 * 1000), // 5分前
        imageSource: require('@/assets/images/users/01.png')
      },
      {
        id: 2,
        age: 30,
        nickname: 'ゆうき',
        location: '東京',
        status: 'recent' as const,
        lastMessage: 'カフェ好きなんですね！今度一緒に行きませんか？😊',
        lastMessagedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2時間前
        imageSource: require('@/assets/images/users/sample-cat.png')
      },
      {
        id: 3,
        age: 22,
        nickname: 'あいり',
        location: '大阪',
        status: 'offline' as const,
        lastMessage: 'プロフィール見ました！趣味が合いそうですね✨',
        lastMessagedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1日前
        imageSource: require('@/assets/images/users/02.png')
      },
      {
        id: 4,
        age: 28,
        nickname: 'けんた',
        location: '福岡',
        status: 'online' as const,
        lastMessage: 'いいねありがとうございます！',
        lastMessagedAt: new Date(Date.now() - 30 * 60 * 1000), // 30分前
        imageSource: require('@/assets/images/users/sample-dog.png')
      },
      {
        id: 5,
        age: 25,
        nickname: 'まな',
        location: '沖縄',
        status: 'recent' as const,
        lastMessage: 'そうなんですね！私も映画好きです🎬',
        lastMessagedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6時間前
        imageSource: require('@/assets/images/users/03.png')
      },
      {
        id: 6,
        age: 27,
        nickname: 'ゆうた',
        location: '名古屋',
        status: 'online' as const,
        lastMessage: '週末は何してますか？',
        lastMessagedAt: new Date(Date.now() - 10 * 60 * 1000), // 10分前
        imageSource: require('@/assets/images/users/default-user.jpg')
      },
      {
        id: 7,
        age: 23,
        nickname: 'みお',
        location: '神戸',
        status: 'offline' as const,
        lastMessage: 'ありがとうございます😊またお話しましょう！',
        lastMessagedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3日前
        imageSource: require('@/assets/images/users/01.png')
      },
      {
        id: 8,
        age: 29,
        nickname: 'りょう',
        location: '横浜',
        status: 'recent' as const,
        lastMessage: 'よろしくお願いします！',
        lastMessagedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12時間前
        imageSource: require('@/assets/images/users/02.png')
      },
      {
        id: 9,
        age: 24,
        nickname: 'なな',
        location: '札幌',
        status: 'online' as const,
        lastMessage: 'マッチングありがとうございます💕',
        lastMessagedAt: new Date(Date.now() - 15 * 60 * 1000), // 15分前
        imageSource: require('@/assets/images/users/03.png')
      },
      {
        id: 10,
        age: 31,
        nickname: 'だいき',
        location: '仙台',
        status: 'offline' as const,
        lastMessage: 'お話できて楽しかったです！',
        lastMessagedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2日前
        imageSource: require('@/assets/images/users/default-user.jpg')
      }
    ],
    []
  );

  // メッセージ一覧データに相対時間を追加し、最新順にソート
  const usersWithFormattedTime = useMemo(() => {
    const now = new Date();
    return users
      .map((user) => ({
        ...user,
        formattedTime: formatRelativeTime(user.lastMessagedAt, now)
      }))
      .sort((a, b) => b.lastMessagedAt.getTime() - a.lastMessagedAt.getTime());
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
                  imageSource={item.imageSource}
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
