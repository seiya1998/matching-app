import { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/bases';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

export const SwipeSkipOverlay = memo(() => {
  return (
    <LinearGradient
      colors={[
        'transparent',
        'rgba(156, 163, 175, 0.2)',
        'rgba(156, 163, 175, 0.5)',
        'rgba(156, 163, 175, 0.8)',
        'rgba(156, 163, 175, 0.95)'
      ]}
      start={{ x: 0.3, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={[StyleSheet.absoluteFillObject, { borderRadius: 20 }]}
    >
      <View className='flex-1 justify-center items-end pr-12'>
        <View className='items-center gap-2'>
          <MaterialCommunityIcons name='arrow-u-left-top' size={64} color='white' />
          <Text className='text-3xl font-bold text-white'>スキップ</Text>
        </View>
      </View>
    </LinearGradient>
  );
});

SwipeSkipOverlay.displayName = 'SwipeSkipOverlay';
