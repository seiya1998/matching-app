import { Button, Text } from '@/components/bases';
import { ChevronBack, MoreVertical } from '@/assets/svgs';
import { View, Image, ImageSourcePropType } from 'react-native';
import { memo } from 'react';
import { router } from 'expo-router';

interface MessageHeaderProps {
  userName: string;
  userImage: ImageSourcePropType;
  onImagePress?: (() => void) | null;
  onMenuPress: () => void;
  paddingTop?: number;
}

export const MessageHeader = memo<MessageHeaderProps>(
  ({ userName, userImage, onImagePress, onMenuPress, paddingTop = 0 }) => {
    return (
      <View
        className='absolute left-0 right-0 top-0 z-10 flex-row items-center bg-white px-4 pb-3'
        style={{ paddingTop: paddingTop + 12 }}
      >
        <View className='flex-row items-center gap-3'>
          <Button activeOpacity={0.7} onPress={() => router.back()}>
            <ChevronBack />
          </Button>
          {onImagePress ? (
            <Button activeOpacity={1} onPress={onImagePress}>
              <Image source={userImage} className='h-10 w-10 rounded-full' />
            </Button>
          ) : (
            <Image source={userImage} className='h-10 w-10 rounded-full' />
          )}
          <Text className='text-xl font-bold text-body'>{userName}</Text>
        </View>
        <View className='ml-auto'>
          <Button activeOpacity={0.7} onPress={onMenuPress}>
            <MoreVertical width={24} height={24} />
          </Button>
        </View>
      </View>
    );
  }
);

MessageHeader.displayName = 'MessageHeader';
