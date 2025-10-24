import { MessageHeader } from '@/features/messages/components';
import { UserImageGallery } from '@/features/users/components';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar, KeyboardAvoidingView, Platform, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets
} from 'react-native-safe-area-context';

const images = [
  require('@/assets/images/users/01.png'),
  require('@/assets/images/users/02.png'),
  require('@/assets/images/users/03.png')
];

export default function UserProfile() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const userId = typeof params['userId'] === 'string' ? params['userId'] : '';

  return (
    <SafeAreaView className='flex-1 bg-white' edges={['left', 'right']}>
      <StatusBar barStyle='dark-content' />
      <KeyboardAvoidingView
        className='flex-1'
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <MessageHeader
          userName='aaaa'
          userImage={require('@/assets/images/users/default-user.jpg')}
          onMenuPress={() => {
            /* メニュー処理 */
          }}
          paddingTop={insets.top}
        />

        <UserImageGallery images={images} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
