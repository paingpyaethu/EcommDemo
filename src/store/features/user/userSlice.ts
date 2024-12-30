import {AuthTokenKey, authStorage} from '@/utils/storage';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface UserState {
  isAlreadyLaunch: boolean;
  isAuthenticated: boolean;
}
const initialState: UserState = {
  isAlreadyLaunch: false,
  isAuthenticated: false,
};
const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAlreadyLaunch: (
      state,
      action: PayloadAction<{isAlreadyLaunch: boolean}>,
    ) => {
      state.isAlreadyLaunch = action.payload.isAlreadyLaunch;
    },
    setIsAuthenticated: (
      state,
      action: PayloadAction<{isAuthenticated: boolean}>,
    ) => {
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    clearData: state => {
      state.isAuthenticated = false;
      authStorage.removeItem(AuthTokenKey);
    },
  },
});

export const {setIsAlreadyLaunch, setIsAuthenticated, clearData} = slice.actions;

export default slice.reducer;
