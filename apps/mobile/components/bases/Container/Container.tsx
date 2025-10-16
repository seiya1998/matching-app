import React, { forwardRef, ForwardedRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View,
  RefreshControlProps,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets
} from 'react-native-safe-area-context';

type ContainerProps = {
  children: React.ReactNode;
  style?: string;
  flexGrow?: number;
  scrollEnabled?: boolean;
  barStyle?: 'dark-content' | 'light-content';
  backgroundColor?: string;
  isPaddingTop?: boolean;
  refreshControl?: React.ReactElement<RefreshControlProps>;
};

const Container = forwardRef<ScrollView, ContainerProps>(
  (
    {
      children,
      style,
      flexGrow = 1,
      scrollEnabled = true,
      barStyle = 'dark-content',
      isPaddingTop = true,
      refreshControl
    }: ContainerProps,
    ref: ForwardedRef<ScrollView>
  ) => {
    const insets = useSafeAreaInsets();

    const content = (
      <View
        className={`mx-4 flex-1 ${style ?? ''}`}
        style={{ paddingTop: isPaddingTop ? insets.top : 0 }}
      >
        {children}
      </View>
    );

    return (
      <SafeAreaProvider>
        <SafeAreaView
          className={`flex-1 bg-white`}
          edges={['left', 'right']}
        >
          <StatusBar
            barStyle={barStyle}
            translucent
            backgroundColor='transparent'
          />
          <KeyboardAvoidingView
            className={'flex-1'}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              {scrollEnabled ? (
                <ScrollView
                  ref={ref}
                  contentContainerStyle={{ flexGrow }}
                  keyboardShouldPersistTaps='handled'
                  refreshControl={refreshControl}
                  showsVerticalScrollIndicator={false}
                >
                  {content}
                </ScrollView>
              ) : (
                content
              )}
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
);

Container.displayName = 'Container';

export default Container;
