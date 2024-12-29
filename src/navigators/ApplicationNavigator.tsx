import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { OnboardingScreen } from '@/screens';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation/root';
import { AuthStackNavigator } from './stacks';

const Stack = createStackNavigator<RootStackParamList>();

const ApplicationNavigator = () => {
  return (
   <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
   </SafeAreaProvider>
  )
}

export default ApplicationNavigator