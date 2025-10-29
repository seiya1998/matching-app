import { Container, Text, ChoiceButton } from '@/components/bases';
import { router } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { Lists } from '@/components/modules';
import { View } from 'react-native';
import { useState } from 'react';

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

export default function Search() {
  const [isChecked, setChecked] = useState(false);
  return (
    <Container isPaddingTop={false} style='mt-5'>
      <View className='mb-5'>
        <Text className='mb-3 text-xl font-bold text-body'>
          プロフィールで絞り込み
        </Text>
        <ChoiceButton
          isChecked={isChecked}
          onValueChange={setChecked}
          text='写真あり'
        />
      </View>
    </Container>
  );
}
