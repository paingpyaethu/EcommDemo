import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {CheckoutScreen, CreateProductScreen, OnboardingScreen} from '@/screens';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/navigation/root';
import {AuthStackNavigator} from './stacks';
import {useSelector} from 'react-redux';
import {RootState} from '@/store';
import {navigationRef} from '@/utils/navigationUtil';
import BottomTabNavigator from './tabs/BottomTabNavigator';
import {useTheme} from '@/context/ThemeProvider';
import {Dimensions, Platform} from 'react-native';
import {isTablet} from 'react-native-device-info';

const {height} = Dimensions.get('window');

const Stack = createStackNavigator<RootStackParamList>();

const customLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
  },
};

const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#0D0D0D',
  },
};

const ApplicationNavigator = () => {
  const {colorScheme} = useTheme();
  const {isAlreadyLaunch, isAuthenticated} = useSelector(
    (state: RootState) => state.user,
  );

  const decideFirstScreen = () => {
    if (!isAlreadyLaunch) {
      return 'Onboarding';
    } else if (!isAuthenticated) {
      return 'AuthStack';
    }
    return 'BottomTabs';
  };

  const initialRouteName = decideFirstScreen();

  const theme = colorScheme === 'dark' ? customDarkTheme : customLightTheme;

  const headerOption: StackNavigationOptions = {
    headerStyle: {
      backgroundColor: colorScheme === 'light' ? 'white' : '#0D0D0D',
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
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef} theme={theme}>
        <Stack.Navigator
          initialRouteName={initialRouteName}
          screenOptions={{headerBackButtonDisplayMode: 'minimal'}}>
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AuthStack"
            component={AuthStackNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BottomTabs"
            component={BottomTabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen
            name="CreateProduct"
            component={CreateProductScreen}
            options={{...headerOption, headerTitle: 'Add Product'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default ApplicationNavigator;
