import React, {useCallback, useState} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import Categories from '@/components/molecules/Home/Categories/Categories';
import ProductItem from '@/components/molecules/Home/ProductItem/ProductItem';
import {
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} from '@/store/features/product/productApi';
import EmptyData from '@/components/atoms/common/EmptyData/EmptyData';
import {isTablet} from 'react-native-device-info';
import {HomeTabStackNavigationProp} from '@/types/navigation/root';
import { useNavigation } from '@react-navigation/native';

const ProductList = () => {
  const navigation = useNavigation<HomeTabStackNavigationProp>();
  const [categoryName, setCategoryName] = useState('All');
  const [page, setPage] = useState(1);

  const {data: categories, isSuccess: isCategoriesSuccess} =
    useGetCategoriesQuery('Categories');

  const {data, isSuccess, isFetching, refetch} = useGetProductsByCategoryQuery({
    categoryName,
    page: page,
    limit: 10,
  });

  const products = data?.data || [];

  const handleLoadMore = () => {
    if (data && data.totalPages && page < data.totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleCategoryChange = (newCategory: string) => {
    if (newCategory !== categoryName) {
      setCategoryName(newCategory);
      setPage(1);
    }
  };

  const goToProductDetail = useCallback((productId: number) => {
    navigation.navigate('ProductDetailScreen', {
      productId,
    });
  }, []);

  const renderItem = useCallback(
    ({item}: {item: IProductsData}) => <ProductItem product={item} onPressProduct={goToProductDetail}/>,
    [],
  );

  const renderFooter = () => {
    if (!isFetching) return null;
    return (
      <ActivityIndicator
        className="my-3 md:my-6"
        size={isTablet() ? 'large' : 'small'}
        color={'#8F5F43'}
      />
    );
  };

  return !isSuccess || !isCategoriesSuccess ? (
    <ActivityIndicator
      className="flex-1"
      size={isTablet() ? 'large' : 'small'}
      color={'#8F5F43'}
    />
  ) : (
    <View className="flex-1 pt-2 md:pt-4">
      <View>
        <Categories
          categories={categories}
          selectedCategory={categoryName}
          onSelectCategory={handleCategoryChange}
        />
      </View>
      <View className="flex-1 pt-3 md:pt-6">
        <FlashList
          showsVerticalScrollIndicator={false}
          data={products}
          renderItem={renderItem}
          refreshing={isFetching}
          onRefresh={refetch}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={EmptyData}
          numColumns={2}
          estimatedItemSize={300}
          getItemType={item => {
            return item.id;
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    marginVertical: 20,
  },
});

export default ProductList;
