import { router, Stack } from 'expo-router';
import { Button } from '@/components/bases';
import { ChevronBack } from '@/assets/svgs';
import { CloseButton } from '@/components/modules';

export default function SearchLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: { fontSize: 17 },
        headerShadowVisible: false,
        animation: 'slide_from_right',
        headerLeft: () => (
          <Button activeOpacity={0.7} onPress={() => router.back()}>
            <ChevronBack />
          </Button>
        )
      }}
    >
      <Stack.Screen
        name='index'
        options={{
          headerTitle: '検索条件',
          headerLeft: () => null,
          headerRight: () => <CloseButton onPress={() => router.back()} />
        }}
      />
      <Stack.Screen
        name='history'
        options={{
          headerTitle: '検索履歴から探す'
        }}
      />
    </Stack>
  );
}
