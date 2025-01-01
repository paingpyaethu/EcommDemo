import {
  CartScreen,
  FavouriteScreen,
  HomeScreen,
  ProfileScreen,
} from '@/screens';
import {BottomTabParamList} from '@/types/navigation/root';
import {
  HomeTabIcon,
  FavouriteTabIcon,
  ProfileTabIcon,
  CartTabIcon,
} from '@/utils/svg/icon.bottomtab';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useColorScheme} from 'nativewind';
import {Dimensions, Platform, View} from 'react-native';
import {HomeTabStackNavigator} from '../stacks';
import {useSelector} from 'react-redux';
import {selectCount} from '@/store/features/cart/cartSlice';
import {ThemedText} from '@/components/atoms';

const {height} = Dimensions.get('window');

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  const {colorScheme} = useColorScheme();
  const count = useSelector(selectCount);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#0D0D0D' : '#FFFFFF',
          height: Platform.OS == 'ios' ? height * 0.1 : height * 0.08,
          paddingTop: height * 0.01,
        },
      }}>
      <Tab.Screen
        name="HomeTabStack"
        component={HomeTabStackNavigator}
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
        name="CartTab"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View className="flex-row mr-2 md:mr-4">
              <CartTabIcon colorScheme={colorScheme} focused={focused} />
              {count > 0 && (
                <View className="absolute top-4 right-4 md:top-8 md:right-8 bg-ecomm-text-error w-4 h-4 md:w-8 md:h-8 rounded-full items-center justify-center">
                  <ThemedText variant={'button'} size={'xs_12'}>
                    {count}
                  </ThemedText>
                </View>
              )}
            </View>
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
