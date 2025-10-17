import { ComponentProps, forwardRef, ForwardRefRenderFunction } from 'react';
import { Text as RNText } from 'react-native';

type Props = {
  children: React.ReactNode;
} & ComponentProps<typeof RNText>;

const TextComponent: ForwardRefRenderFunction<RNText, Props> = (
  { children, ...props },
  ref
) => {
  return (
    <RNText
      ref={ref}
      {...props}
      className={props.className ?? ''}
      allowFontScaling={false}
    >
      {children}
    </RNText>
  );
};

export const Text = forwardRef(TextComponent);
