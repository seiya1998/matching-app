import { useCallback } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolateColor,
  useDerivedValue,
  useSharedValue
} from 'react-native-reanimated';
import { cn } from '@/utils';

type Props = {
  isEnabled: boolean;
  onToggle: () => void;
};

const TOGGLE_SWITCH_WIDTH = 60;
const TOGGLE_SWITCH_HEIGHT = 32;
const TOGGLE_PADDING = -1;

export function ToggleSwitch({ isEnabled, onToggle }: Props) {
  const isAnimating = useSharedValue(false);

  const progress = useDerivedValue(() => {
    return isEnabled ? 1 : 0;
  });

  const handlePress = useCallback(() => {
    if (isAnimating.value) return;
    isAnimating.value = true;
    onToggle();
  }, [onToggle, isAnimating]);

  const containerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ['#E0E0E0', '#5DBAEB'] // 0:グレー 1:プライマリーカラー
    );
    return { backgroundColor };
  });

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(
          progress.value *
            (TOGGLE_SWITCH_WIDTH - TOGGLE_SWITCH_HEIGHT - TOGGLE_PADDING * 2),
          {
            damping: 30,
            stiffness: 500,
            overshootClamping: true
          },
          (isFinished) => {
            if (isFinished == true) isAnimating.value = false;
          }
        )
      }
    ]
  }));

  return (
    <Pressable onPress={handlePress} disabled={isAnimating.value}>
      <Animated.View
        className={cn('h-8 w-[60px] rounded-full p-0.5')}
        style={containerStyle}
      >
        <Animated.View
          className={cn(
            'elevation-5 h-7 w-7 rounded-full bg-white shadow-lg shadow-black/30'
          )}
          style={thumbStyle}
        />
      </Animated.View>
    </Pressable>
  );
}
