import React, {memo} from 'react';
import {Pressable} from 'react-native';

interface ProductColorBoxProps {
  bgColor: string;
  onPressColorBox: () => void;
}
const ProductColorBox = ({bgColor, onPressColorBox}: ProductColorBoxProps) => {
  return (
    <Pressable
      onPress={onPressColorBox}
      className="w-8 h-8 md:w-16 md:h-16 rounded-full border md:border-2 border-ecomm-grey mx-1 md:mx-2"
      style={{backgroundColor: bgColor}}
    />
  );
};

export default memo(ProductColorBox);
