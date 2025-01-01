import {memo} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {ThemedText} from '@/components/atoms';
import {AddToCartIcon} from '@/utils/svg/icon.common';
import {selectCount} from '@/store/features/cart/cartSlice';
import {useTheme} from '@/context/ThemeProvider';

const CartBadge = () => {
  const {colorScheme} = useTheme();
  const count = useSelector(selectCount);

  return (
    <View className="flex-row mr-2 md:mr-4">
      <AddToCartIcon stroke={colorScheme === 'light' ? 'black' : 'white'} />
      {count > 0 && (
        <View className="bg-ecomm-text-error w-4 h-4 md:w-8 md:h-8 rounded-full items-center justify-center -ml-3 -mt-1 md:-ml-6 md:-mt-2">
          <ThemedText variant={'button'} size={'xs_12'}>
            {count}
          </ThemedText>
        </View>
      )}
    </View>
  );
};

export default memo(CartBadge);
