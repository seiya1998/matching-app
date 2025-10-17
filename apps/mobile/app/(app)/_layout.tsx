import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: '',
        headerTitleAlign: 'center',
        headerTitleStyle: { fontSize: 17 },
        headerShadowVisible: false
      }}
    >
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen
        name='modal'
        options={{ presentation: 'modal', title: 'Modal' }}
      />
      <Stack.Screen
        name='(stack)/messages/[messageId]'
        options={{
          headerShown: false,
          animation: 'slide_from_bottom'
        }}
      />
    </Stack>
  );
}
