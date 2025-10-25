import React from 'react';
import { View } from 'react-native';
import { Image } from 'expo-image';
import { Text, Button } from '@/components/bases';
import { cn } from '@/utils';

type CardSize = 'small' | 'medium' | 'large';

type ImageCardProps = {
  image: string | { uri: string } | number; // URL、require()、またはオブジェクト
  title: string;
  subtitle?: string;
  onPress: () => void; // 必須に変更
  size?: CardSize; // サイズプリセット
  className?: string;
  shadow?: boolean;
};

const sizePresets = {
  small: {
    width: 100,
    imageHeight: 100,
    textSize: 'text-xs',
    padding: 'px-2 py-1'
  },
  medium: {
    width: 140,
    imageHeight: 140,
    textSize: 'text-sm',
    padding: 'px-3 py-2'
  },
  large: {
    width: 200,
    imageHeight: 200,
    textSize: 'text-base',
    padding: 'px-4 py-3'
  }
};

export const ImageCard: React.FC<ImageCardProps> = ({
  image,
  title,
  subtitle,
  onPress,
  size = 'medium',
  className,
  shadow = true
}) => {
  // サイズの設定を取得
  const preset = sizePresets[size];
  const cardWidth = preset.width;
  const cardImageHeight = preset.imageHeight;
  const textSize = preset.textSize;
  const padding = preset.padding;

  return (
    <Button onPress={onPress} className='p-0' activeOpacity={0.8}>
      <View
        className={cn(
          'overflow-hidden rounded-xl bg-white',
          shadow && 'shadow-lg',
          className
        )}
        style={{ width: cardWidth }}
      >
        {/* 画像部分 */}
        <Image
          source={typeof image === 'string' ? { uri: image } : image}
          style={{ width: '100%', height: cardImageHeight, borderRadius: 12 }}
          contentFit='cover'
          transition={200}
        />

        {/* テキスト部分 */}
        <View className={cn(padding)}>
          <Text
            className={cn(textSize, 'font-semibold text-gray-900')}
            numberOfLines={1}
          >
            {title}
          </Text>

          {subtitle && (
            <Text
              className={cn('mt-1 text-gray-600', textSize)}
              numberOfLines={1}
            >
              {subtitle}
            </Text>
          )}
        </View>
      </View>
    </Button>
  );
};
