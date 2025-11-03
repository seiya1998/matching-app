import { Container, Text } from '@/components/bases';
import { router } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { Lists } from '@/components/modules';
import { View } from 'react-native';

const settings = [
  {
    title: '通知設定',
    path: '/(app)/(stack)/settings/notification'
  },
  {
    title: '足あと設定',
    path: '/(app)/(stack)/settings/footprints'
  },
  {
    title: 'プライベートモード設定',
    path: '/(app)/(stack)/settings/private'
  },
  {
    title: '有料会員の解約',
    path: '/(app)/(stack)/settings/premium'
  }
] as const;

const blockedSettings = [
  {
    title: '非表示リスト',
    path: '/(app)/(stack)/hidden-users'
  },
  {
    title: 'ブロックリスト',
    path: '/(app)/(stack)/blocked-users'
  }
] as const;

const supportSettings = [
  {
    title: 'ヘルプ・お問い合わせ',
    path: '/(app)/(stack)/help'
  },
  {
    title: '利用規約',
    path: '/(app)/(stack)/terms'
  },
  {
    title: 'プライバシーポリシー',
    path: '/(app)/(stack)/privacy'
  },
  {
    title: 'ログアウト',
    path: '/(app)/(stack)/logout'
  },
  {
    title: 'miraiを退会する',
    path: '/(app)/(stack)/delete-account'
  }
] as const;

export default function Settings() {
  return (
    <Container isPaddingTop={false} style='bg-gray-100'>
      <View className='my-5'>
        <Text className='mb-3 text-xl font-bold text-body'>各種設定</Text>
        <View className='-mx-5 bg-white'>
          <FlashList
            data={settings}
            renderItem={({ item, index }) => (
              <Lists
                key={`settings-${String(index) + 1}`}
                title={item.title}
                isShowRightIcon={true}
                isShowBottomBorder={index < (settings.length ?? 0) - 1}
                onPress={() => router.push(item.path as any)}
              />
            )}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 12 }}
          />
        </View>
      </View>
      <View className='mb-5'>
        <Text className='mb-3 text-xl font-bold text-body'>
          非表示・ブロック設定
        </Text>
        <View className='-mx-5 bg-white'>
          <FlashList
            data={blockedSettings}
            renderItem={({ item, index }) => (
              <Lists
                key={`blocked-settings-${String(index) + 1}`}
                title={item.title}
                isShowRightIcon={true}
                isShowBottomBorder={index < (blockedSettings.length ?? 0) - 1}
                onPress={() => router.push(item.path as any)}
              />
            )}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 12 }}
          />
        </View>
      </View>
      <View className='mb-5'>
        <Text className='mb-3 text-xl font-bold text-body'>サポート</Text>
        <View className='-mx-5 bg-white'>
          <FlashList
            data={supportSettings}
            renderItem={({ item, index }) => (
              <Lists
                key={`support-settings-${String(index) + 1}`}
                title={item.title}
                isShowRightIcon={true}
                isShowBottomBorder={index < (supportSettings.length ?? 0) - 1}
                onPress={() => router.push(item.path as any)}
              />
            )}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 12 }}
          />
        </View>
      </View>
    </Container>
  );
}
