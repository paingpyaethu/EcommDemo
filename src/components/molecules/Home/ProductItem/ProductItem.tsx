import React, {memo} from 'react';
import {View, Image, Pressable} from 'react-native';
import {PHOTO_URL_END_POINT} from '@/api/config/endpoint';
import {ThemedText} from '@/components/atoms';
import {useColorScheme} from 'nativewind';
import {FavouriteIcon, RatingIcon} from '@/utils/svg/icon.common';

const ProductItem = ({
  product,
  onPressProduct,
}: {
  product: IProductsData;
  onPressProduct: (productId: number) => void;
}) => {
  const {colorScheme} = useColorScheme();

  return (
    <Pressable
      className="mb-3 md:mb-6"
      style={{width: '90%', marginHorizontal: '5%'}}
      onPress={() => onPressProduct(product.id)}>
      <View className="items-center mb-1 md:mb-3">
        <View className="bg-gray-300 w-full h-36 md:h-64 justify-center items-center rounded-xl md:rounded-3xl">
          <Image
            source={{uri: `${PHOTO_URL_END_POINT}/${product.image}`}}
            className="w-24 h-32 md:w-44 md:h-56"
            resizeMode="contain"
          />
        </View>
        <Pressable className="absolute right-1 top-1 md:right-2 md:top-2 rounded-full p-1 md:p-2 bg-slate-50 shadow-md">
          <FavouriteIcon {...{colorScheme}} fill={'none'} stroke={'#000'} />
        </Pressable>
      </View>
      <View className="flex-1">
        <View className="flex-row items-center my-1">
          <ThemedText size={'xs_12'}>PPT </ThemedText>
          <RatingIcon />
          <ThemedText size={'xs_12'}> 4.3</ThemedText>
          <ThemedText variant={'grey'} size={'xs_12'}>
            {' '}
            (230)
          </ThemedText>
        </View>
        <ThemedText weight={'bold'}>{product.name}</ThemedText>
        <ThemedText variant={'grey'} size={'xs_12'} className="mb-1 md:mb-2">
          {product.description.slice(0, 40) + '...'}
        </ThemedText>

        <ThemedText variant={'error'} size={'xs_12'}>
          {product.category.name}
        </ThemedText>
        <ThemedText variant={'green'} weight={'bold'}>
          ${product.price}
        </ThemedText>
      </View>
    </Pressable>
  );
};

export default memo(ProductItem);
