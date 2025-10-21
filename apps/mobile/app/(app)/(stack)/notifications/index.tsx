import { Container } from '@/components/bases';
import { router } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { Lists } from '@/components/modules';

export default function Notifications() {
  const notifications = [
    {
      id: '1',
      title: 'メンテナンスのお知らせ',
      description: '2025年10月25日 03:00',
      category: 'IMPORTANT'
    },
    {
      id: '2',
      title: '新機能リリースのお知らせ',
      description: '2025年10月20日 15:30',
      category: 'NOTIFICATION'
    },
    {
      id: '3',
      title: 'プロフィール写真の承認が完了しました',
      description: '2025年10月18日 10:15',
      category: 'NOTIFICATION'
    },
    {
      id: '4',
      title: '利用規約改定のお知らせ',
      description: '2025年10月15日 12:00',
      category: 'IMPORTANT'
    },
    {
      id: '5',
      title: 'マッチング率向上のヒント',
      description: '2025年10月12日 09:00',
      category: 'NOTIFICATION'
    },
    {
      id: '6',
      title: 'プレミアムプラン限定キャンペーン',
      description: '2025年10月10日 14:20',
      category: 'NOTIFICATION'
    },
    {
      id: '7',
      title: 'セキュリティアップデートのお知らせ',
      description: '2025年10月08日 11:45',
      category: 'IMPORTANT'
    },
    {
      id: '8',
      title: 'おすすめの相手をチェックしましょう',
      description: '2025年10月05日 16:30',
      category: 'NOTIFICATION'
    },
    {
      id: '9',
      title: 'プロフィール入力率が80%を超えました',
      description: '2025年10月03日 13:50',
      category: 'NOTIFICATION'
    },
    {
      id: '10',
      title: 'システムメンテナンス完了のお知らせ',
      description: '2025年10月01日 08:00',
      category: 'NOTIFICATION'
    }
  ] as const;

  return (
    <Container isPaddingTop={false} style='mt-5'>
      <FlashList
        data={notifications}
        renderItem={({ item, index }) => (
          <Lists
            key={item.id}
            title={item.title}
            isTitleBold={true}
            category={item.category}
            description={item.description}
            isShowRightIcon={true}
            isShowBottomBorder={index < (notifications.length ?? 0) - 1}
            onPress={() => router.push('/(app)/(tabs)/messages')}
          />
        )}
      />
    </Container>
  );
}
