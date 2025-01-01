import React, {memo} from 'react';
import {View, Image} from 'react-native';
import {PHOTO_URL_END_POINT} from '@/api/config/endpoint';
import {ThemedText} from '@/components/atoms';
import SeperateLine from '@/components/atoms/common/SeperateLine/SeperateLine';
import {SafeScreen} from '@/components/template';

const OrderItem = ({orderData}: {orderData: IOrderData}) => {
  const imageUri = {uri: `${PHOTO_URL_END_POINT}/${orderData.image}`};

  return (
    <SafeScreen>
      {orderData.items.map(item => (
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
                  {orderData.name}
                </ThemedText>
                <ThemedText
                  size={'xs_12'}
                  variant={
                    orderData.status === 'Pending' ? 'primary' : 'green'
                  }>
                  {orderData.status}
                </ThemedText>
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
                  ${(orderData.price * item.quantity).toFixed(2)}
                </ThemedText>
              </View>
            </View>
          </View>
          <SeperateLine />
        </View>
      ))}
    </SafeScreen>
  );
};

export default memo(OrderItem);
