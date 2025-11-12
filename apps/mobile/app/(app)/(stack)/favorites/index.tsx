import { Container } from '@/components/bases';
import { router } from 'expo-router';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { UserCard } from '@/features/users/components';

const USERS = [
  {
    userId: '1',
    nickname: 'さくら',
    age: 26,
    location: '東京都',
    onlineStatus: 'online' as const,
    image: require('@/assets/images/users/01.png')
  },
  {
    userId: '2',
    nickname: 'ゆうき',
    age: 28,
    location: '神奈川県',
    onlineStatus: 'offline' as const,
    image: require('@/assets/images/users/02.png')
  },
  {
    userId: '3',
    nickname: 'あおい',
    age: 24,
    location: '大阪府',
    onlineStatus: 'online' as const,
    image: require('@/assets/images/users/03.png')
  },
  {
    userId: '4',
    nickname: 'はるか',
    age: 27,
    location: '千葉県',
    onlineStatus: 'offline' as const,
    image: require('@/assets/images/users/01.png')
  },
  {
    userId: '5',
    nickname: 'りょう',
    age: 25,
    location: '埼玉県',
    onlineStatus: 'online' as const,
    image: require('@/assets/images/users/02.png')
  },
  {
    userId: '6',
    nickname: 'みお',
    age: 29,
    location: '京都府',
    onlineStatus: 'offline' as const,
    image: require('@/assets/images/users/03.png')
  },
  {
    userId: '7',
    nickname: 'けんた',
    age: 26,
    location: '愛知県',
    onlineStatus: 'online' as const,
    image: require('@/assets/images/users/01.png')
  },
  {
    userId: '8',
    nickname: 'なな',
    age: 23,
    location: '福岡県',
    onlineStatus: 'offline' as const,
    image: require('@/assets/images/users/02.png')
  },
  {
    userId: '9',
    nickname: 'そら',
    age: 30,
    location: '北海道',
    onlineStatus: 'online' as const,
    image: require('@/assets/images/users/03.png')
  },
  {
    userId: '10',
    nickname: 'ひろ',
    age: 27,
    location: '兵庫県',
    onlineStatus: 'offline' as const,
    image: require('@/assets/images/users/01.png')
  }
] as const;

export default function Favorites() {
  return (
    <Container isPaddingTop={false} style='mb-20'>
      <View className='-mx-5'>
        <FlashList
          data={USERS}
          numColumns={2}
          contentContainerStyle={{ paddingTop: 30 }}
          renderItem={({ item, index }) => (
            <UserCard
              userId={item.userId}
              nickname={item.nickname}
              age={item.age}
              location={item.location}
              onlineStatus={item.onlineStatus}
              image={item.image}
              onPress={() => router.push(`/(app)/(stack)/users/${item.userId}`)}
              index={index}
            />
          )}
          keyExtractor={(item) => item.userId}
        />
      </View>
    </Container>
  );
}
