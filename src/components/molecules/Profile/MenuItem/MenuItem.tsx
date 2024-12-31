import React from 'react';
import {Pressable} from 'react-native';
import {ThemedText} from '@/components/atoms';

const MenuItem = ({
  icon,
  text,
  onPress,
}: {
  icon: React.ReactElement;
  text: string;
  onPress: () => void;
}) => {
  return (
    <Pressable className="flex-row items-center p-4 md:p-8" onPress={onPress}>
      {icon}
      <ThemedText className="ml-2 md:ml-4">{text}</ThemedText>
    </Pressable>
  );
};

export default MenuItem;
