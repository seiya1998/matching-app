import { Container } from '@/components/bases';
import { router } from 'expo-router';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { FootprintCard } from '@/features/footprints/components';
import { useCallback } from 'react';

const FOOTPRINTS = [
  {
    userId: '1',
    nickname: 'さくら',
    age: 26,
    location: '東京都',
    onlineStatus: 'online' as const,
    image: require('@/assets/images/users/01.png'),
    visitedAt: new Date(Date.now() - 3600000) // 1時間前
  },
  {
    userId: '2',
    nickname: 'ゆうき',
    age: 28,
    location: '神奈川県',
    onlineStatus: 'offline' as const,
    image: require('@/assets/images/users/02.png'),
    visitedAt: new Date(Date.now() - 86400000) // 1日前
  },
  {
    userId: '3',
    nickname: 'あおい',
    age: 24,
    location: '大阪府',
    onlineStatus: 'online' as const,
    image: require('@/assets/images/users/03.png'),
    visitedAt: new Date(Date.now() - 1800000) // 30分前
  },
  {
    userId: '4',
    nickname: 'はるか',
    age: 27,
    location: '千葉県',
    onlineStatus: 'offline' as const,
    image: require('@/assets/images/users/01.png'),
    visitedAt: new Date(Date.now() - 2592000000) // 30日前
  },
  {
    userId: '5',
    nickname: 'りょう',
    age: 25,
    location: '埼玉県',
    onlineStatus: 'online' as const,
    image: require('@/assets/images/users/02.png'),
    visitedAt: new Date(Date.now() - 600000) // 10分前
  },
  {
    userId: '6',
    nickname: 'みお',
    age: 29,
    location: '京都府',
    onlineStatus: 'offline' as const,
    image: require('@/assets/images/users/03.png'),
    visitedAt: new Date(Date.now() - 172800000) // 2日前
  }
] as const;

export default function Footprints() {
  const handleLikePress = useCallback((userId: string) => {
    console.log('Liked user:', userId);
  }, []);

  return (
    <Container isPaddingTop={false} style='mb-20'>
      <View className='-mx-5'>
        <FlashList
          data={FOOTPRINTS}
          numColumns={1}
          contentContainerStyle={{ paddingTop: 30 }}
          renderItem={({ item }) => (
            <FootprintCard
              userId={item.userId}
              nickname={item.nickname}
              age={item.age}
              location={item.location}
              onlineStatus={item.onlineStatus}
              image={item.image}
              onPress={() => router.push(`/(app)/(stack)/users/${item.userId}`)}
              onLikePress={() => handleLikePress(item.userId)}
              visitedAt={item.visitedAt}
            />
          )}
          keyExtractor={(item) => item.userId}
        />
      </View>
    </Container>
  );
}
