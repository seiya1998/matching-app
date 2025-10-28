import {
  Platform,
  StyleSheet,
  View,
  StatusBar,
  ScrollView
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets
} from 'react-native-safe-area-context';
import { ImageCard, OnlineStatusIndicator } from '@/components/modules';
import { HomeHeader } from '@/features/home/components';
import { Text, Button } from '@/components/bases';
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';

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

export default function Home() {
  const insets = useSafeAreaInsets();
  const headerHeight = insets.top + 64; // ヘッダーの固定高さ
  return (
    <SafeAreaView className='flex-1 bg-white' edges={['left', 'right']}>
      <StatusBar barStyle='dark-content' />
      <View style={{ flex: 1 }}>
        <HomeHeader />
        <ScrollView
          bounces={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: headerHeight }}
        >
          <FlashList
            data={USERS}
            numColumns={2}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <View
                className='w-1/2'
                style={{
                  paddingLeft: index % 2 === 0 ? 20 : 8,
                  paddingRight: index % 2 === 0 ? 8 : 20,
                  paddingBottom: 16
                }}
              >
                <ImageCard
                  image={item.image}
                  title={item.nickname}
                  onPress={() => router.push(`/users/${item.userId}`)}
                  size='medium'
                  shadow={false}
                >
                  <View className='flex-row items-center'>
                    <OnlineStatusIndicator
                      status={item.onlineStatus}
                      size='large'
                    />
                    <Text className='ml-1 text-m text-body'>
                      {item.age}歳 {item.location}
                    </Text>
                  </View>
                </ImageCard>
              </View>
            )}
            keyExtractor={(item) => item.userId}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
