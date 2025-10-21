import { Container, Text } from '@/components/bases';

export default function NotificationDetail() {
  return (
    <Container isPaddingTop={false} style='mt-5'>
      <Text className='text-xl font-bold text-body'>Notification Detail</Text>
      <Text className='mt-1 text-m text-description'>2025年1月15日</Text>
      <Text className='mb-20 mt-6 text-m text-body'>
        これはお知らせの詳細内容が表示される画面です。ここにお知らせの本文が入ります。
        ユーザーはこの画面でお知らせの内容を確認できます。
      </Text>
    </Container>
  );
}
