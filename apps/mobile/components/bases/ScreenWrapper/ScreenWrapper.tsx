import React from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import {
  SafeAreaView,
  Edge,
  useSafeAreaInsets
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

  // KeyboardAvoidingView関連
  enableKeyboardAvoid?: boolean;
  keyboardVerticalOffset?: number;

  // GestureDetector関連
  gesture?: ReturnType<typeof Gesture.Pan>;

  // 固定ヘッダー
  header?: React.ReactNode;

  // 固定フッター（下部固定要素）
  footer?: React.ReactNode;

  // paddingTop制御
  isPaddingTop?: boolean;
};

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  edges = ['left', 'right'],
  barStyle = 'dark-content',
  backgroundColor = 'bg-white',
  safeAreaClassName,
  scrollEnabled = true,
  bounces,
  enableKeyboardAvoid = false,
  keyboardVerticalOffset = 0,
  gesture,
  header,
  footer,
  isPaddingTop = true
}) => {
  const insets = useSafeAreaInsets();

  // コンテンツ部分の構築
  const baseContent = scrollEnabled ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={bounces}
      contentContainerStyle={{ paddingTop: isPaddingTop ? insets.top : 0 }}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={{ flex: 1, paddingTop: isPaddingTop ? insets.top : 0 }}>
      {children}
    </View>
  );

  // KeyboardAvoidingViewでラップ
  const contentWithKeyboard = enableKeyboardAvoid ? (
    <KeyboardAvoidingView
      className='flex-1'
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      {baseContent}
      {footer}
    </KeyboardAvoidingView>
  ) : (
    <>
      {baseContent}
      {footer}
    </>
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
