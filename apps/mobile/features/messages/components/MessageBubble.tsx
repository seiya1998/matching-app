import { Text } from '@/components/bases';
import { View, Image, ImageSourcePropType } from 'react-native';
import { memo } from 'react';

interface MessageBubbleProps {
  message: string;
  isMine: boolean;
  timestamp?: string;
  userImage?: ImageSourcePropType;
}

export const MessageBubble = memo<MessageBubbleProps>(
  ({ message, isMine, timestamp, userImage }) => {
    return (
      <View
        className={`mb-3 flex-row ${isMine ? 'justify-end' : 'justify-start'}`}
      >
        {!isMine && userImage && (
          <Image source={userImage} className='mr-2 h-8 w-8 rounded-full' />
        )}
        <View className='max-w-[75%]'>
          <View
            className={`rounded-2xl px-4 py-3 ${
              isMine ? 'bg-primary' : 'bg-gray-200'
            }`}
          >
            <Text className={`text-m ${isMine ? 'text-white' : 'text-body'}`}>
              {message}
            </Text>
          </View>
          {timestamp && (
            <Text
              className={`mt-1 text-xs text-gray-500 ${isMine ? 'text-right' : 'text-left'}`}
            >
              {timestamp}
            </Text>
          )}
        </View>
      </View>
    );
  }
);

MessageBubble.displayName = 'MessageBubble';
