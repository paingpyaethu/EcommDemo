import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {persistReducer, persistStore, Storage} from 'redux-persist';
import {MMKV} from 'react-native-mmkv';
import {api} from './features/api';
import user from '@/store/features/user/userSlice';
import theme from '@/store/features/theme/themeSlice';
import carts from '@/store/features/cart/cartSlice';

const reducers = combineReducers({
  [api.reducerPath]: api.reducer,
  user,
  theme,
  carts,
});

const storage = new MMKV();
export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['user', 'theme', 'carts'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware);
    return middlewares;
  },
});

export type RootState = ReturnType<typeof reducers>;

const persistor = persistStore(store);

setupListeners(store.dispatch);

export {store, persistor};
