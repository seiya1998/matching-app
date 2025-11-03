import { forwardRef, ForwardRefRenderFunction } from 'react';
import { View } from 'react-native';
import { Text } from '../Text';
import { Button } from '../Button';
import { cn } from '@/utils/classNames';

type ChoiceButtonProps = {
  onValueChange?: (value: boolean) => void;
  isChecked: boolean;
  text: string;
};

const ChoiceButtonComponent: ForwardRefRenderFunction<
  View,
  ChoiceButtonProps
> = ({ isChecked, onValueChange, text }, ref) => {
  const handlePress = () => {
    onValueChange?.(!isChecked);
  };

  return (
    <Button
      ref={ref}
      onPress={handlePress}
      className={cn(
        'rounded-full border px-4 py-2',
        isChecked ? 'border-primary' : 'border-gray-300 bg-white'
      )}
      activeOpacity={1}
    >
      <Text
        className={cn(
          'text-center text-m font-medium',
          isChecked ? 'text-primary' : 'text-gray-700'
        )}
      >
        {text}
      </Text>
    </Button>
  );
};

export const ChoiceButton = forwardRef(ChoiceButtonComponent);
