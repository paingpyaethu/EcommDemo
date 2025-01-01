import React, {memo} from 'react';
import {View, Image, Pressable} from 'react-native';
import {Cart, updateCart} from '@/store/features/cart/cartSlice';
import {PHOTO_URL_END_POINT} from '@/api/config/endpoint';
import {ThemedText} from '@/components/atoms';
import {MinusIcon, PlusIcon, TrashIcon} from '@/utils/svg/icon.common';
import {Dispatch, UnknownAction} from '@reduxjs/toolkit';
import SeperateLine from '@/components/atoms/common/SeperateLine/SeperateLine';

const CartItem = ({
  cart,
  colorScheme,
  onRemove,
  dispatch,
}: {
  cart: Cart;
  colorScheme: 'light' | 'dark';
  onRemove: (id: number, itemId: number, title: string) => void;
  dispatch: Dispatch<UnknownAction>;
}) => {
  const updateCartWithQuantity = (
    id: number,
    itemId: number,
    quantity: number,
  ) => {
    if (quantity < 1) {
      return;
    }
    dispatch(
      updateCart({
        id,
        itemId,
        quantity,
      }),
    );
  };

  const imageUri = {uri: `${PHOTO_URL_END_POINT}/${cart.image}`};

  return cart.items.length > 0 ? (
    cart.items.map(item => (
      <View key={item.id}>
        <View key={item.id} className="flex-row my-2 md:my-6">
          <Image
            className="-mt-8 md:-mt-16 h-32 md:h-64"
            style={{aspectRatio: 3 / 4}}
            source={imageUri}
            resizeMode="contain"
          />
          <View className="flex-1 ml-6 md:ml-12 mt-2 md:mt-4">
            <View className="flex-row items-center justify-between">
              <ThemedText weight={'semibold'} className="flex-1">
                {cart.name}
              </ThemedText>
              <Pressable onPress={() => onRemove(cart.id, item.id, cart.name)}>
                <TrashIcon />
              </Pressable>
            </View>
            <View className="flex-row items-center mt-1 md:mt-2">
              <View className="flex-row items-center">
                <ThemedText size={'xs_12'} weight={'medium'}>
                  Color:
                </ThemedText>
                <View
                  className="w-4 h-4 md:w-8 md:h-8 rounded-full border md:border-2 border-ecomm-grey mx-1 md:mx-2"
                  style={{backgroundColor: item.color}}
                />
              </View>
              <View className="flex-row items-center">
                <ThemedText size={'xs_12'} weight={'medium'}>
                  Size:
                </ThemedText>
                <ThemedText
                  size={'xs_12'}
                  className="ml-1 md:ml-2"
                  weight={'medium'}>
                  {item.size}
                </ThemedText>
              </View>
            </View>
            <View className="flex-row items-center justify-between mt-2 md:mt-4">
              <ThemedText variant={'green'} weight={'semibold'}>
                ${(cart.price * item.quantity).toFixed(2)}
              </ThemedText>
              <View className="flex-row items-center">
                <Pressable
                  onPress={() =>
                    updateCartWithQuantity(cart.id, item.id, item.quantity + 1)
                  }>
                  <PlusIcon
                    fill={colorScheme === 'light' ? '#047857' : '#059669'}
                  />
                </Pressable>
                <ThemedText className="mx-3 md:mx-6">
                  {item.quantity}
                </ThemedText>
                <Pressable
                  className={`${item.quantity === 1 && 'opacity-50'}`}
                  onPress={() =>
                    updateCartWithQuantity(cart.id, item.id, item.quantity - 1)
                  }>
                  <MinusIcon
                    fill={colorScheme === 'light' ? '#526D82' : '#cbd5e1'}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
        <SeperateLine />
      </View>
    ))
  ) : (
    <></>
  );
};

export default memo(CartItem);
