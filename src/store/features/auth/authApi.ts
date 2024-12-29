import {AuthTokenKey, authStorage} from '@/utils/storage';
import {api} from '../api';
import {login_api, register_api} from '@/api/config/endpoint';
import {setIsAuthenticated} from '../user/useSlice';
import {resetRoot} from '@/utils/navigationUtil';

interface IUserInfoResType {
  success: boolean;
  data: IUserInfoData;
  accessToken: string;
}

interface IUserInfoData {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const authApi = api.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation<
      IUserInfoResType,
      {name: string; email: string; password: string}
    >({
      query: data => ({
        url: `${register_api}`,
        method: 'POST',
        body: data,
      }),
      extraOptions: {maxRetries: 0},
    }),
    login: builder.mutation<
      IUserInfoResType,
      {email: string; password: string}
    >({
      query: data => ({
        url: `${login_api}`,
        method: 'POST',
        body: data,
      }),
      extraOptions: {maxRetries: 0},
      async onQueryStarted(_, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;
          await authStorage.setItem(AuthTokenKey, result.data.accessToken);
          dispatch(setIsAuthenticated({isAuthenticated: true}));
          resetRoot({index: 0, routes: [{name: 'BottomTabs'}]});
        } catch (error) {
          console.log('🚀 ~ onQueryStarted ~ error:', error);
        }
      },
    }),
  }),
});

export const {useRegisterMutation, useLoginMutation} = authApi;
