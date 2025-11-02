import { View } from 'react-native';
import { ImageCard, OnlineStatusIndicator } from '@/components/modules';
import { Text } from '@/components/bases';

type UserCardProps = {
  userId: string;
  nickname: string;
  age: number;
  location: string;
  onlineStatus: 'online' | 'offline';
  image: string | { uri: string } | number;
  onPress: () => void;
  index: number;
};

export const UserCard = ({
  age,
  location,
  onlineStatus,
  image,
  onPress,
  index
}: UserCardProps) => {
  return (
    <View
      className='w-1/2'
      style={{
        paddingLeft: index % 2 === 0 ? 20 : 8,
        paddingRight: index % 2 === 0 ? 8 : 20,
        paddingBottom: 16
      }}
    >
      <ImageCard image={image} onPress={onPress} size='medium' shadow={false}>
        <View className='flex-row items-center'>
          <OnlineStatusIndicator status={onlineStatus} size='large' />
          <Text className='ml-1 text-m text-body'>
            {age}歳 {location}
          </Text>
        </View>
      </ImageCard>
    </View>
  );
};
