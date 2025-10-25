import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/bases';
import { cn } from '@/utils';

type StatusItemProps = {
  children: React.ReactNode; // アイコン部分
  label: string; // ラベルテキスト
  className?: string; // 追加のクラス名
};

export const StatusItem: React.FC<StatusItemProps> = ({
  children,
  label,
  className
}) => {
  return (
    <View className={cn('flex-row items-center', className)}>
      {children}
      <Text className='ml-1 text-m text-description'>{label}</Text>
    </View>
  );
};
