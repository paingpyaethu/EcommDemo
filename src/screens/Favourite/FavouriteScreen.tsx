import React from 'react';
import {View} from 'react-native';
import {SafeScreen} from '@/components/template';
import {ThemedText} from '@/components/atoms';

const FavouriteScreen = () => {
  return (
    <SafeScreen>
      <View className=" mt-5 ">
        <ThemedText>FavouriteScreen</ThemedText>
      </View>
    </SafeScreen>
  );
};

export default FavouriteScreen;
