import { MessageHeader } from '@/features/messages/components';
import { UserImageGallery, StatusItem } from '@/features/users/components';
import { useLocalSearchParams } from 'expo-router';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets
} from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Text } from '@/components/bases';
import { OnlineStatusIndicator } from '@/components/modules';
import { MaterialIcons } from '@expo/vector-icons';

const images = [
  require('@/assets/images/users/default-user.jpg'),
  require('@/assets/images/users/03.png'),
  require('@/assets/images/users/01.png'),
  require('@/assets/images/users/02.png')
];

export default function UserProfile() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const userId = typeof params['userId'] === 'string' ? params['userId'] : '';

  return (
    <SafeAreaView className='flex-1 bg-white' edges={['left', 'right']}>
      <StatusBar style='dark' />

      {/* ヘッダー (固定位置) */}
      <MessageHeader
        userName='aaaa'
        userImage={require('@/assets/images/users/default-user.jpg')}
        onMenuPress={() => {
          /* メニュー処理 */
        }}
        paddingTop={insets.top}
      />

      <KeyboardAvoidingView
        className='flex-1'
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          className='flex-1'
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          {/* ユーザーの画像ギャラリー */}
          <UserImageGallery images={images} />

          {/* コンテンツエリア */}
          <View className='px-4'>
            {/* ユーザー名やステータス */}
            <View className='mb-10 mt-6 border-b-2 border-gray-200 pb-6'>
              <Text className='text-xxl font-bold text-body'>aaaa</Text>
              <Text className='text-m text-body'>26歳 北海道</Text>
              <View className='mt-2 flex-row items-center space-x-4'>
                {/* オンラインステータス */}
                <StatusItem label='オンライン'>
                  <OnlineStatusIndicator status='online' size='large' />
                </StatusItem>

                {/* 本人確認ステータス */}
                <StatusItem className='ml-5' label='本人確認済'>
                  <MaterialIcons name='verified' size={20} color='#4CAF50' />
                </StatusItem>

                {/* いいね数 */}
                <StatusItem className='ml-5' label='128 いいね！'>
                  <MaterialIcons name='thumb-up' size={18} color='#4a90e2' />
                </StatusItem>
              </View>
            </View>

            {/* 自己紹介 */}
            <View className='mb-10'>
              <Text className='mb-3 text-xxl font-semibold text-body'>
                自己紹介
              </Text>
              <Text className='text-m leading-6 text-body'>
                はじめまして！プロフィールを見ていただきありがとうございます😊
                {'\n\n'}
                札幌でIT関係の仕事をしている26歳です。リモートワークが多いので、よくカフェで作業してます☕️
                最近はプログラミングの勉強に夢中で、新しい技術を学ぶのが楽しくて仕方ありません！
                {'\n\n'}
                【趣味・好きなこと】{'\n'}◆
                カフェ巡り｜美味しいコーヒーを求めて色んなお店を開拓中です{'\n'}
                ◆ 映画鑑賞｜アクションからヒューマンドラマまで幅広く観ます{'\n'}
                ◆ スノーボード｜冬は毎週末ゲレンデにいます⛷{'\n'}◆
                温泉巡り｜北海道の秘湯を制覇するのが目標です♨️{'\n'}◆
                料理｜最近はパスタ作りにハマってます🍝{'\n'}◆
                ドライブ｜天気の良い日は海沿いをドライブするのが好きです{'\n\n'}
                【性格】{'\n'}
                友達からは「話しやすい」「一緒にいて楽」と言われることが多いです。
                基本的にはインドアですが、アクティブな一面もあります。
                好奇心旺盛で、新しいことにチャレンジするのが好きな性格です！
                {'\n\n'}
                【お相手に求めること】{'\n'}
                ・一緒にいて自然体でいられる方{'\n'}
                ・お互いの趣味や価値観を尊重できる方{'\n'}
                ・美味しいものを一緒に楽しめる方{'\n\n'}
                【理想のデート】{'\n'}
                美味しいものを食べに行ったり、のんびりカフェでお話ししたり、
                時には一緒にアクティビティを楽しんだり...
                その時々で色んなデートを楽しめたらいいなと思っています💫{'\n\n'}
                まずはメッセージでお話しして、お互いのことを知っていけたら嬉しいです。
                気軽にいいねしてください！よろしくお願いします✨
              </Text>
            </View>

            {/* プロフィール */}
            <View className='mb-10'>
              <Text className='mb-3 text-xxl font-semibold text-body'>
                プロフィール
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
