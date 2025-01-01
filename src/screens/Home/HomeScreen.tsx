import React from 'react';
import {Pressable, View} from 'react-native';
import {ThemedText} from '@/components/atoms';
import {SafeScreen} from '@/components/template';
import ProductList from '@/components/organisms/ProductList/ProductList';
import {HomeScreenNavigationProp} from '@/types/navigation/root';
import CartBadge from '@/components/molecules/common/CartBadge/CartBadge';
import {AddProductIcon} from '@/utils/svg/icon.common';
import {useTheme} from '@/context/ThemeProvider';

const HomeScreen = ({navigation}: {navigation: HomeScreenNavigationProp}) => {
  const {colorScheme} = useTheme();
  return (
    <SafeScreen>
      <View className="flex-1 px-5 md:p-10">
        <View className="flex-row items-center justify-between my-4 md:my-8">
          <ThemedText variant={'primary'} size={'xl_24'} weight={'bold'}>
            Discover
          </ThemedText>
          <View className="flex-row items-center">
            <Pressable
              onPress={() => {
                navigation.navigate('CreateProduct');
              }}
              className="flex-row items-center border border-ecomm-black dark:border-white rounded-md md:rounded-xl py-1 px-2 md:py-2 md:px-4 mr-4 md:mr-8">
              <AddProductIcon
                stroke={colorScheme === 'light' ? 'black' : 'white'}
              />
              <ThemedText size={'xs_12'} className="ml-1 md:ml-2">
                Add
              </ThemedText>
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.navigate('CartTab');
              }}>
              <CartBadge />
            </Pressable>
          </View>
        </View>

        <ProductList />
      </View>
    </SafeScreen>
  );
};

export default HomeScreen;
