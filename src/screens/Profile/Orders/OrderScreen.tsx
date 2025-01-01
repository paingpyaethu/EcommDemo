import OrderItem from '@/components/organisms/Orders/OrderItem/OrderItem';
import {SafeScreen} from '@/components/template';
import {useGetOrdersQuery} from '@/store/features/order/orderApi';
import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import {View, Text, ActivityIndicator} from 'react-native';
import {isTablet} from 'react-native-device-info';

const OrderScreen = () => {
  const {data, isSuccess} = useGetOrdersQuery('getOrders');

  const renderItem = useCallback(({item}: {item: IOrderData}) => {
    return <OrderItem orderData={item} />;
  }, []);

  return (
    <SafeScreen>
      {!isSuccess ? (
        <ActivityIndicator
          className="flex-1"
          size={isTablet() ? 'large' : 'small'}
          color={'#8F5F43'}
        />
      ) : (
        <View className="mx-5 md:mx-10">
          <FlatList
            data={data}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: isTablet() ? 32 : 16,
              paddingBottom: isTablet() ? 64 : 10,
            }}
          />
        </View>
      )}
    </SafeScreen>
  );
};

export default OrderScreen;
