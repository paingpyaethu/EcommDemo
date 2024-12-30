import React from 'react';
import {Pressable, FlatList} from 'react-native';
import {ThemedText} from '@/components/atoms';
import {flatlistKeyExtractor} from '@/utils/helpers';
import {cn} from '@/utils/twutil';

interface ICategoriesProps {
  categories: ICategoryData[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const Categories = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: ICategoriesProps) => {
  return (
    <FlatList
      data={categories}
      horizontal
      keyExtractor={flatlistKeyExtractor}
      renderItem={({item}) => (
        <Pressable
          className={cn(
            'py-2 md:py-4 px-4 md:px-8 rounded-full border border-ecomm-grey mr-3 md:mr-6',
            `${
              selectedCategory === item.name &&
              'bg-ecomm-primary border-ecomm-primary'
            }`,
          )}
          onPress={() => onSelectCategory(item.name)}>
          <ThemedText
            variant={selectedCategory === item.name ? 'button' : 'default'}
            size={'xs_12'}>
            {item.name}
          </ThemedText>
        </Pressable>
      )}
    />
  );
};

export default Categories;
