import {api} from '../api';
import {categories_api, products_by_category_api} from '@/api/config/endpoint';

interface IProductsQuery {
  categoryName: string;
  page: number;
  limit: number;
}

export const productApi = api.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query({
      query: () => `${categories_api}`,
      transformResponse: (response: ICategoriesResType) => [
        {id: 0, name: 'All', createdAt: '', updatedAt: ''},
        ...response.data,
      ],
      providesTags: result =>
        result
          ? [
              ...result.map(({id}) => ({
                type: 'Categories' as const,
                id,
              })),
              {type: 'Categories', id: 'LIST'},
            ]
          : [{type: 'Categories', id: 'LIST'}],
    }),
    getProductsByCategory: builder.query<IProductsResType, IProductsQuery>({
      query: ({categoryName, page, limit}) =>
        `${products_by_category_api}/${categoryName}?page=${page}&limit=${limit}`,

      serializeQueryArgs: ({endpointName, queryArgs}) => {
        // ***** Use only categoryName for the cache key to ensure proper merging ***** //
        return `${endpointName}-${queryArgs.categoryName}`;
      },
      merge: (currentCache, newItems, {arg: {page}}) => {
        // ***** Merge new data with the existing cache for pagination ***** //
        return {
          ...currentCache,
          data:
            page === 1
              ? newItems.data
              : [...currentCache.data, ...newItems.data],
        };
      },
      forceRefetch: ({currentArg, previousArg}) => {
        // ***** Refetch when categoryName or page changes ***** //
        return (
          currentArg?.categoryName !== previousArg?.categoryName ||
          currentArg?.page !== previousArg?.page
        );
      },
      providesTags: result =>
        result
          ? [
              ...result.data.map(product => ({
                type: 'Products' as const,
                id: product.id,
              })),
              {type: 'Products', id: 'LIST'},
            ]
          : ['Products'],
    }),
    getProductById: builder.query<IProductDetailData, number>({
      query: productId => `products/${productId}`,
      transformResponse: (response: IProductDetailResType) => response.data,
    }),
    createProduct: builder.mutation<IProductsResType, FormData>({
      query: formData => ({
        url: 'products',
        method: 'POST',
        body: formData,
      }),
      extraOptions: {maxRetries: 0},
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled;
          dispatch(api.util.invalidateTags([{type: 'Products', id: 'LIST'}]));
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
} = productApi;
