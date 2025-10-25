import { Button, Text } from '@/components/bases';
import { Camera } from '@/assets/svgs';
import { View, TextInput } from 'react-native';
import { memo, useState } from 'react';

interface MessageInputProps {
  onSend: (message: string) => void;
  onCameraPress: () => void;
}

export const MessageInput = memo<MessageInputProps>(
  ({ onSend, onCameraPress }) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
      if (message.trim()) {
        onSend(message.trim());
        setMessage('');
      }
    };

    return (
      <View className='mx-5 flex-row items-center gap-3 border-t border-gray-200 bg-white py-3'>
        <Button activeOpacity={0.7} onPress={onCameraPress}>
          <Camera width={24} height={24} fill='#6B7280' />
        </Button>
        <TextInput
          className='mx-5 flex-1 rounded-full border border-gray-300 bg-gray-50 text-base text-body'
          placeholder='メッセージを入力...'
          placeholderTextColor='#9CA3AF'
          value={message}
          onChangeText={setMessage}
          multiline={false}
          maxLength={500}
          returnKeyType='send'
          onSubmitEditing={handleSend}
          style={{ height: 40 }}
        />
        <Button
          activeOpacity={0.7}
          onPress={handleSend}
          disabled={!message.trim()}
        >
          <View
            className={`mx-5 rounded-full py-2 ${
              message.trim() ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          >
            <Text className='text-sm font-semibold text-white'>送信</Text>
          </View>
        </Button>
      </View>
    );
  }
);

MessageInput.displayName = 'MessageInput';
