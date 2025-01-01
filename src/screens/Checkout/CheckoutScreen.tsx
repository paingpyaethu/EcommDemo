import {
  View,
  FlatList,
  Alert,
  ActivityIndicator,
  Platform,
  Dimensions,
} from 'react-native';
import React, {useCallback, useLayoutEffect} from 'react';
import {SafeScreen} from '@/components/template';
import {ThemedButton, ThemedText} from '@/components/atoms';
import {ThemedTextInput} from '@/components/molecules';
import {FormProvider, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/store';
import {isTablet} from 'react-native-device-info';
import CartItem from '@/components/organisms/Carts/CartItem/CartItem';
import {Cart, clearCart, deleteCart} from '@/store/features/cart/cartSlice';
import {useTheme} from '@/context/ThemeProvider';
import {useCreateOrderMutation} from '@/store/features/order/orderApi';
import {showToast} from '@/utils/toastConfig';
import {StackNavigationOptions} from '@react-navigation/stack';
import {CheckoutScreenNavigationProp} from '@/types/navigation/root';

const {height} = Dimensions.get('window');

const formSchema = z.object({
  address: z.string().min(3, {
    message: 'Address must be at least 2 characters.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const CheckoutScreen = ({
  navigation,
}: {
  navigation: CheckoutScreenNavigationProp;
}) => {
  const {colorScheme} = useTheme();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: '',
    },
  });

  const dispatch = useDispatch();

  const {cartList} = useSelector((state: RootState) => state.carts);
  let totalPrice = 0;
  if (cartList.length > 0) {
    cartList.forEach(cart => {
      const total = cart.items.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      totalPrice += total * cart.price;
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

  const [createOrderMutation, {isLoading}] = useCreateOrderMutation();

  const onSubmit = async (values: FormValues) => {
    try {
      const payload = await createOrderMutation({
        ...cartList,
        address: values.address,
        totalPrice,
      }).unwrap();
      if (payload.success) {
        showToast({
          type: 'success',
          text1: 'Your order placed successfully!',
        });
        dispatch(clearCart());
        navigation.replace('BottomTabs', {
          screen: 'ProfileTabStack',
          params: {
            screen: 'OrderScreen',
          },
        });
      }
    } catch (error: any) {
      showToast({
        type: 'error',
        text1: error?.data?.message ?? 'Something went wrong!',
      });
    }
  };

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

  // Set Header Options //
  const headerOption: StackNavigationOptions = {
    headerStyle: {
      backgroundColor: colorScheme === 'light' ? 'white' : '#0D0D0D',
      height: Platform.OS == 'ios' ? height * 0.12 : height * 0.08,
    },
    headerTintColor: colorScheme === 'light' ? '#272422' : 'white',
    headerTitleStyle: {
      fontFamily: 'Montserrat-Medium',
      fontSize: isTablet() ? 28 : 14,
    },
    headerTitleAlign: 'center',
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      ...headerOption,
      headerBackButtonDisplayMode: 'minimal',
    });
  }, [navigation]);
  // Set Header Options //

  return (
    <FormProvider {...form}>
      <SafeScreen>
        <View className="m-5 md:m-10">
          <ThemedTextInput
            label="Shipping Address"
            name="address"
            placeholder="Please add your shipping address"
            placeholderTextColor={'grey'}
          />

          <ThemedText weight={'semibold'}>Order Information</ThemedText>
          <FlatList
            data={cartList}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: isTablet() ? 32 : 16,
              paddingBottom: isTablet() ? 200 : 100,
            }}
          />
        </View>
      </SafeScreen>
      <View className="mx-5 md:mx-10 mb-6 md:mb-12">
          <ThemedButton onPress={form.handleSubmit(onSubmit)}>
            {isLoading ? (
              <ActivityIndicator
                color={'#fff'}
                size={isTablet() ? 'large' : 'small'}
              />
            ) : (
              <ThemedText variant={'button'}>Place order</ThemedText>
            )}
          </ThemedButton>
        </View>
    </FormProvider>
  );
};

export default CheckoutScreen;
