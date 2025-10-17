import { Text } from '@/components/bases';
import { View } from 'react-native';
import { memo } from 'react';

interface MessageDateLabelProps {
  date: string;
}

export const MessageDateLabel = memo<MessageDateLabelProps>(({ date }) => {
  return (
    <View className='mb-4 mt-6 items-center'>
      <View className='rounded-full bg-gray-200 px-4 py-1'>
        <Text className='text-xs text-gray-600'>{date}</Text>
      </View>
    </View>
  );
});

MessageDateLabel.displayName = 'MessageDateLabel';
