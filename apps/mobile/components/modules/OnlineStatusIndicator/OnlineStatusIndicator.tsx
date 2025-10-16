import React, { memo } from 'react';
import { View } from 'react-native';

type OnlineStatus = 'online' | 'recent' | 'offline';
type Size = 'small' | 'medium' | 'large';

interface OnlineStatusIndicatorProps {
  status: OnlineStatus;
  size?: Size;
}

const statusConfig = {
  online: {
    color: 'bg-green-500'
  },
  recent: {
    color: 'bg-orange-500'
  },
  offline: {
    color: 'bg-gray-500'
  }
};

const sizeConfig = {
  small: 'h-2 w-2',
  medium: 'h-2.5 w-2.5',
  large: 'h-3 w-3'
};

export const OnlineStatusIndicator = memo<OnlineStatusIndicatorProps>(
  ({ status, size = 'small' }) => {
    const config = statusConfig[status];
    const sizeClass = sizeConfig[size];

    return <View className={`rounded-full ${sizeClass} ${config.color}`} />;
  }
);

OnlineStatusIndicator.displayName = 'OnlineStatusIndicator';
