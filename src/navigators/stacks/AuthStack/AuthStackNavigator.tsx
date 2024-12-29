import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen, SignupScreen} from '@/screens';
import {AuthStackParamList} from '@/types/navigation/root';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
