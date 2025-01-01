import {ThemedText} from '@/components/atoms';
import CartItem from '@/components/organisms/Carts/CartItem/CartItem';
import {SafeScreen} from '@/components/template';
import {useTheme} from '@/context/ThemeProvider';
import {RootState} from '@/store';
import {Cart, deleteCart} from '@/store/features/cart/cartSlice';
import {CheckoutIcon} from '@/utils/svg/icon.common';
import {cn} from '@/utils/twutil';
import React, {useCallback} from 'react';
import {View, Alert, Pressable, FlatList} from 'react-native';
import {isTablet} from 'react-native-device-info';
import {useDispatch, useSelector} from 'react-redux';

const CartScreen = () => {
  const {colorScheme} = useTheme();
  const dispatch = useDispatch();

  const {cartList} = useSelector((state: RootState) => state.carts);

  let totalAmount = 0;
  if (cartList.length > 0) {
    cartList.forEach(cart => {
      const total = cart.items.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      totalAmount += total * cart.price;
    });
  }

  const handleDeleteCart = useCallback(
    (id: number, itemId: number, title: string) =>
      Alert.alert('Delete it!', `Do you want to delete ${title} from cart?`, [
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => dispatch(deleteCart({id, itemId}))},
      ]),
    [],
  );

  const renderItem = useCallback(({item}: {item: Cart}) => {
    return (
      <CartItem
        cart={item}
        colorScheme={colorScheme}
        dispatch={dispatch}
        onRemove={handleDeleteCart}
      />
    );
  }, []);

  return (
    <SafeScreen>
      <View className="px-5 md:px-10 py-2 md:py-4">
        <View className="flex-row items-center justify-between mb-6 md:mb-12 mt-3 md:mt-6">
          <View className="flex-row">
            <ThemedText variant={'green'} weight={'bold'}>
              $
            </ThemedText>
            <ThemedText variant={'green'} size={'xl_20'} weight={'bold'}>
              {totalAmount.toFixed(2)}
            </ThemedText>
          </View>
          <Pressable
            className={cn(
              'flex-row items-center bg-ecomm-primary py-2 md:py-4 px-3 md:px-6 rounded-md md:rounded-2xl',
            )}>
            <CheckoutIcon />
            <ThemedText variant={'button'} size={'xs_12'} className="ml-1">
              Checkout
            </ThemedText>
          </Pressable>
        </View>

        <FlatList
          data={cartList}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: isTablet() ? 32 : 16,
            paddingBottom: isTablet() ? 64 : 46,
          }}
        />
      </View>
    </SafeScreen>
  );
};

export default CartScreen;
