import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {CheckoutScreen, OnboardingScreen} from '@/screens';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/navigation/root';
import {AuthStackNavigator} from './stacks';
import {useSelector} from 'react-redux';
import {RootState} from '@/store';
import {navigationRef} from '@/utils/navigationUtil';
import BottomTabNavigator from './tabs/BottomTabNavigator';
import { useTheme } from '@/context/ThemeProvider';

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
  const { colorScheme } = useTheme();
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

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef} theme={theme}>
        <Stack.Navigator initialRouteName={initialRouteName}>
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
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default ApplicationNavigator;
