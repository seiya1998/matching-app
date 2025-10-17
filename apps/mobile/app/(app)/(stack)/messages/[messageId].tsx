import { Text } from '@/components/bases';
import { MessageHeader } from '@/features/messages/components';
import { router } from 'expo-router';
import { View, StatusBar } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useMemo } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MessageDetail() {
  const insets = useSafeAreaInsets();
  const dummyMessages = useMemo(
    () => Array.from({ length: 20 }, (_, i) => ({ id: i, text: `メッセージ ${i + 1}` })),
    []
  );

  return (
    <SafeAreaView className='flex-1 bg-white' edges={['left', 'right']}>
      <StatusBar barStyle='dark-content' />
      <View className='flex-1'>
        <MessageHeader
          userName='aaaa'
          userImage={require('@/assets/images/users/default-user.jpg')}
          onBack={() => router.back()}
          onMenuPress={() => {
            /* メニュー処理 */
          }}
          paddingTop={insets.top}
        />
        <FlashList
          data={dummyMessages}
          renderItem={({ item }) => (
            <View className='mx-4 rounded-lg bg-gray-100 p-3'>
              <Text className='text-body'>{item.text}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingTop: insets.top + 72, paddingBottom: 16 }}
          ItemSeparatorComponent={() => <View className='h-4' />}
        />
      </View>
    </SafeAreaView>
  );
}
