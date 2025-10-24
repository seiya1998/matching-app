import { memo, useRef, useCallback, useState } from 'react';
import { View, Image, ImageSourcePropType, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { FlashList } from '@shopify/flash-list';
import { Button } from '@/components/bases';

const { width: CARD_WIDTH } = Dimensions.get('window');

type UserImageGalleryProps = {
  images: ImageSourcePropType[];
};

export const UserImageGallery = memo<UserImageGalleryProps>(({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<any>(null);

  const handleSnapToItem = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleThumbnailPress = useCallback((index: number) => {
    carouselRef.current?.scrollTo({ index, animated: true });
  }, []);

  const renderCarouselItem = useCallback(
    ({ item }: { item: ImageSourcePropType }) => (
      <View style={{ width: CARD_WIDTH }}>
        <View
          className='overflow-hidden'
          style={{
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30
          }}
        >
          <Image source={item} className='h-full w-full' resizeMode='cover' />
        </View>
      </View>
    ),
    []
  );

  const renderThumbnailItem = useCallback(
    ({ item, index }: { item: ImageSourcePropType; index: number }) => (
      <Button
        onPress={() => handleThumbnailPress(index)}
        className={`mr-2 border-2 ${index === activeIndex ? 'border-blue-500' : 'border-gray-300'} overflow-hidden rounded-lg`}
      >
        <Image
          source={item}
          className='h-20 w-20 rounded-md'
          resizeMode='cover'
        />
      </Button>
    ),
    [activeIndex, handleThumbnailPress]
  );

  return (
    <View className='mt-[120px]'>
      {/* メイン画像スライダー */}
      <Carousel
        ref={carouselRef}
        width={CARD_WIDTH}
        height={400}
        data={images}
        renderItem={renderCarouselItem}
        onSnapToItem={handleSnapToItem}
        loop={false}
      />

      {/* サムネイル */}
      <View className='px-4 py-2'>
        <FlashList
          data={images}
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
