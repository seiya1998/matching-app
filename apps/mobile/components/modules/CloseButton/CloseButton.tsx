import { CrossIcon } from '@/assets/svgs';
import { Button } from '@/components/bases';

type CloseButtonProps = {
  onPress: () => void;
  fill?: string;
};

// ヘッダーに使われる閉じるボタン
export function CloseButton({ onPress, fill }: CloseButtonProps) {
  return (
    <Button
      activeOpacity={0.7}
      onPress={onPress}
      hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
    >
      <CrossIcon fill={fill} />
    </Button>
  );
}
