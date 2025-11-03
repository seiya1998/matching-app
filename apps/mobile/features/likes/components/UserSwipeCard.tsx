import { memo, useState, useCallback } from 'react';
import { View } from 'react-native';
import { Image, ImageSource } from 'expo-image';
import { Text, Button } from '@/components/bases';
import { cn } from '@/utils/classNames';
import { router } from 'expo-router';

type UserSwipeCardProps = {
  user: {
    id: string;
    nickname: string;
    age: number;
    location: string;
    onlineStatus: 'online' | 'offline';
    images: readonly ImageSource[];
    bio: string;
  };
  cardWidth: number;
  cardHeight?: number;
};

export const UserSwipeCard = memo<UserSwipeCardProps>(
  ({ user, cardWidth, cardHeight = 520 }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const imageList = user.images as ImageSource[];

    const handleThumbnailPress = useCallback((index: number) => {
      setActiveIndex(index);
    }, []);

    const handleCardPress = useCallback(() => {
      router.push(`/(app)/(stack)/users/${user.id}`);
    }, [user.id]);

    return (
      <Button
        onPress={handleCardPress}
        activeOpacity={1}
        className='overflow-hidden rounded-[20px] bg-white shadow-lg'
        style={{
          width: cardWidth,
          height: cardHeight
        }}
      >
        {/* メイン画像 */}
        <Image
          source={imageList[activeIndex]}
          style={{ width: '100%', height: '100%' }}
          contentFit='cover'
        />

        {/* サムネイル - ユーザー情報の上に配置 */}
        {imageList.length > 1 && (
          <View className='absolute bottom-[100px] left-0 right-0 flex-row justify-center gap-2 px-4'>
            {imageList.map((image, index) => (
              <Button
                key={index}
                onPress={() => handleThumbnailPress(index)}
                className={cn(
                  'overflow-hidden rounded-md border-2',
                  index === activeIndex ? 'border-white' : 'border-white/50'
                )}
                activeOpacity={1}
              >
                <Image
                  source={image}
                  style={{ width: 40, height: 60, borderRadius: 4 }}
                  contentFit='cover'
                  cachePolicy='memory-disk'
                />
              </Button>
            ))}
          </View>
        )}

        {/* ユーザー情報 - 画像の上に重ねて表示 */}
        <View className='absolute bottom-0 left-0 right-0 bg-gray-900/60 p-5'>
          <View className='mb-2 flex-row items-center'>
            <View
              className={cn(
                'h-3 w-3 rounded-full',
                user.onlineStatus === 'online' ? 'bg-green-500' : 'bg-gray-400'
              )}
            />
            <Text className='ml-2 text-2xl font-bold text-white'>
              {user.nickname}
            </Text>
            <Text className='ml-2 text-xl text-white'>{user.age}歳</Text>
            <Text className='ml-2 text-xl text-white'>{user.location}</Text>
          </View>
          <Text className='text-m text-white'>{user.bio}</Text>
        </View>
      </Button>
    );
  }
);

UserSwipeCard.displayName = 'UserSwipeCard';
