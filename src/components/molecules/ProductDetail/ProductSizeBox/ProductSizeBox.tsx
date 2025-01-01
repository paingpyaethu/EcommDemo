import React, {memo} from 'react';
import {Pressable} from 'react-native';
import {ThemedText} from '@/components/atoms';

interface ProductSizeBoxProps {
  name: string;
  onPressSizeBox: () => void;
}
const ProductSizeBox = ({name, onPressSizeBox}: ProductSizeBoxProps) => {
  return (
    <Pressable
      onPress={onPressSizeBox}
      className="w-8 h-8 md:w-16 md:h-16 bg-ecomm-primary rounded-full items-center justify-center border md:border-2 border-ecomm-grey mx-1 md:mx-2">
      <ThemedText variant={'button'} size={'xs_12'}>{name}</ThemedText>
    </Pressable>
  );
};

export default memo(ProductSizeBox);
