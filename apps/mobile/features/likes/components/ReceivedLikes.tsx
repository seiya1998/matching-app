import { View, Dimensions } from 'react-native';
import { Button } from '@/components/bases';
import { Swiper, type SwiperCardRefType } from 'rn-swiper-list';
import { useRef, useState, useCallback } from 'react';
import { EvilIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SwipeLikeOverlay } from './SwipeLikeOverlay';
import { SwipeSkipOverlay } from './SwipeSkipOverlay';
import { UserSwipeCard } from './UserSwipeCard';
import { EmptyReceivedLikes } from './EmptyReceivedLikes';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 40;

// モックデータ
const MOCK_USERS = [
  {
    id: '1',
    nickname: 'あやか',
    age: 25,
    location: '東京',
    onlineStatus: 'online' as const,
    images: [
      require('@/assets/images/users/01.png'),
      require('@/assets/images/users/02.png'),
      require('@/assets/images/users/03.png')
    ],
    bio: 'カフェ巡りと映画鑑賞が好きです！'
  },
  {
    id: '2',
    nickname: 'さくら',
    age: 23,
    location: '神奈川',
    onlineStatus: 'online' as const,
    images: [
      require('@/assets/images/users/02.png'),
      require('@/assets/images/users/01.png')
    ],
    bio: '旅行とカメラが趣味です📷'
  },
  {
    id: '3',
    nickname: 'まい',
    age: 27,
    location: '大阪',
    onlineStatus: 'offline' as const,
    images: [
      require('@/assets/images/users/03.png'),
      require('@/assets/images/users/01.png')
    ],
    bio: '料理が得意です🍳'
  }
];

export const ReceivedLikes = () => {
  const swiperRef = useRef<SwiperCardRefType>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeLeft = () => {
    console.log('Skipped:', MOCK_USERS[currentIndex]?.nickname);
    swiperRef.current?.swipeLeft();
  };

  const handleSwipeRight = () => {
    console.log('Liked:', MOCK_USERS[currentIndex]?.nickname);
    swiperRef.current?.swipeRight();
  };

  const onSwipedLeft = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const onSwipedRight = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const renderCard = useCallback(
    (user: (typeof MOCK_USERS)[0]) => (
      <UserSwipeCard user={user} cardWidth={CARD_WIDTH} />
    ),
    []
  );

  const renderOverlayLabelRight = useCallback(() => <SwipeLikeOverlay />, []);
  const renderOverlayLabelLeft = useCallback(() => <SwipeSkipOverlay />, []);

  return (
    <View className='flex-1 pt-4'>
      <View className='flex-1 px-5'>
        <View className='mt-5 flex-1 items-center'>
          {currentIndex >= MOCK_USERS.length ? (
            <EmptyReceivedLikes cardWidth={CARD_WIDTH} />
          ) : (
            <Swiper
              ref={swiperRef}
              data={MOCK_USERS}
              renderCard={renderCard}
              onSwipeLeft={onSwipedLeft}
              onSwipeRight={onSwipedRight}
              cardStyle={{
                width: CARD_WIDTH,
                height: 520
              }}
              OverlayLabelRight={renderOverlayLabelRight}
              OverlayLabelLeft={renderOverlayLabelLeft}
            />
          )}
        </View>
      </View>

      {/* アクションボタン - 画面下部に固定 */}
      {currentIndex < MOCK_USERS.length && (
        <View className='absolute bottom-5 left-0 right-0 flex-row items-center justify-center gap-16'>
          {/* スキップボタン */}
          <Button
            onPress={handleSwipeLeft}
            className='h-[60px] w-[60px] items-center justify-center rounded-full bg-gray-400 shadow-md'
          >
            <MaterialCommunityIcons
              name='arrow-u-left-bottom'
              size={32}
              color='white'
            />
          </Button>

          {/* いいねボタン */}
          <Button
            onPress={handleSwipeRight}
            className='h-[70px] w-[70px] items-center justify-center rounded-full bg-green-500 shadow-md'
          >
            <EvilIcons name='like' size={40} color='white' />
          </Button>
        </View>
      )}
    </View>
  );
};
