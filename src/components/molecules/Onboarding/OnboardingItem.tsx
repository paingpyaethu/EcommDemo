import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
} from 'react-native-reanimated';
import {ThemedButton, ThemedText} from '@/components/atoms';
import {IOnboardingData} from '@/constant';
import {useNavigation} from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setIsAlreadyLaunch } from '@/store/features/user/userSlice';

const {width, height} = Dimensions.get('window');

interface OnboardingItemProps {
  item: IOnboardingData;
  index: number;
  translateX: SharedValue<number>;
}

const OnboardingItem = ({item, index, translateX}: OnboardingItemProps) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onPressGetStarted = () => {
    dispatch(setIsAlreadyLaunch({ isAlreadyLaunch: true }));
    navigation.reset({
      index: 0,
      routes: [{ name: 'AuthStack' }],
    });
  };

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
        variant={'primary'}
        size={'xl_20'}
        weight={'bold'}
        className="dark:text-ecomm-primary my-2">
        {item.title}
      </ThemedText>
      <ThemedText
        variant={'lightGrey'}
        weight={'medium'}
        className="dark:text-ecomm-grey text-center">
        {item.description}
      </ThemedText>
      {index === 2 && (
        <ThemedButton
          className="mt-10"
          onPress={onPressGetStarted}>
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
