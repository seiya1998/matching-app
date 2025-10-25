import {
  MessageHeader,
  MessageBubble,
  MessageDateLabel,
  MessageInput
} from '@/features/messages/components';
import { router, useLocalSearchParams } from 'expo-router';
import {
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useMemo, useCallback, useState, useEffect } from 'react';
import {
  SafeAreaView,
  useSafeAreaInsets
} from 'react-native-safe-area-context';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

type MessageItem = {
  id: string;
  type: 'date' | 'message';
  date?: string;
  text?: string;
  isMine?: boolean;
  timestamp?: string;
};

export default function MessageDetail() {
  const insets = useSafeAreaInsets();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const params = useLocalSearchParams();
  const messageId =
    typeof params['messageId'] === 'string' ? params['messageId'] : '';

  // 右から左へスワイプで次の画面に遷移（右から左のアニメーション）
  const swipeGesture = Gesture.Pan()
    .activeOffsetX([-50, Infinity]) // 左方向（負の値）に50px以上スワイプで発火
    .failOffsetY([-20, 20]) // 垂直方向のスワイプを無視（スクロールを優先）
    .runOnJS(true) // JSスレッドで実行
    .onEnd((event) => {
      'worklet';
      if (event.velocityX < -500 || event.translationX < -100) {
        router.replace(`/(app)/(stack)/users/${messageId}`);
      }
    });

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const handleSendMessage = useCallback((message: string) => {
    console.log('送信:', message);
    // TODO: メッセージ送信処理を実装
  }, []);

  const handleCameraPress = useCallback(() => {
    console.log('カメラボタン押下');
    // TODO: カメラ処理を実装
  }, []);

  const rawMessages = useMemo(
    () => [
      {
        id: 1,
        text: 'こんにちは！',
        isMine: false,
        datetime: new Date('2024-10-01T10:30:00')
      },
      {
        id: 2,
        text: 'こんにちは！元気ですか？',
        isMine: true,
        datetime: new Date('2024-10-01T10:31:00')
      },
      {
        id: 3,
        text: '元気だよ！今日はいい天気だね',
        isMine: false,
        datetime: new Date('2024-10-02T10:32:00')
      },
      {
        id: 4,
        text: 'そうだね！散歩日和だよね',
        isMine: true,
        datetime: new Date('2024-10-02T10:33:00')
      },
      {
        id: 5,
        text: '週末は何か予定ある？',
        isMine: false,
        datetime: new Date('2024-10-02T14:35:00')
      },
      {
        id: 6,
        text: 'まだ特に決めてないけど、天気が良ければ外に出たいな',
        isMine: true,
        datetime: new Date('2024-10-03T10:36:00')
      },
      {
        id: 7,
        text: 'いいね！どこか行きたいところある？',
        isMine: false,
        datetime: new Date('2024-10-03T10:37:00')
      },
      {
        id: 8,
        text: '公園とかカフェとか...あなたは？',
        isMine: true,
        datetime: new Date('2024-10-03T15:38:00')
      }
    ],
    []
  );

  const messagesWithDateLabels = useMemo<MessageItem[]>(() => {
    const result: MessageItem[] = [];
    let lastDate = '';

    rawMessages.forEach((msg) => {
      const month = msg.datetime.getMonth() + 1;
      const day = msg.datetime.getDate();
      const weekday = msg.datetime.toLocaleDateString('ja-JP', {
        weekday: 'short'
      });
      const msgDate = `${month}/${day}（${weekday}）`;

      // 日付が変わったら日付ラベルを挿入
      if (msgDate !== lastDate) {
        result.push({
          id: `date-${msg.id}`,
          type: 'date',
          date: msgDate
        });
        lastDate = msgDate;
      }

      // メッセージを追加
      result.push({
        id: `msg-${msg.id}`,
        type: 'message',
        text: msg.text,
        isMine: msg.isMine,
        timestamp: msg.datetime.toLocaleTimeString('ja-JP', {
          hour: '2-digit',
          minute: '2-digit'
        })
      });
    });

    return result;
  }, [rawMessages]);

  // 初期スクロール位置を最後に設定
  const initialScrollIndex = useMemo(() => {
    return messagesWithDateLabels.length > 0
      ? messagesWithDateLabels.length - 1
      : 0;
  }, [messagesWithDateLabels.length]);

  return (
    <SafeAreaView className='flex-1 bg-white' edges={['left', 'right']}>
      <StatusBar barStyle='dark-content' />
      <GestureDetector gesture={swipeGesture}>
        <View style={{ flex: 1 }}>
          <KeyboardAvoidingView
            className='flex-1'
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={0}
          >
            <View className='flex-1'>
              <MessageHeader
                userName='aaaa'
                userImage={require('@/assets/images/users/default-user.jpg')}
                onImagePress={() => router.push('/(app)/(stack)/users/123')}
                onMenuPress={() => {
                  /* メニュー処理 */
                }}
                paddingTop={insets.top}
              />
              <FlashList
                data={messagesWithDateLabels}
                initialScrollIndex={initialScrollIndex}
                renderItem={({ item }) => {
                  if (item.type === 'date') {
                    return <MessageDateLabel date={item.date!} />;
                  }
                  return (
                    <MessageBubble
                      message={item.text!}
                      isMine={item.isMine!}
                      timestamp={item.timestamp}
                      userImage={
                        !item.isMine
                          ? require('@/assets/images/users/default-user.jpg')
                          : undefined
                      }
                    />
                  );
                }}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                  paddingTop: insets.top + 72,
                  paddingBottom: 100,
                  paddingHorizontal: 16
                }}
              />
              <View
                className='bg-white'
                style={{
                  paddingBottom: isKeyboardVisible ? 0 : insets.bottom,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: -2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 5
                }}
              >
                <MessageInput
                  onSend={handleSendMessage}
                  onCameraPress={handleCameraPress}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </GestureDetector>
    </SafeAreaView>
  );
}
