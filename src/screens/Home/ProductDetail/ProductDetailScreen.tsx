import {ThemedText} from '@/components/atoms';
import {ProductColorBox, ProductSizeBox} from '@/components/molecules';
import ProductCarousel from '@/components/organisms/ProductDetail/ProductCarousel/ProductCarousel';
import {SafeScreen} from '@/components/template';
import {useGetProductByIdQuery} from '@/store/features/product/productApi';
import {
  ProductDetailScreenNavigationProp,
  ProductDetailScreenRouteProp,
} from '@/types/navigation/root';
import {AddToCartIcon, RatingIcon} from '@/utils/svg/icon.common';
import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Pressable,
} from 'react-native';
import {isTablet} from 'react-native-device-info';
import BottomSheet from '@gorhom/bottom-sheet';
import ProductDetailBottomSheet from '@/components/organisms/ProductDetail/ProductDetailBottomSheet/ProductDetailBottomSheet';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/store';
import {showToast} from '@/utils/toastConfig';
import {useHeaderHeight} from '@react-navigation/elements';
import {Cart, CartItem, addCart} from '@/store/features/cart/cartSlice';
import CartBadge from '@/components/molecules/common/CartBadge/CartBadge';

const {height} = Dimensions.get('window');

const ProductDetailScreen = ({
  navigation,
  route,
}: {
  navigation: ProductDetailScreenNavigationProp;
  route: ProductDetailScreenRouteProp;
}) => {
  const headerHeight = useHeaderHeight();

  const {productId} = route.params;

  const dispatch = useDispatch();
  const {cartList} = useSelector((state: RootState) => state.carts);

  const {data: productDetailData, isSuccess} =
    useGetProductByIdQuery(productId);

  let cartArray: CartItem[] = [];
  if (cartList.length > 0) {
    const list = cartList.find(item => item.id == productId);
    if (list) {
      cartArray = list.items;
    }
  }
  const [cart, setCart] = useState(cartArray);

  const [color, setColor] = useState<string | undefined>(undefined);
  const [size, setSize] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleOpenPress = useCallback(
    () => bottomSheetRef.current?.snapToIndex(1),
    [],
  );

  const handleSelectColor = useCallback((selectedColor: string) => {
    setColor(selectedColor);
  }, []);

  const handleSelectSize = useCallback((selectedSize: string) => {
    setSize(selectedSize);
  }, []);

  const increaseQuantity = useCallback(() => {
    if (!color || !size) {
      return showToast({
        type: 'error',
        text1: 'Please choose color & size.',
      });
    }
    setQuantity(q => q + 1);
  }, [color, size]);

  const decreaseQuantity = useCallback(() => {
    if (quantity == 1) return;
    setQuantity(q => q - 1);
  }, [quantity]);

  const saveCartItem = useCallback(() => {
    if (!color || !size) {
      return showToast({
        type: 'error',
        text1: 'Please choose color & size.',
      });
    }
    setCart(prev => [
      {id: new Date().getTime(), color, size, quantity},
      ...prev,
    ]);
    setQuantity(1);
  }, [color, size, quantity]);

  const removeSavedCartItem = useCallback((id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  const addItemsToCart = useCallback(() => {
    if (!productDetailData) {
      return;
    }
    const cartItem: Cart = {
      id: productDetailData.id,
      name: productDetailData.name,
      price: parseInt(productDetailData.price),
      image: productDetailData.image,
      items: cart,
    };
    dispatch(addCart(cartItem));
  }, [cart, productDetailData]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            navigation.navigate('CartTab');
          }}>
          <CartBadge />
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <SafeScreen>
      {!isSuccess ? (
        <ActivityIndicator
          className="flex-1"
          size={isTablet() ? 'large' : 'small'}
          color={'#8F5F43'}
        />
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{minHeight: '100%'}}>
            <ProductCarousel />
            <View className="mx-3 md:mx-6">
              {/* Product Item Info Section */}
              <View className="flex-1 mt-3 md:mt-6">
                <View className="flex-row items-center mb-1">
                  <ThemedText size={'xs_12'}>PPT </ThemedText>
                  <RatingIcon />
                  <ThemedText size={'xs_12'}> 4.3</ThemedText>
                  <ThemedText variant={'grey'} size={'xs_12'}>
                    {' '}
                    (230)
                  </ThemedText>
                </View>
                <ThemedText weight={'bold'}>
                  {productDetailData?.name}
                </ThemedText>
                <ThemedText
                  variant={'grey'}
                  size={'xs_12'}
                  className="mb-1 md:mb-2">
                  {productDetailData?.description.slice(0, 200) + '...'}
                </ThemedText>

                <ThemedText variant={'error'} size={'xs_12'}>
                  {productDetailData?.category.name}
                </ThemedText>
                <ThemedText variant={'green'} weight={'bold'}>
                  ${productDetailData?.price}
                </ThemedText>
              </View>
              {/* Product Item Info Section */}

              {/* Colors Section */}
              <View className="mt-4 md:mt-8">
                <ThemedText>Choose Colors</ThemedText>
                <View className="flex-row mt-2 md:mt-4">
                  {productDetailData?.colors?.map(item => (
                    <ProductColorBox
                      key={item.id}
                      bgColor={item.color.bgColor}
                      onPressColorBox={handleOpenPress}
                    />
                  ))}
                </View>
              </View>
              {/* Colors Section */}

              {/* Sizes Section */}
              <View className="mt-4 md:mt-8">
                <ThemedText>Sizes</ThemedText>
                <View className="flex-row mt-2 md:mt-4">
                  {productDetailData?.sizes?.map(item => (
                    <ProductSizeBox
                      key={item.id}
                      name={item.size.name}
                      onPressSizeBox={handleOpenPress}
                    />
                  ))}
                </View>
              </View>
              {/* Sizes Section */}

              {/* Order List Section */}
              <View className="my-4 md:my-8">
                {cart.length > 0 && (
                  <View className="flex-row items-center justify-between mb-1 md:mb-2">
                    <ThemedText>Order Lists</ThemedText>
                    <Pressable
                      className="flex-row items-center border border-emerald-700  py-1 md:py-2 px-3 md:px-6 rounded-md md:rounded-xl"
                      onPress={addItemsToCart}>
                      <AddToCartIcon />
                      <ThemedText
                        variant={'green'}
                        size={'xs_12'}
                        className="ml-1 md:ml-2">
                        Add
                      </ThemedText>
                    </Pressable>
                  </View>
                )}
                {cart.length > 0 &&
                  cart.map(item => (
                    <View
                      key={item.id}
                      className="flex-row items-center justify-between w-full p-2 px-3 md:p-4 md:px-6 my-1 md:my-2 shadow-sm bg-slate-100 dark:bg-slate-800 rounded-md md:rounded-xl">
                      <ThemedText>
                        {item.color.toUpperCase()} - {item.size} - ( $
                        {(
                          parseInt(productDetailData.price) * item.quantity
                        ).toFixed(2)}{' '}
                        )
                      </ThemedText>
                      <ThemedText>( {item.quantity} )</ThemedText>
                    </View>
                  ))}
              </View>
              {/* Order List Section */}
            </View>
          </ScrollView>
          <ProductDetailBottomSheet
            bottomSheetRef={bottomSheetRef}
            color={color}
            size={size}
            quantity={quantity}
            onSelectColor={handleSelectColor}
            onSelectSize={handleSelectSize}
            productDetailData={productDetailData}
            handleSaveCartItem={saveCartItem}
            handleRemoveSavedCartItem={removeSavedCartItem}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            cart={cart}
          />
        </>
      )}
    </SafeScreen>
  );
};

export default ProductDetailScreen;
