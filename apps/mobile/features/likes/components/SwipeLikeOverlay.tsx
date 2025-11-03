import { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/bases';
import { EvilIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export const SwipeLikeOverlay = memo(() => {
  return (
    <LinearGradient
      colors={[
        'rgba(34, 197, 94, 0.95)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(34, 197, 94, 0.5)',
        'rgba(34, 197, 94, 0.2)',
        'transparent'
      ]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 0.7, y: 0.5 }}
      style={[StyleSheet.absoluteFillObject, { borderRadius: 20 }]}
    >
      <View className='flex-1 justify-center items-start pl-12'>
        <View className='items-center gap-2'>
          <EvilIcons name='like' size={64} color='white' />
          <Text className='text-3xl font-bold text-white'>いいね</Text>
        </View>
      </View>
    </LinearGradient>
  );
});

SwipeLikeOverlay.displayName = 'SwipeLikeOverlay';
