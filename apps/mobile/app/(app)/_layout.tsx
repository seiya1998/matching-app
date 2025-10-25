import { router, Stack } from 'expo-router';
import { Button } from '@/components/bases';
import { ChevronBack } from '@/assets/svgs';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: '',
        headerTitleAlign: 'center',
        headerTitleStyle: { fontSize: 17 },
        headerShadowVisible: false,
        headerLeft: () => {
          return (
            <Button activeOpacity={0.7} onPress={() => router.back()}>
              <ChevronBack />
            </Button>
          );
        }
      }}
    >
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen
        name='(stack)/messages/[messageId]'
        options={{
          headerShown: false,
          animation: 'slide_from_right'
        }}
      />
      <Stack.Screen
        name='(stack)/users/[userId]'
        options={{
          headerShown: false,
          animation: 'slide_from_right'
        }}
      />
      <Stack.Screen
        name='(stack)/settings/index'
        options={{
          headerTitle: '設定'
        }}
      />
      <Stack.Screen
        name='(stack)/notifications/index'
        options={{
          headerTitle: 'お知らせ'
        }}
      />
      <Stack.Screen
        name='(stack)/notifications/[notificationId]'
        options={{
          headerTitle: 'お知らせ'
        }}
      />
    </Stack>
  );
}
