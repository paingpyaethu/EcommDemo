import React from 'react';
import {View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
} from 'react-native-reanimated';
import {Dimensions} from 'react-native';
import { isTablet } from 'react-native-device-info';

const {width} = Dimensions.get('window');

interface OnboardingIndicatorProps {
  data: Array<{id: string}>;
  translateX: SharedValue<number>;
}

const OnboardingIndicator = ({data, translateX}: OnboardingIndicatorProps) => {

  const widthInterpolatedOutputRange = isTablet() ? [18, 36, 18] : [8, 16, 8]
  return (
    <View className="flex-row justify-center mb-8">
      {data.map((_, index) => {
        const animatedIndicatorStyle = useAnimatedStyle(() => {
          const opacity = interpolate(
            translateX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.5, 1, 0.5],
            Extrapolation.CLAMP,
          );
          const widthInterpolated = interpolate(
            translateX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            widthInterpolatedOutputRange,
            Extrapolation.CLAMP,
          );
          return {
            opacity,
            width: widthInterpolated,
          };
        });

        return (
          <Animated.View
            key={index}
            style={[animatedIndicatorStyle]}
            className="h-2 md:h-4 rounded md:rounded-lg bg-ecomm-primary mx-1 md:mx-2"
          />
        );
      })}
    </View>
  );
};

export default OnboardingIndicator;
