import { API_END_POINT } from "@/api/config/endpoint";
import { authStorage, AuthTokenKey } from "@/utils/storage";
import {
  BaseQueryApi,
  BaseQueryArg,
  BaseQueryExtraOptions,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  RetryOptions,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import { Alert } from "react-native";
import { clearData } from "./user/userSlice";
import { resetAndNavigate } from "@/utils/navigationUtil";

const customRetryCondition = (
	error: FetchBaseQueryError,
	_: BaseQueryArg<BaseQueryFn>,
	{
		attempt,
		extraOptions: { maxRetries } = {},
	}: {
		attempt: number;
		baseQueryApi: BaseQueryApi;
		extraOptions: BaseQueryExtraOptions<BaseQueryFn> & RetryOptions;
	}
) => {
	// ***** retry on default condition ***** //
	const defaultCondition = attempt <= (maxRetries || 0);
	if (defaultCondition) {
		return true;
	}

	// ***** retry on network's errors ***** //
	if (error.status === 'FETCH_ERROR' || error.status === 'TIMEOUT_ERROR') {
		return true;
	}

	// ***** other case (application logic error), don't retry ***** //
	return false;
};

const customBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {},
) => {
  const token = await authStorage.getItem(AuthTokenKey);

  const baseQuery = fetchBaseQuery({
    baseUrl: API_END_POINT,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  const result = await baseQuery(args, api, extraOptions);

	if (result.error && (result.error.status === 401)) {
		Alert.alert('Warning', 'Your session has expired. Please log in again.');
		api.dispatch(clearData());
		resetAndNavigate('AuthStack');
	}

	return result;
};

const staggeredBaseQuery = retry(customBaseQuery, {
	maxRetries: 15,
	retryCondition: customRetryCondition as unknown as undefined,
});
export const api = createApi({
  baseQuery: staggeredBaseQuery,
  reducerPath: "api",
  tagTypes: ['Categories','Products', 'Users', 'Orders'],
  endpoints: builder => ({}),
});
