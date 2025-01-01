import {api} from '../api';
import {create_order_api} from '@/api/config/endpoint';

export const orderApi = api.injectEndpoints({
  endpoints: builder => ({
    createOrder: builder.mutation({
      query: data => ({
        url: `${create_order_api}`,
        method: 'POST',
        body: data,
      }),
      extraOptions: {maxRetries: 0},
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled;
          dispatch(api.util.invalidateTags([{type: 'Orders', id: 'LIST'}]));
        } catch (error) {}
      },
    }),
    getOrders: builder.query({
      query: () => `orders`,
      transformResponse: (response: IOrderDataResType) => response.data,
      providesTags: result =>
        result
          ? [
              ...result.map(({id}) => ({
                type: 'Orders' as const,
                id,
              })),
              {type: 'Orders', id: 'LIST'},
            ]
          : [{type: 'Orders', id: 'LIST'}],
    }),
  }),
});

export const {useCreateOrderMutation, useGetOrdersQuery} = orderApi;
