import { Container, Text } from '@/components/bases';
import { router } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { Lists } from '@/components/modules';
import { View, Image } from 'react-native';

export default function Mypages() {
  const contents = [
    {
      leftIconType: 'footprint',
      title: '足あと',
      path: '/likes'
    },
    {
      leftIconType: 'notification',
      title: 'お知らせ',
      path: '/likes'
    },
    {
      leftIconType: 'star',
      title: 'お気に入り',
      path: '/likes'
    },
    {
      leftIconType: 'like',
      title: 'いいね！履歴',
      path: '/likes'
    },
    {
      leftIconType: 'help',
      title: 'ヘルプ・お問い合わせ',
      path: '/likes'
    },
    {
      leftIconType: 'setting',
      title: '各種設定',
      path: '/likes'
    }
  ] as const;

  return (
    <Container isPaddingTop={false} style='mt-5'>
      <View>
        <Image
          source={require('@/assets/images/users/default-user.jpg')}
          className='h-32 w-32 self-center rounded-full'
        />
      </View>
      <View className='mt-6 flex-row items-center justify-center gap-4'>
        <Text className='text-[20px] font-bold text-body'>ssy</Text>
        <Text className='text-m text-description'>23歳 北海道</Text>
      </View>
      <View className='mt-6 flex-row justify-around'>
        <View>
          <Text className='mb-2 text-center text-body'>残いいね！</Text>
          <Text className='text-center text-[25px] font-bold text-description'>
            150
          </Text>
        </View>
        <View>
          <Text className='mb-3 text-center text-body'>会員ステータス</Text>
          <Text className='text-center text-[18px] font-bold text-description'>
            有料会員
          </Text>
        </View>
      </View>
      <View className='mt-6'>
        <FlashList
          data={contents}
          renderItem={({ item, index }) => (
            <Lists
              key={`contens-${String(index) + 1}`}
              leftIconType={item.leftIconType}
              title={item.title}
              isShowBottomBorder={false}
              isShowRightIcon={true}
              onPress={() => router.push(item.path)}
            />
          )}
        />
      </View>
    </Container>
  );
}
