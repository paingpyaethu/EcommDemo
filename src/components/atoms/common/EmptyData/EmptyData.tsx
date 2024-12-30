import {EmptyIcon} from '@/utils/svg/icon.common';
import {useColorScheme} from 'nativewind';
import React from 'react';
import {View, Dimensions} from 'react-native';
import {ThemedText} from '../ThemedText/ThemedText';

const {height} = Dimensions.get('window');
const EmptyData = () => {
  const {colorScheme} = useColorScheme();
  return (
    <View
      className="items-center justify-center"
      style={{height: height * 0.7}}>
      <EmptyIcon
        {...{colorScheme}}
        fill={colorScheme === 'light' ? '#000' : '#FFF'}
      />
      <ThemedText size={'xl_24'} className="mt-3 md:mt-6">
        No data found!
      </ThemedText>
    </View>
  );
};

export default EmptyData;
