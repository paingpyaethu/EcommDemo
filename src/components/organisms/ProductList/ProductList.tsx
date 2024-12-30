import React, {useState} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import Categories from '@/components/molecules/Home/Categories/Categories';
import ProductItem from '@/components/molecules/Home/ProductItem/ProductItem';
import {
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} from '@/store/features/product/productApi';
import EmptyData from '@/components/atoms/common/EmptyData/EmptyData';

const ProductList = () => {
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

  if (!isSuccess || !isCategoriesSuccess) {
    return <ActivityIndicator style={styles.loader} />;
  }

  const renderFooter = () => {
    if (!isFetching) return null;
    return <ActivityIndicator style={styles.loader} />;
  };

  return (
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
          renderItem={({item}) => <ProductItem product={item} />}
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
});

export default ProductList;
