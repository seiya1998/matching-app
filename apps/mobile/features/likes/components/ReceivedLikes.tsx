import { View } from 'react-native';
import { Text, ChoiceButton } from '@/components/bases';

export const ReceivedLikes = () => {
  return (
    <View className='mt-5 px-5'>
      <Text className='mb-3 ml-1 text-l font-bold text-body'>
        相手からのいいね一覧
      </Text>
    </View>
  );
};
