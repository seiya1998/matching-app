import { Platform, StyleSheet, View } from 'react-native';
import { ImageCard, OnlineStatusIndicator } from '@/components/modules';
import { HomeHeader } from '@/features/home/components';
import { Text, Button, ScreenWrapper } from '@/components/bases';
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useMemo } from 'react';

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

type SortType = 'newest' | 'login' | 'popular';

export default function Home() {
  const [sortType, setSortType] = useState<SortType>('newest');

  const sortedUsers = useMemo(() => {
    const users = [...USERS];
    // TODO: 実際のソートロジックを実装
    // 現状はそのまま返す
    return users;
  }, [sortType]);

  const handleSortPress = () => {
    // TODO: ソートモーダルを表示
    console.log('ソートボタン押下');
  };

  return (
    <ScreenWrapper
      header={
        <HomeHeader
          onSortPress={handleSortPress}
          onFilterPress={() => router.push('/search')}
        />
      }
      bounces={true}
      isPaddingTop={true}
    >
      {/* 検索結果人数 */}
      <View className='mb-5 mt-[70px] border-b border-gray-100 bg-gray-50 px-5 py-4'>
        <View className='flex-row items-center gap-2'>
          <Ionicons name='people-outline' size={20} color='#666' />
          <Text className='text-base text-gray-700'>
            <Text className='font-semibold text-gray-900'>
              {sortedUsers.length}人
            </Text>
            のお相手が見つかりました
          </Text>
        </View>
      </View>

      <FlashList
        data={sortedUsers}
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
              onPress={() => router.push(`/(app)/(stack)/users/${item.userId}`)}
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
    </ScreenWrapper>
  );
}
