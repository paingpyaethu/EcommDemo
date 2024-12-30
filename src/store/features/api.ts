import { API_END_POINT } from "@/api/config/endpoint";
import { authStorage, AuthTokenKey } from "@/utils/storage";
import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";

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

  return baseQuery(args, api, extraOptions);
};

const staggeredBaseQuery = retry(customBaseQuery);

export const api = createApi({
  baseQuery: staggeredBaseQuery,
  reducerPath: "api",
  tagTypes: ['Categories','Products'],
  endpoints: builder => ({}),
});
