import { Container, Text } from '@/components/bases';
import { MatchedUsersList } from '@/features/messages/components';
import { View } from 'react-native';

export default function Messages() {
  const users = [
    { id: 1, age: 26, location: '北海道', status: 'online' as const },
    { id: 2, age: 30, location: '東京', status: 'recent' as const },
    { id: 3, age: 22, location: '大阪', status: 'offline' as const },
    { id: 4, age: 28, location: '福岡', status: 'online' as const },
    { id: 5, age: 25, location: '沖縄', status: 'recent' as const }
  ];

  return (
    <Container>
      <Text className='text-center text-xl font-bold text-body'>
        メッセージ
      </Text>
      <View className='mt-3'>
        <Text className='text-m text-body'>マッチング中</Text>
        <MatchedUsersList users={users} />
      </View>
    </Container>
  );
}
