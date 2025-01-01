import React from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import {HomeScreen, ProductDetailScreen} from '@/screens';
import {HomeTabStackParamList} from '@/types/navigation/root';
import {Dimensions, Platform} from 'react-native';
import {useTheme} from '@/context/ThemeProvider';
import {isTablet} from 'react-native-device-info';

const Stack = createStackNavigator<HomeTabStackParamList>();

const {height} = Dimensions.get('window');

const HomeTabStackNavigator = () => {
  const {colorScheme} = useTheme();

  const headerOption: StackNavigationOptions = {
    headerStyle: {
      backgroundColor: colorScheme === 'light' ? 'white' : 'black',
      height: Platform.OS == 'ios' ? height * 0.12 : height * 0.08,
    },
    headerTintColor: colorScheme === 'light' ? '#272422' : 'white',
    headerTitleStyle: {
      fontFamily: 'Montserrat-Medium',
      fontSize: isTablet() ? 28 : 14,
    },
    headerTitleAlign: 'center',
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackButtonDisplayMode: 'minimal',
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={headerOption}
      />
    </Stack.Navigator>
  );
};

export default HomeTabStackNavigator;
