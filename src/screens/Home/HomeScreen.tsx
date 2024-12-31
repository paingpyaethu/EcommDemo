import React from 'react';
import {Pressable, View} from 'react-native';
import {ThemedText} from '@/components/atoms';
import {SafeScreen} from '@/components/template';
import ProductList from '@/components/organisms/ProductList/ProductList';
import { useDispatch } from 'react-redux';
import { clearData } from '@/store/features/user/userSlice';
import { resetAndNavigate } from '@/utils/navigationUtil';

const HomeScreen = () => {
  const dispatch = useDispatch();
  return (
    <SafeScreen>
      <View className="flex-1 px-5 md:p-10">
        <View className="flex-row items-center justify-between my-4 md:my-8">
          <ThemedText variant={'primary'} size={'xl_24'} weight={'bold'}>
            Discover
          </ThemedText>
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
