import React from 'react';
import {View} from 'react-native';
import {MyDetailIcon, OrderIcon} from '@/utils/svg/icon.profile';
import {MenuItem} from '@/components/molecules';
import {useColorScheme} from 'nativewind';

interface MenuItemListProps {
  onPressMyDetail: () => void;
}
const MenuItemList = ({onPressMyDetail}: MenuItemListProps) => {
  const {colorScheme} = useColorScheme();

  return (
    <View className="bg-white dark:bg-slate-600 shadow-sm rounded-lg m-5 md:m-10">
      <MenuItem
        icon={
          <OrderIcon
            {...{colorScheme}}
            stroke={colorScheme === 'light' ? '#1C274C' : '#FFFFFF'}
          />
        }
        text="My Orders"
        onPress={() => {}}
      />
      <View className="border-b border-b-ecomm-grey mx-4 md:mx-8" />
      <MenuItem
        icon={
          <MyDetailIcon
            {...{colorScheme}}
            fill={colorScheme === 'light' ? '#1C274C' : '#FFFFFF'}
          />
        }
        text="My Details"
        onPress={onPressMyDetail}
      />
    </View>
  );
};

export default MenuItemList;
