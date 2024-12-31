import {FavouriteScreen, HomeScreen, ProfileScreen} from '@/screens';
import {BottomTabParamList} from '@/types/navigation/root';
import { HomeTabIcon, FavouriteTabIcon, ProfileTabIcon } from '@/utils/svg/icon.bottomtab';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useColorScheme} from 'nativewind';
import {Dimensions, Platform} from 'react-native';

const {height} = Dimensions.get('window');

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  const {colorScheme} = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#0D0D0D' : '#FFFFFF',
          height: Platform.OS == 'ios' ? height * 0.1 : height * 0.08,
          paddingTop: height * 0.01
        },
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <HomeTabIcon colorScheme={colorScheme} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="FavouriteTab"
        component={FavouriteScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <FavouriteTabIcon colorScheme={colorScheme} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <ProfileTabIcon colorScheme={colorScheme} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
