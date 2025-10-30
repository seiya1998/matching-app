import {
  ComponentProps,
  forwardRef,
  ForwardRefRenderFunction,
  useCallback
} from 'react';
import {
  GestureResponderEvent,
  Keyboard,
  TouchableOpacity as RNTouchableOpacity,
  View
} from 'react-native';
import { Text } from '../Text';
import { cn } from '@/utils/classNames';

// ボタンの基本props
type BaseButtonProps = {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  disabled?: boolean;
  activeOpacity?: number;
};

// テンプレートボタンのprops
type TemplateButtonProps = {
  children?: never;
  text: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  textStyle?: string;
};

// デフォルトボタンのprops
type DefaultButtonProps = {
  children: React.ReactNode;
  text?: never;
  variant?: never;
  size?: never;
  textStyle?: never;
};

type Props = (TemplateButtonProps | DefaultButtonProps) &
  BaseButtonProps &
  ComponentProps<typeof RNTouchableOpacity>;

const variantClass = {
  primary: {
    button: 'rounded-full bg-primary font-bold',
    disabledButton: 'bg-gray-4'
  },
  secondary: {
    button: 'rounded-full border border-primary bg-white',
    disabledButton: 'border-gray-4'
  },
  tertiary: {
    button: '',
    disabledButton: ''
  }
} as const;

const sizeClass = {
  small: 'h-8',
  medium: 'h-[38px] mx-5 mx-auto ',
  large: 'self-stretch h-12'
};

const ButtonComponent: ForwardRefRenderFunction<View, Props> = (
  {
    children,
    onPress,
    text,
    variant = 'primary',
    size = 'large',
    disabled = false,
    activeOpacity = text != null ? 0.7 : 0.2, // テンプレートボタンの場合は0.7、子ボタンの場合は元のデフォルト値の0.2
    ...props
  },
  ref
) => {
  const textColor =
    variant === 'primary'
      ? 'text-white'
      : disabled
        ? 'text-gray-4'
        : 'text-primary';

  // キーボードを閉じてからボタンを押す（テンプレートボタンの場合のみ）
  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      // テンプレートボタン（text指定）の場合のみキーボードを閉じる
      if (text != null) {
        Keyboard.dismiss();
      }
      onPress?.(event);
    },
    [onPress, text]
  );

  const isTemplateButton = text != null;

  return (
    <RNTouchableOpacity
      ref={ref}
      disabled={disabled}
      onPress={handlePress}
      activeOpacity={activeOpacity}
      {...props}
      className={cn(
        isTemplateButton && 'items-center justify-center',
        isTemplateButton && variantClass[variant]['button'],
        isTemplateButton && sizeClass[size],
        isTemplateButton && {
          [variantClass[variant]['disabledButton']]: disabled
        },
        props.className
      )}
    >
      {/* テンプレートボタンの場合はテキストを表示 */}
      {isTemplateButton ? (
        <Text
          className={cn(
            'text-m font-bold',
            textColor,
            size === 'small' && 'text-s'
          )}
        >
          {text}
        </Text>
      ) : (
        // 子ボタンの場合は子要素を表示
        children
      )}
    </RNTouchableOpacity>
  );
};

export const Button = forwardRef(ButtonComponent);
