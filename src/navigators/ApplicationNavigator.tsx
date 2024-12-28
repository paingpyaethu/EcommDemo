import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { LoginScreen, OnboardingScreen } from '@/screens';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation/root';

const Stack = createStackNavigator<RootStackParamList>();

const ApplicationNavigator = () => {
  return (
   <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
   </SafeAreaProvider>
  )
}

export default ApplicationNavigator