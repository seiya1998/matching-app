import { memo, useRef, useCallback, useState } from 'react';
import { View, Dimensions, ImageSourcePropType } from 'react-native';
import { Image } from 'expo-image';
import Carousel from 'react-native-reanimated-carousel';
import { FlashList } from '@shopify/flash-list';
import { Button } from '@/components/bases';
import { cn } from '@/utils';

const { width: CARD_WIDTH } = Dimensions.get('window');

type UserImageGalleryProps = {
  images: readonly ImageSourcePropType[] | ImageSourcePropType[];
};

const IMAGE_HEIGHT = 360;

export const UserImageGallery = memo<UserImageGalleryProps>(({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<any>(null);

  // readonly配列を通常の配列として扱うために変換
  const imageList = images as ImageSourcePropType[];

  const handleSnapToItem = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleThumbnailPress = useCallback((index: number) => {
    setActiveIndex(index); // 即座にアクティブインデックスを更新
    carouselRef.current?.scrollTo({ index, animated: true });
  }, []);

  const renderCarouselItem = useCallback(
    ({ item }: { item: ImageSourcePropType }) => (
      <View
        style={{
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
          width: CARD_WIDTH,
          height: IMAGE_HEIGHT,
          overflow: 'hidden'
        }}
      >
        <Image
          source={item}
          style={{ width: '100%', height: '100%' }}
          contentFit='cover'
          cachePolicy='memory-disk' // メモリとディスクキャッシュを有効化
          priority='high' // 優先度を高く設定
        />
      </View>
    ),
    []
  );

  const renderThumbnailItem = useCallback(
    ({ item, index }: { item: ImageSourcePropType; index: number }) => (
      <Button
        onPress={() => handleThumbnailPress(index)}
        className={cn(
          'mr-2 overflow-hidden rounded-lg border-2',
          index === activeIndex ? 'border-gray-300' : 'border-transparent'
        )}
        activeOpacity={1}
      >
        <Image
          source={item}
          style={{ width: 80, height: 80, borderRadius: 6 }}
          contentFit='cover'
          cachePolicy='memory-disk'
        />
      </Button>
    ),
    [activeIndex, handleThumbnailPress]
  );

  return (
    <View className='mt-[80px]'>
      {/* メイン画像スライダー */}
      <Carousel
        ref={carouselRef}
        width={CARD_WIDTH}
        height={IMAGE_HEIGHT}
        data={imageList}
        renderItem={renderCarouselItem}
        onSnapToItem={handleSnapToItem}
        loop={false}
        enabled={false} // スワイプジェスチャーを無効化
        scrollAnimationDuration={300} // スライドアニメーションの速度
      />

      {/* サムネイル */}
      <View className='pl-5 pt-4'>
        <FlashList
          data={imageList}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => `thumb-${index}`}
          renderItem={renderThumbnailItem}
        />
      </View>
    </View>
  );
});

UserImageGallery.displayName = 'UserImageGallery';
