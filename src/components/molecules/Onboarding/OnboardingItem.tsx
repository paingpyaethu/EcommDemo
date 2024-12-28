import {ThemedButton, ThemedText} from '@/components/atoms';
import {IOnboardingData} from '@/constant';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

interface OnboardingItemProps {
  item: IOnboardingData;
  index: number;
  translateX: SharedValue<number>;
}

const OnboardingItem = ({item, index, translateX}: OnboardingItemProps) => {
  const navigation = useNavigation();

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0.8, 1, 0.8],
      Extrapolation.CLAMP,
    );
    return {transform: [{scale}]};
  });

  return (
    <View style={{width, height}} className="items-center justify-center p-5">
      <Animated.Image
        source={item.image}
        style={[styles.image, animatedStyle]}
        resizeMode="contain"
      />
      <ThemedText
        size={'xl_20'}
        variant={'primary'}
        className="font-Montserrat_Bold dark:text-ecomm-primary my-2">
        {item.title}
      </ThemedText>
      <ThemedText
        variant={'grey'}
        className="font-Montserrat_Medium dark:text-ecomm-grey text-center">
        {item.description}
      </ThemedText>
      {index === 2 && (
        <ThemedButton className="mt-10" onPress={() => navigation.navigate('Login')}>
          <ThemedText className="text-white">Get Started</ThemedText>
        </ThemedButton>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: width * 0.8,
    height: height * 0.5,
  },
});

export default OnboardingItem;
