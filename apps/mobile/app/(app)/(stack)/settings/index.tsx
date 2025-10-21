import { Container, Text } from '@/components/bases';
import { router } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { Lists } from '@/components/modules';
import { View } from 'react-native';

const settings = [
  {
    title: '通知設定',
    path: '/settings/notification'
  },
  {
    title: '足あと設定',
    path: '/settings/footprints'
  },
  {
    title: 'プライベートモード設定',
    path: '/settings/private'
  },
  {
    title: '有料会員の解約',
    path: '/settings/premium'
  }
] as const;

const blockedSettings = [
  {
    title: '非表示リスト',
    path: '/hidden-users'
  },
  {
    title: 'ブロックリスト',
    path: '/blocked-users'
  }
] as const;

const supportSettings = [
  {
    title: 'ヘルプ・お問い合わせ',
    path: '/help'
  },
  {
    title: '利用規約',
    path: '/terms'
  },
  {
    title: 'プライバシーポリシー',
    path: '/privacy'
  },
  {
    title: 'ログアウト',
    path: '/logout'
  },
  {
    title: 'miraiを退会する',
    path: '/delete-account'
  }
] as const;

export default function Settings() {
  return (
    <Container isPaddingTop={false} style='mt-5'>
      <View className='mb-5'>
        <Text className='mb-3 text-xl font-bold text-body'>各種設定</Text>
        <FlashList
          data={settings}
          renderItem={({ item, index }) => (
            <Lists
              key={`settings-${String(index) + 1}`}
              title={item.title}
              isShowRightIcon={true}
              isShowBottomBorder={index < (settings.length ?? 0) - 1}
              onPress={() => router.push(`/(app)/(stack)/notifications`)}
            />
          )}
        />
      </View>
      <View className='mb-5'>
        <Text className='mb-3 text-xl font-bold text-body'>
          非表示・ブロック設定
        </Text>
        <FlashList
          data={blockedSettings}
          renderItem={({ item, index }) => (
            <Lists
              key={`blocked-settings-${String(index) + 1}`}
              title={item.title}
              isShowRightIcon={true}
              isShowBottomBorder={index < (blockedSettings.length ?? 0) - 1}
              onPress={() => router.push(`/(app)/(stack)/notifications`)}
            />
          )}
        />
      </View>
      <Text className='mb-3 text-xl font-bold text-body'>サポート</Text>
      <FlashList
        data={supportSettings}
        renderItem={({ item, index }) => (
          <Lists
            key={`support-settings-${String(index) + 1}`}
            title={item.title}
            isShowRightIcon={true}
            isShowBottomBorder={index < (supportSettings.length ?? 0) - 1}
            onPress={() => router.push(`/(app)/(stack)/notifications`)}
          />
        )}
      />
    </Container>
  );
}
