import React, {memo, useCallback, useMemo, useRef, useState} from 'react';
import {View, Animated, Image, Dimensions, StyleSheet} from 'react-native';
import PagerView, {
  PagerViewOnPageScrollEventData,
} from 'react-native-pager-view';
import {productCarouselData} from '@/constant';
import {SlidingDot} from 'react-native-animated-pagination-dots';
import {useFocusEffect} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const ProductCarousel = () => {
  const pageRef = useRef<PagerView>(null);
  const [current, setCurrent] = useState(0);

  const scrollOffsetAnimatedValue = useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = useRef(new Animated.Value(0)).current;
  const inputRange = [0, productCarouselData.length];
  const scrollX = useMemo(
    () =>
      Animated.add(
        scrollOffsetAnimatedValue,
        positionAnimatedValue,
      ).interpolate({
        inputRange,
        outputRange: [0, productCarouselData.length * width],
      }),
    [],
  );

  const onPageScroll = useMemo(
    () =>
      Animated.event<PagerViewOnPageScrollEventData>(
        [
          {
            nativeEvent: {
              offset: scrollOffsetAnimatedValue,
              position: positionAnimatedValue,
            },
          },
        ],
        {
          useNativeDriver: false,
        },
      ),
    [],
  );

  useFocusEffect(
    useCallback(() => {
      const intervalId = setInterval(() => {
        setCurrent(prev => {
          const nextPage = (prev + 1) % productCarouselData.length;
          pageRef.current?.setPage(nextPage);
          return nextPage;
        });
      }, 2000);

      return () => clearInterval(intervalId);
    }, []),
  );

  return (
    <View style={{width: width, height: height / 3}}>
      <AnimatedPagerView
        testID="pager-view"
        initialPage={0}
        ref={pageRef}
        style={{height: height / 3}}
        onPageScroll={onPageScroll}>
        {productCarouselData.map(item => (
          <View
            testID={`pager-view-data-${item.key}`}
            key={item.key}
            style={styles.imageView}>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        ))}
      </AnimatedPagerView>
      <View className="mt-3 md:mt-6">
        <SlidingDot
          testID={'sliding-dot'}
          marginHorizontal={3}
          data={productCarouselData}
          //@ts-ignore
          scrollX={scrollX}
          dotSize={10}
        />
      </View>
    </View>
  );
};

export default memo(ProductCarousel);

const styles = StyleSheet.create({
  imageView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CBDDDA44',
  },
  image: {
    width: '60%',
    height: '80%',
  },
});
