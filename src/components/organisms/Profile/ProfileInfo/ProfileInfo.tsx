import React from 'react';
import {View, Image} from 'react-native';
import {cn} from '@/utils/twutil';
import {ThemedText} from '@/components/atoms';

const ProfileInfo = ({name, image}: {name: string; image: any}) => {
  return (
    <View className="flex-1 items-center justify-center">
      {/* Profile Picture Section */}
      <View className="relative">
        <Image
          source={image}
          className={cn(
            'w-24 h-24 md:w-48 md:h-48 rounded-full border-2 md:border-[4px] border-ecomm-primary',
          )}
        />
      </View>
      {/* Name */}
      <ThemedText size={'xl_20'} weight={'bold'} className="mt-3 md:mt-6">
        {name}
      </ThemedText>
    </View>
  );
};

export default ProfileInfo;
