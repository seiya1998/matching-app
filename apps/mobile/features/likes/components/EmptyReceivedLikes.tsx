import { memo } from 'react';
import { View } from 'react-native';
import { Text } from '@/components/bases';
import { EvilIcons } from '@expo/vector-icons';

type EmptyReceivedLikesProps = {
  cardWidth: number;
  cardHeight?: number;
};

export const EmptyReceivedLikes = memo<EmptyReceivedLikesProps>(
  ({ cardWidth, cardHeight = 520 }) => {
    return (
      <View
        className='items-center justify-center px-5'
        style={{
          width: cardWidth,
          height: cardHeight
        }}
      >
        <EvilIcons name='like' size={80} color='#9CA3AF' />
        <Text className='mt-10 text-xl font-bold text-body'>
          もらった「いいね！」はありません
        </Text>
        <Text className='mt-4 text-center text-l text-description'>
          気になる相手に「いいね！」を送ってみましょう！
        </Text>
      </View>
    );
  }
);

EmptyReceivedLikes.displayName = 'EmptyReceivedLikes';
