import React from 'react';
import {View} from 'react-native';
import {ThemedText} from '@/components/atoms';
import {SafeScreen} from '@/components/template';

const HomeScreen = () => {
  return (
    <SafeScreen>
      <View className=" mt-5 ">
        <ThemedText>HomeScreen</ThemedText>
      </View>
    </SafeScreen>
  );
};

export default HomeScreen;
