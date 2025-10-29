import React from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import {
  SafeAreaView,
  Edge
} from 'react-native-safe-area-context';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

type ScreenWrapperProps = {
  children: React.ReactNode;

  // SafeAreaView & StatusBar
  edges?: Edge[];
  barStyle?: 'dark-content' | 'light-content';
  backgroundColor?: string;
  safeAreaClassName?: string;

  // ScrollView関連
  scrollEnabled?: boolean;
  bounces?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;

  // KeyboardAvoidingView関連
  enableKeyboardAvoid?: boolean;
  keyboardVerticalOffset?: number;

  // GestureDetector関連
  gesture?: ReturnType<typeof Gesture.Pan>;

  // 固定ヘッダー
  header?: React.ReactNode;
};

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  edges = ['left', 'right'],
  barStyle = 'dark-content',
  backgroundColor = 'bg-white',
  safeAreaClassName,
  scrollEnabled = true,
  bounces,
  contentContainerStyle,
  enableKeyboardAvoid = false,
  keyboardVerticalOffset = 0,
  gesture,
  header
}) => {
  // コンテンツ部分の構築
  const baseContent = scrollEnabled ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={bounces}
      contentContainerStyle={contentContainerStyle}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={{ flex: 1 }}>{children}</View>
  );

  // KeyboardAvoidingViewでラップ
  const contentWithKeyboard = enableKeyboardAvoid ? (
    <KeyboardAvoidingView
      className='flex-1'
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      {baseContent}
    </KeyboardAvoidingView>
  ) : (
    baseContent
  );

  // GestureDetectorまたはヘッダーでラップ
  const content = gesture ? (
    <GestureDetector gesture={gesture}>
      <View style={{ flex: 1 }}>
        {header}
        {contentWithKeyboard}
      </View>
    </GestureDetector>
  ) : header ? (
    <View style={{ flex: 1 }}>
      {header}
      {contentWithKeyboard}
    </View>
  ) : (
    contentWithKeyboard
  );

  return (
    <SafeAreaView
      className={safeAreaClassName ?? `flex-1 ${backgroundColor}`}
      edges={edges}
    >
      <StatusBar barStyle={barStyle} />
      {content}
    </SafeAreaView>
  );
};
