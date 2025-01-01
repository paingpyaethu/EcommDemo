import React from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import { ProfileScreen} from '@/screens';
import {ProfileTabStackParamList} from '@/types/navigation/root';
import {Dimensions, Platform} from 'react-native';
import {useTheme} from '@/context/ThemeProvider';
import {isTablet} from 'react-native-device-info';
import OrderScreen from '@/screens/Profile/Orders/OrderScreen';

const Stack = createStackNavigator<ProfileTabStackParamList>();

const {height} = Dimensions.get('window');

const ProfileTabStackNavigator = () => {
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
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{...headerOption, headerTitle: 'My Orders'}}
      />
    </Stack.Navigator>
  );
};

export default ProfileTabStackNavigator;
