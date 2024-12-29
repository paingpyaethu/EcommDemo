import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { HomeScreen, OnboardingScreen } from '@/screens';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation/root';
import { AuthStackNavigator } from './stacks';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { navigationRef } from '@/utils/navigationUtil';

const Stack = createStackNavigator<RootStackParamList>();

const ApplicationNavigator = () => {
  const { isAlreadyLaunch, isAuthenticated } = useSelector((state: RootState) => state.user);

  const decideFirstScreen = () => {
    if (!isAlreadyLaunch) {
      return "Onboarding";
    } else if (!isAuthenticated) {
      return "AuthStack"
    }
    return "BottomTabs";
  };

  const initialRouteName = decideFirstScreen();
  return (
   <SafeAreaProvider>
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
        <Stack.Screen name="BottomTabs" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
   </SafeAreaProvider>
  )
}

export default ApplicationNavigator