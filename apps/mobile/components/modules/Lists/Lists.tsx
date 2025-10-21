import { View } from 'react-native';
import { Text, Button } from '@/components/bases';
import { cn } from '@/utils';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import EvilIcons from '@expo/vector-icons/EvilIcons';

type BaseListsProps = {
  listType?: 'L' | 'M' | null;
  leftIconType?: 'footprint' | 'star' | 'like' | 'help' | null;
  title: string;
  isTitleBold?: boolean;
  description?: string | null;
  category?: 'IMPORTANT' | 'NOTIFICATION' | null;
  isShowBottomBorder: boolean;
  onPress?: () => void | null;
  rightComponent?: React.ReactNode;
};

type ListsProps =
  | (BaseListsProps & {
      isShowRightIcon: true;
      rightText?: never;
    })
  | (BaseListsProps & {
      isShowRightIcon?: false;
      rightText?: string | null;
    });

const CATEGORY_LABELS: Record<string, string> = {
  IMPORTANT: '重要',
  NOTIFICATION: 'お知らせ'
} as const;

/**
 * リストアイテムを表示するコンポーネント
 * @param listType - リストの種類（'L'|'M'|null）
 * @param leftIconType - 左側に表示するアイコンの種類（'footprint'|'comment'| 'check' | null）
 * @param title - タイトル
 * @param isTitleBold - タイトルを太字にするかどうか
 * @param description - リストアイテムの説明文
 * @param category - リストアイテムのカテゴリ（'IMPORTANT'|'NOTIFICATION'|null）
 * @param isShowBottomBorder - 下部にボーダーを表示するかどうか
 * @param isShowRightIcon - 右側に矢印アイコンを表示するかどうか
 * @param rightText - 右側に表示するテキスト（isShowRightIconがfalseの場合のみ有効）
 * @param onPress - タップ時のコールバック関数
 * @param rightComponent - 右側に表示するコンポーネント
 */
export function Lists({
  listType = null,
  leftIconType = null,
  title,
  isTitleBold = false,
  description = null,
  category = null,
  isShowBottomBorder = false,
  isShowRightIcon = false,
  rightText,
  onPress,
  rightComponent
}: ListsProps) {
  const leftIcon =
    leftIconType === 'footprint' ? (
      <View className='h-14 w-14 items-center justify-center rounded-full bg-green-500'>
        <Ionicons name='footsteps-outline' size={24} color='white' />
      </View>
    ) : leftIconType === 'like' ? (
      <View className='h-14 w-14 items-center justify-center rounded-full bg-red-500'>
        <EvilIcons size={32} name='like' color='white' />
      </View>
    ) : leftIconType === 'star' ? (
      <View className='h-14 w-14 items-center justify-center rounded-full bg-yellow-500'>
        <Ionicons name='star-outline' size={24} color='white' />
      </View>
    ) : leftIconType === 'help' ? (
      <View className='h-14 w-14 items-center justify-center rounded-full bg-blue-500'>
        <Ionicons name='help-circle-outline' size={32} color='white' />
      </View>
    ) : null;
  return (
    <Button
      activeOpacity={1}
      className={cn(
        'mb-4 flex-row',
        isShowBottomBorder && 'border-width-0.5 border-b border-divider'
      )}
      onPress={onPress}
      disabled={onPress === undefined}
    >
      <View
        className={cn(
          'bg-background w-full flex-1 flex-row items-center justify-between border-gray-3',
          isShowBottomBorder && 'pb-3'
        )}
      >
        {/* 左の肉球またはコメントアイコン */}
        {leftIcon}
        <View
          className={cn(
            'flex-1',
            leftIcon != null ? 'ml-3' : 'ml-1',
            rightText != null && 'mr-1',
            isShowRightIcon && 'mr-[10px]'
          )}
        >
          {/* カテゴリー */}
          {category != null && (
            <Text
              className={cn(
                'mb-1 min-w-[68px] self-start rounded-md px-2 py-1 text-center text-xs font-bold',
                category === 'IMPORTANT'
                  ? 'bg-red-400 text-white'
                  : 'bg-gray-200 text-description'
              )}
            >
              {CATEGORY_LABELS[category]}
            </Text>
          )}
          {/* タイトル */}
          <Text
            className={cn(
              'text-body',
              isTitleBold === true && 'font-bold',
              listType === 'L' ? 'text-l' : 'text-m'
            )}
          >
            {title}
          </Text>
          {description != null && (
            <Text className='text-m text-description'>{description}</Text>
          )}
        </View>
        {rightComponent}
        {/* 右の矢印アイコンかアイテム */}
        {isShowRightIcon && (
          <View className='h-6 w-6 items-center justify-center'>
            <AntDesign
              name='right'
              size={listType === 'L' ? 24 : 20}
              color='gray'
            />
          </View>
        )}
        {rightText != null && (
          <Text
            className={cn('mr-1 h-6 min-w-[47px] text-right text-l text-body')}
          >
            {rightText}
          </Text>
        )}
      </View>
    </Button>
  );
}
