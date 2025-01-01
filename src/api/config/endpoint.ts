const API_END_POINT = process.env.API_END_POINT;
const PHOTO_URL_END_POINT = process.env.PHOTO_URL_END_POINT;

const register_api = 'register';
const login_api = 'login';
const categories_api = 'categories';
const products_by_category_api = 'products-by-category';
const user_account_info_api = 'account-info';
const update_user_data_api = 'update-user-data'
const create_order_api = 'orders'

export {
  API_END_POINT,
  PHOTO_URL_END_POINT,
  register_api,
  login_api,
  categories_api,
  products_by_category_api,
  user_account_info_api,
  update_user_data_api,
  create_order_api
};
