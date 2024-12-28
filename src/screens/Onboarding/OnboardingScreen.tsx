import React from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import {OnboardingItem} from '@/components/molecules';
import {OnboardingIndicator} from '@/components/atoms';
import {onboardingData} from '@/constant';

const OnboardingScreen: React.FC = () => {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <View className='flex-1 bg-white'>
      <Animated.FlatList
        data={onboardingData}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <OnboardingItem item={item} index={index} translateX={translateX} />
        )}
      />
      <OnboardingIndicator data={onboardingData} translateX={translateX} />
    </View>
  );
};

export default OnboardingScreen;
