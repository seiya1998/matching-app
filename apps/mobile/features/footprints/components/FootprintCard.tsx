import { View } from 'react-native';
import { ImageCard, OnlineStatusIndicator } from '@/components/modules';
import { Text, Button } from '@/components/bases';
import { formatRelativeTime } from '@/utils';
import { MaterialIcons } from '@expo/vector-icons';

type FootprintCardProps = {
  userId: string;
  nickname: string;
  age: number;
  location: string;
  onlineStatus: 'online' | 'offline';
  image: string | { uri: string } | number;
  onPress: () => void;
  onLikePress: () => void;
  visitedAt: Date | string;
};

export const FootprintCard = ({
  userId,
  nickname,
  age,
  location,
  onlineStatus,
  image,
  onPress,
  onLikePress,
  visitedAt
}: FootprintCardProps) => {
  return (
    <View className='px-5 pb-4'>
      {/* 時刻表示 */}
      <Text className='mb-3 text-s text-gray-600'>
        {formatRelativeTime(visitedAt)}
      </Text>

      {/* カード本体 */}
      <View className='overflow-hidden rounded-xl bg-white shadow-lg'>
        <ImageCard image={image} onPress={onPress} size='full' shadow={false} />

        {/* ユーザー情報セクション */}
        <View className='px-3'>
          <Text className='text-xxl font-semibold text-gray-900'>
            {nickname}
          </Text>
          <View className='flex-row items-center'>
            <OnlineStatusIndicator status={onlineStatus} size='large' />
            <Text className='ml-1 text-m text-body'>
              {age}歳 {location}
            </Text>
          </View>
        </View>

        {/* いいねボタン */}
        <View className='px-3 py-3'>
          <Button
            onPress={onLikePress}
            className='w-full flex-row items-center justify-center rounded-full bg-primary py-4'
          >
            <MaterialIcons name='thumb-up' size={24} color='white' />
            <Text className='ml-2 text-lg font-bold text-white'>いいね！</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};
