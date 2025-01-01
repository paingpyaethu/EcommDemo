import React, {useCallback, useMemo} from 'react';
import {Platform, Pressable, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import {useTheme} from '@/context/ThemeProvider';
import {ThemedText} from '@/components/atoms';
import {isTablet} from 'react-native-device-info';
import {ProductColorBox, ProductSizeBox} from '@/components/molecules';
import {
  CloseIcon,
  MinusIcon,
  PlusIcon,
  SaveIcon,
} from '@/utils/svg/icon.common';
import {flatlistKeyExtractor} from '@/utils/helpers';
import {cn} from '@/utils/twutil';

interface ProductDetailBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  color: string | undefined;
  size: string | undefined;
  quantity: number;
  onSelectColor: (color: string) => void;
  onSelectSize: (size: string) => void;
  productDetailData: IProductDetailData;
  cart: any[];
  handleSaveCartItem: () => void;
  handleRemoveSavedCartItem: (id: number) => void;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
}
const ProductDetailBottomSheet = ({
  bottomSheetRef,
  color,
  size,
  quantity,
  onSelectColor,
  onSelectSize,
  productDetailData,
  cart,
  handleSaveCartItem,
  handleRemoveSavedCartItem,
  increaseQuantity,
  decreaseQuantity,
}: ProductDetailBottomSheetProps) => {
  const {colorScheme} = useTheme();

  const snapPoints = useMemo(() => ['50%', '75%', '100%'], []); // renders
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.1}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
      />
    ),
    [],
  );

  const renderSheetItem = useCallback(
    ({item}: any) => (
      <View className="flex-row items-center justify-between w-11/12 p-2 px-3 md:p-4 md:px-6 my-1 md:my-2 shadow-sm bg-white dark:bg-slate-800 rounded-md md:rounded-xl">
        <View className="flex-row justify-between">
          <ThemedText>
            {item.color.toUpperCase()} - {item.size} - ( $
            {(parseInt(productDetailData.price) * item.quantity).toFixed(2)} )
          </ThemedText>
          <ThemedText className="ml-3 md:ml-6">( {item.quantity} )</ThemedText>
        </View>
        <Pressable onPress={() => handleRemoveSavedCartItem(item.id)}>
          <CloseIcon fill={colorScheme === 'light' ? '#000000' : '#f8fafc'} />
        </Pressable>
      </View>
    ),
    [productDetailData],
  );
  return (
    <BottomSheet
      index={-1}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={{
        backgroundColor: colorScheme === 'light' ? '#f8fafc' : '#18181b',
      }}
      handleIndicatorStyle={{
        backgroundColor: colorScheme === 'light' ? '#000000' : '#f8fafc',
      }}>
      <BottomSheetView style={{flexDirection: 'row'}}>
        <View className="w-1/2 items-center">
          <ThemedText>Choose Color</ThemedText>
        </View>
        <View className="w-1/2 items-center">
          <ThemedText>Choose Size</ThemedText>
        </View>
      </BottomSheetView>
      {/* Color and Size Picker */}
      <View
        className={cn(
          'flex-row justify-center -my-7 md:-my-3',
          Platform.OS === 'android' && 'my-4 md:my-8',
        )}>
        <Picker
          selectedValue={color}
          onValueChange={itemValue => onSelectColor(itemValue)}
          style={{
            width: '45%',
            marginRight: 10,
            color: colorScheme === 'light' ? '#272422' : '#FFFFFF',
            backgroundColor: Platform.OS === 'android' ?  colorScheme === 'light' ? '#e2e8f0' : '#374151' : '',
          }}
          itemStyle={{
            fontSize: isTablet() ? 28 : 14,
            fontFamily: 'Montserrat-Bold',
            color: colorScheme === 'light' ? '#272422' : '#FFFFFF',
          }}>
          {productDetailData.colors.map(item => {
            if (!item.stock) return;
            return (
              <Picker.Item
                key={item.id}
                label={item.color.name}
                value={item.color.name}
              />
            );
          })}
        </Picker>
        <Picker
          selectedValue={size}
          onValueChange={itemValue => onSelectSize(itemValue)}
          style={{
            width: '45%',
            marginRight: 10,
            color: colorScheme === 'light' ? '#272422' : '#FFFFFF',
            backgroundColor: Platform.OS === 'android' ?  colorScheme === 'light' ? '#e2e8f0' : '#374151' : '',
          }}
          itemStyle={{
            fontSize: isTablet() ? 28 : 14,
            fontFamily: 'Montserrat-Bold',
            color: colorScheme === 'light' ? '#272422' : '#FFFFFF',
          }}>
          {productDetailData.sizes.map(item => {
            if (!item.stock) return;
            return (
              <Picker.Item
                key={item.id}
                label={item.size.name}
                value={item.size.name}
              />
            );
          })}
        </Picker>
      </View>
      {/* Color and Size Picker */}

      <View className="flex-row items-center justify-around mx-3 md:mx-6 mb-3 md:mb-6">
        {(color || size) && (
          <>
            <View className="flex-row items-center justify-center bg-slate-200 dark:bg-gray-700 h-12 w-32 md:h-24 md:w-60 rounded-lg md:rounded-3xl mr-2 md:mr-4">
              {productDetailData.colors.map(item =>
                item.color.name === color ? (
                  <ProductColorBox
                    key={item.id}
                    bgColor={item.color.bgColor}
                    onPressColorBox={() => {}}
                  />
                ) : null,
              )}
              {productDetailData.sizes.map(item =>
                item.size.name === size ? (
                  <ProductSizeBox
                    key={item.id}
                    name={item.size.name}
                    onPressSizeBox={() => {}}
                  />
                ) : null,
              )}
            </View>
            <View className="flex-row items-center justify-around bg-slate-200 dark:bg-gray-700 h-12 w-36 md:h-24 md:w-60 rounded-lg md:rounded-3xl">
              <Pressable onPress={increaseQuantity}>
                <PlusIcon
                  fill={colorScheme === 'light' ? '#047857' : '#059669'}
                />
              </Pressable>
              <ThemedText>{quantity}</ThemedText>
              <Pressable onPress={decreaseQuantity}>
                <MinusIcon
                  fill={colorScheme === 'light' ? '#374151' : '#cbd5e1'}
                />
              </Pressable>
            </View>
            <Pressable onPress={handleSaveCartItem}>
              <SaveIcon />
            </Pressable>
          </>
        )}
      </View>
      {cart.length > 0 && (
        <BottomSheetFlatList
          data={cart}
          keyExtractor={flatlistKeyExtractor}
          renderItem={renderSheetItem}
          contentContainerStyle={{
            zIndex: 1,
            alignItems: 'center',
            paddingVertical: isTablet() ? 20 : 10,
          }}
        />
      )}
    </BottomSheet>
  );
};

export default ProductDetailBottomSheet;