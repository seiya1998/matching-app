import { MessageHeader } from '@/features/messages/components';
import { UserImageGallery, StatusItem } from '@/features/users/components';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import {
  useSafeAreaInsets
} from 'react-native-safe-area-context';
import { Text, Button, ScreenWrapper } from '@/components/bases';
import { OnlineStatusIndicator, Lists, ImageCard } from '@/components/modules';
import { MaterialIcons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';

// 静的データをコンポーネント外に移動（メモリ効率とレンダリングパフォーマンスの改善）
const IMAGES = [
  require('@/assets/images/users/default-user.jpg'),
  require('@/assets/images/users/03.png'),
  require('@/assets/images/users/01.png'),
  require('@/assets/images/users/02.png'),
  require('@/assets/images/users/01.png')
] as const;

const PREFERENCE_TAGS = [
  {
    id: '1',
    title: '映画鑑賞',
    image: require('@/assets/images/users/01.png'),
    category: 'entertainment'
  },
  {
    id: '2',
    title: 'カフェ巡り',
    image: require('@/assets/images/users/02.png'),
    category: 'food'
  },
  {
    id: '3',
    title: 'スポーツ',
    image: require('@/assets/images/users/03.png'),
    category: 'activity'
  },
  {
    id: '4',
    title: '料理',
    image: require('@/assets/images/users/01.png'),
    category: 'hobby'
  },
  {
    id: '5',
    title: '旅行',
    image: require('@/assets/images/users/02.png'),
    category: 'lifestyle'
  },
  {
    id: '6',
    title: 'ヨガ',
    image: require('@/assets/images/users/03.png'),
    category: 'health'
  },
  {
    id: '7',
    title: '読書',
    image: require('@/assets/images/users/01.png'),
    category: 'hobby'
  },
  {
    id: '8',
    title: 'ゲーム',
    image: require('@/assets/images/users/02.png'),
    category: 'entertainment'
  },
  {
    id: '9',
    title: 'アウトドア',
    image: require('@/assets/images/users/03.png'),
    category: 'activity'
  },
  {
    id: '10',
    title: '音楽',
    image: require('@/assets/images/users/01.png'),
    category: 'entertainment'
  }
] as const;

// 動的に取得される想定のプロフィールデータ（モックデータ）
const MOCK_PROFILE_LIST = [
  { label: 'ニックネーム', value: 'aaaa' },
  { label: '年齢', value: '26歳' },
  { label: '居住地(都道府県)', value: '北海道' },
  { label: '居住地(市区町村)', value: '札幌市' },
  { label: '勤務地', value: '北海道' },
  { label: '出身地', value: '北海道' },
  { label: '血液型', value: 'A型' },
  { label: '兄弟姉妹', value: '長男/長女' },
  { label: '話せる言語', value: '日本語、英語' },
  { label: '学歴', value: '大学卒' },
  { label: '職種', value: 'IT関連' },
  { label: '年収', value: '400~600万円' },
  { label: '休日', value: '土日' },
  { label: '身長', value: '175cm' },
  { label: '体型', value: '普通' },
  { label: '同居人', value: '一人暮らし' },
  { label: '性格・タイプ', value: '真面目、楽観的' },
  { label: '結婚歴', value: '未婚' },
  { label: '子供の有無', value: 'なし' },
  { label: '結婚に対する意思', value: '良い人がいたらしたい' },
  { label: '子供が欲しいか', value: '欲しい' },
  { label: '家事・育児', value: '二人で協力したい' },
  { label: '出会うまでの希望', value: '気が合えば会いたい' },
  { label: '初回デート費用', value: '割り勘' },
  { label: 'お酒', value: 'ときどき飲む' },
  { label: 'タバコ', value: '吸わない' }
] as const;

export default function UserProfile() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const userId = typeof params['userId'] === 'string' ? params['userId'] : '';

  // TODO: 実際にはAPI等から取得したデータを使用
  const profileList = MOCK_PROFILE_LIST;

  return (
    <ScreenWrapper
      enableKeyboardAvoid
      header={
        <MessageHeader
          userName='aaaa'
          userImage={require('@/assets/images/users/default-user.jpg')}
          onMenuPress={() => {
            /* メニュー処理 */
          }}
          paddingTop={insets.top}
        />
      }
      footer={
        <View className='px-4 py-3' style={{ paddingBottom: insets.bottom + 12 }}>
          <Button
            onPress={() => console.log('いいね送信')}
            className='rounded-full bg-primary py-4'
          >
            <View className='flex-row items-center justify-center'>
              <MaterialIcons name='thumb-up' size={24} color='white' />
              <Text className='ml-2 text-lg font-bold text-white'>いいね！</Text>
            </View>
          </Button>
        </View>
      }
      bounces={true}
    >
      {/* ユーザーの画像ギャラリー */}
      <UserImageGallery images={IMAGES} />

      {/* コンテンツエリア */}
      <View className='mx-5'>
        {/* ユーザー名やステータス */}
        <View className='mb-10 mt-6 border-b-2 border-gray-200 pb-6'>
          <Text className='text-xxxl font-bold text-body'>aaaa</Text>
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
          <Text className='#0A2C2F text-l leading-6'>
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

        {/* 好みタグ */}
        <View className='mb-10'>
          <View className='mb-3 flex-row items-center justify-between'>
            <Text className='mb-3 text-xxl font-semibold text-body'>
              好みタグ
            </Text>
            <Button onPress={() => {}}>
              <Text className='text-m font-bold text-primary'>
                すべて見る
              </Text>
            </Button>
          </View>
          <View className='-mx-5' style={{ height: 130 }}>
            <FlashList
              data={PREFERENCE_TAGS.slice(0, 10)}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View className='pl-4'>
                  <ImageCard
                    image={item.image}
                    title={item.title}
                    onPress={() => console.log(`Selected: ${item.title}`)}
                    size='small'
                    shadow={false}
                  />
                </View>
              )}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingRight: 16 }}
            />
          </View>
        </View>

        {/* プロフィール */}
        <View className='mb-10'>
          <Text className='mb-3 text-xxl font-semibold text-body'>
            プロフィール
          </Text>
          <View>
            {profileList.map((item, index) => (
              <Lists
                key={`profiles-${String(index) + 1}`}
                title={item.label}
                titleColor='text-description'
                rightText={item.value}
                isShowBottomBorder={index < profileList.length - 1}
              />
            ))}
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
