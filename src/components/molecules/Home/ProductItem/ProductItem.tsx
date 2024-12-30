import React from 'react';
import {View, Image, Pressable} from 'react-native';
import {PHOTO_URL_END_POINT} from '@/api/config/endpoint';
import {ThemedText} from '@/components/atoms';
import {useColorScheme} from 'nativewind';
import {FavouriteIcon} from '@/utils/svg/icon.common';

const ProductItem = ({product}: {product: IProductsData}) => {
  const {colorScheme} = useColorScheme();

  return (
    <View
      className="mb-3 md:mb-6"
      style={{width: '90%', marginHorizontal: '5%'}}>
      <View className="items-center mb-1 md:mb-3">
        <View className="bg-gray-300 w-full h-36 md:h-64 justify-center items-center rounded-xl md:rounded-3xl">
          <Image
            source={{uri: `${PHOTO_URL_END_POINT}/${product.image}`}}
            className="w-24 h-32 md:w-44 md:h-56"
            resizeMode="cover"
          />
        </View>
        <Pressable className="absolute right-1 top-1 md:right-2 md:top-2 rounded-full p-1 md:p-2 bg-slate-50 shadow-md"> 
          <FavouriteIcon {...{colorScheme}} fill={'none'} stroke={'#000'} />
        </Pressable>
      </View>
      <View className="flex-1 justify-center">
        <ThemedText weight={'bold'} size={'md_16'}>
          {product.name}
        </ThemedText>
        <ThemedText variant={'grey'} size={'xs_12'}>
          {product.category.name}
        </ThemedText>
        <ThemedText weight={'bold'}>${product.price}</ThemedText>
      </View>
    </View>
  );
};

export default ProductItem;
