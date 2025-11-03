import { Container, Text } from '@/components/bases';
import { View } from 'react-native';
import { useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { Lists } from '@/components/modules';
import { ToggleSwitch } from '@/components/modules/ToggleSwitch/ToggleSwitch';

type NotificationSetting = {
  id: string;
  title: string;
  description?: string;
  enabled: boolean;
};

export default function NotificationSettings() {
  const [pushSettings, setPushSettings] = useState<NotificationSetting[]>([
    {
      id: 'like',
      title: 'いいねの通知',
      description: '相手からいいねをもらったときに通知します',
      enabled: true
    },
    {
      id: 'match',
      title: 'マッチングの通知',
      description: 'マッチングが成立したときに通知します',
      enabled: true
    },
    {
      id: 'message',
      title: 'メッセージの通知',
      description: '新しいメッセージを受信したときに通知します',
      enabled: true
    },
    {
      id: 'footprint',
      title: '足あとの通知',
      description: '相手があなたのプロフィールを見たときに通知します',
      enabled: false
    },
    {
      id: 'announcement',
      title: 'お知らせの通知',
      description: '運営からのお知らせを受け取ります',
      enabled: true
    }
  ]);

  const [emailSettings, setEmailSettings] = useState<NotificationSetting[]>([
    {
      id: 'email-like',
      title: 'いいねの通知',
      description: '相手からいいねをもらったときにメールで通知します',
      enabled: false
    },
    {
      id: 'email-match',
      title: 'マッチングの通知',
      description: 'マッチングが成立したときにメールで通知します',
      enabled: true
    },
    {
      id: 'email-message',
      title: 'メッセージの通知',
      description: '新しいメッセージを受信したときにメールで通知します',
      enabled: false
    },
    {
      id: 'email-footprint',
      title: '足あとの通知',
      description: '相手があなたのプロフィールを見たときにメールで通知します',
      enabled: false
    },
    {
      id: 'email-announcement',
      title: 'お知らせの通知',
      description: '運営からのお知らせをメールで受け取ります',
      enabled: true
    }
  ]);

  const togglePushSetting = (id: string) => {
    setPushSettings((prev) =>
      prev.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  const toggleEmailSetting = (id: string) => {
    setEmailSettings((prev) =>
      prev.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  return (
    <Container isPaddingTop={false} style='pb-10'>
      <View className='my-5'>
        <Text className='mb-3 text-xl font-bold text-body'>プッシュ通知</Text>
        <View className='-mx-5'>
          <FlashList
            data={pushSettings}
            renderItem={({ item, index }) => (
              <Lists
                key={item.id}
                title={item.title}
                description={item.description}
                isShowRightIcon={false}
                isShowBottomBorder={index < pushSettings.length - 1}
                rightComponent={
                  <ToggleSwitch
                    isEnabled={item.enabled}
                    onToggle={() => togglePushSetting(item.id)}
                  />
                }
              />
            )}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 12 }}
          />
        </View>
      </View>
      <View className='mb-5'>
        <Text className='mb-3 text-xl font-bold text-body'>
          メールアドレス通知
        </Text>
        <View className='-mx-5 bg-white'>
          <FlashList
            data={emailSettings}
            renderItem={({ item, index }) => (
              <Lists
                key={item.id}
                title={item.title}
                description={item.description}
                isShowRightIcon={false}
                isShowBottomBorder={index < emailSettings.length - 1}
                rightComponent={
                  <ToggleSwitch
                    isEnabled={item.enabled}
                    onToggle={() => toggleEmailSetting(item.id)}
                  />
                }
              />
            )}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 12 }}
          />
        </View>
      </View>
    </Container>
  );
}
