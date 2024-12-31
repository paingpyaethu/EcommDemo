import React, {createContext, useContext, useEffect} from 'react';
import {Appearance} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/store';
import {setTheme, toggleUseSystemTheme} from '@/store/features/theme/themeSlice';
import {useColorScheme} from 'nativewind';

interface ThemeContextProps {
  colorScheme: 'light' | 'dark';
  toggleTheme: () => void;
  useSystemTheme: boolean;
  toggleSystemTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {colorScheme, setColorScheme} = useColorScheme();
  const dispatch = useDispatch();
  const {theme, useSystemTheme} = useSelector((state: RootState) => state.theme);
  const systemTheme = Appearance.getColorScheme();

  useEffect(() => {
    if (useSystemTheme) {
      const currentTheme = systemTheme || 'light';
      dispatch(setTheme(currentTheme));
      setColorScheme(currentTheme);
    } else {
      setColorScheme(theme);
    }
  }, [systemTheme, useSystemTheme, theme, setColorScheme, dispatch]);

  const toggleTheme = () => {
    if (useSystemTheme) {
      dispatch(toggleUseSystemTheme());
    } else {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      dispatch(setTheme(newTheme));
      setColorScheme(newTheme);
    }
  };

  const toggleSystemTheme = () => {
    dispatch(toggleUseSystemTheme());
  };

  return (
    <ThemeContext.Provider value={{colorScheme, toggleTheme, useSystemTheme, toggleSystemTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
