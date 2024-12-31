import React from 'react';
import {Pressable, View} from 'react-native';
import {ThemedText} from '@/components/atoms';
import {SafeScreen} from '@/components/template';
import ProductList from '@/components/organisms/ProductList/ProductList';
import {ContrastIcon} from '@/utils/svg/icon.common';
import {useColorScheme} from 'nativewind';
import { useDispatch } from 'react-redux';
import { clearData } from '@/store/features/user/userSlice';
import { resetAndNavigate } from '@/utils/navigationUtil';

const HomeScreen = () => {
  const {colorScheme, setColorScheme} = useColorScheme();
  const dispatch = useDispatch();
  return (
    <SafeScreen>
      <View className="flex-1 px-5 md:p-10">
        <View className="flex-row items-center justify-between my-4 md:my-8">
          <ThemedText variant={'primary'} size={'xl_24'} weight={'bold'}>
            Discover
          </ThemedText>
          <Pressable
            onPress={() =>
              setColorScheme(colorScheme === 'light' ? 'dark' : 'light')
            }>
            <ContrastIcon colorScheme={colorScheme} stroke={colorScheme === 'light' ? "#000" : "#FFF"}/>
          </Pressable>
          {/* Temporary */}
          <Pressable onPress={() => {
            dispatch(clearData());
            resetAndNavigate("AuthStack");
          }}>
            <ThemedText>Logout</ThemedText>
          </Pressable>
          {/* Temporary */}
        </View>

        <ProductList />
      </View>
    </SafeScreen>
  );
};

export default HomeScreen;
