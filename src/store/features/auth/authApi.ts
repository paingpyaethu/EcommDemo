import {AuthTokenKey, authStorage} from '@/utils/storage';
import {api} from '../api';
import {login_api, register_api} from '@/api/config/endpoint';
import {setIsAuthenticated} from '../user/userSlice';
import {resetAndNavigate} from '@/utils/navigationUtil';

interface IAuthInfoResType {
  success: boolean;
  data: IAuthUserInfoData;
  accessToken: string;
}

interface IAuthUserInfoData {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string;
}

export const authApi = api.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation<
      IAuthInfoResType,
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
      IAuthInfoResType,
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
          resetAndNavigate('BottomTabs');
        } catch (error) {
          console.log('🚀 ~ onQueryStarted ~ error:', error);
        }
      },
    }),
  }),
});

export const {useRegisterMutation, useLoginMutation} = authApi;
