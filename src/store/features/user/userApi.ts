import {api} from '../api';
import {
  user_account_info_api,
  update_user_data_api,
} from '@/api/config/endpoint';

interface IUserAccountInfoResType {
  success: boolean;
  data: IUserAccountInfoData;
}

interface IUserAccountInfoData {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string;
}

export const userApi = api.injectEndpoints({
  endpoints: builder => ({
    getUserAccountInfo: builder.query({
      query: () => `user/${user_account_info_api}`,
      transformResponse: (response: IUserAccountInfoResType) => response.data,
      providesTags: result => (result ? [{type: 'Users', id: 'LIST'}] : []),
    }),
    updateUserData: builder.mutation<IUserAccountInfoResType, FormData>({
      query: formData => ({
        url: `user/${update_user_data_api}`,
        method: 'PUT',
        body: formData,
      }),
      extraOptions: {maxRetries: 0},
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled;
          dispatch(api.util.invalidateTags([{type: 'Users', id: 'LIST'}]));
        } catch (error) {}
      },
    }),
  }),
});

export const {useGetUserAccountInfoQuery, useUpdateUserDataMutation} = userApi;
