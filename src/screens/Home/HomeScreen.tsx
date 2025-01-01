import React from 'react';
import {Pressable, View} from 'react-native';
import {ThemedText} from '@/components/atoms';
import {SafeScreen} from '@/components/template';
import ProductList from '@/components/organisms/ProductList/ProductList';
import {HomeScreenNavigationProp} from '@/types/navigation/root';
import CartBadge from '@/components/molecules/common/CartBadge/CartBadge';

const HomeScreen = ({navigation}: {navigation: HomeScreenNavigationProp}) => {

  return (
    <SafeScreen>
      <View className="flex-1 px-5 md:p-10">
        <View className="flex-row items-center justify-between my-4 md:my-8">
          <ThemedText variant={'primary'} size={'xl_24'} weight={'bold'}>
            Discover
          </ThemedText>
          <Pressable
            onPress={() => {
              navigation.navigate('CartTab');
            }}>
            <CartBadge />
          </Pressable>
          {/* <Pressable
            onPress={() => {
              dispatch(clearData());
              resetAndNavigate('AuthStack');
            }}>
            <ThemedText>Logout</ThemedText>
          </Pressable> */}
        </View>

        <ProductList {...{navigation}} />
      </View>
    </SafeScreen>
  );
};

export default HomeScreen;
