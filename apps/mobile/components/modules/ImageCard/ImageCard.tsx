import React from 'react';
import { View } from 'react-native';
import { Image } from 'expo-image';
import { Text, Button } from '@/components/bases';
import { cn } from '@/utils';

type CardSize = 'small' | 'medium';

type ImageCardProps = {
  image: string | { uri: string } | number; // URL、require()、またはオブジェクト
  title?: string;
  subtitle?: string;
  onPress: () => void; // 必須に変更
  size?: CardSize; // サイズプリセット
  className?: string;
  shadow?: boolean;
  children?: React.ReactNode;
};

const sizePresets = {
  small: {
    width: 100,
    imageHeight: 100,
    textSize: 'text-xs',
    padding: 'px-2 py-1'
  },
  medium: {
    width: 170,
    imageHeight: 170,
    textSize: 'text-m',
    padding: 'px-3 py-2'
  }
};

export const ImageCard: React.FC<ImageCardProps> = ({
  image,
  title,
  subtitle,
  onPress,
  size = 'medium',
  className,
  shadow = true,
  children
}) => {
  // サイズの設定を取得
  const preset = sizePresets[size];
  const cardWidth = preset.width;
  const cardImageHeight =
    'imageHeight' in preset ? preset.imageHeight : undefined;
  const aspectRatio =
    'aspectRatio' in preset ? (preset.aspectRatio as number) : undefined;
  const textSize = preset.textSize;
  const padding = preset.padding;

  const imageStyle = aspectRatio
    ? { width: '100%' as const, aspectRatio, borderRadius: 12 }
    : { width: '100%' as const, height: cardImageHeight, borderRadius: 12 };

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
          style={imageStyle}
          contentFit='cover'
          transition={200}
        />

        {/* テキスト部分 */}
        <View className={cn(padding)}>
          {children ? (
            <>
              {title && (
                <Text
                  className={cn(textSize, 'font-semibold text-gray-900')}
                  numberOfLines={1}
                >
                  {title}
                </Text>
              )}

              {children}
            </>
          ) : (
            <>
              {title && (
                <Text
                  className={cn(textSize, 'font-semibold text-gray-900')}
                  numberOfLines={1}
                >
                  {title}
                </Text>
              )}

              {subtitle && (
                <Text
                  className={cn('mt-1 text-gray-600', textSize)}
                  numberOfLines={1}
                >
                  {subtitle}
                </Text>
              )}
            </>
          )}
        </View>
      </View>
    </Button>
  );
};
