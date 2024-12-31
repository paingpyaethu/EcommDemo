import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  theme: 'light' | 'dark';
  useSystemTheme: boolean;
}

const initialState: ThemeState = {
  theme: 'light',
  useSystemTheme: true,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    toggleUseSystemTheme: (state) => {
      state.useSystemTheme = !state.useSystemTheme;
    },
  },
});

export const { setTheme, toggleUseSystemTheme } = themeSlice.actions;

export default themeSlice.reducer;
