import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, NavigationProp, NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';

type RootStackParamList = {
  Onboarding: undefined;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  BottomTabs: undefined;
};

type BottomTabParamList = {
  HomeTabStack: NavigatorScreenParams<HomeTabStackParamList>;
  FavouriteTab: undefined;
  CartTab: undefined;
  ProfileTab: undefined;
};

type HomeTabStackParamList = {
  HomeScreen: undefined;
  ProductDetailScreen: {productId: number};
};
type HomeTabStackNavigationProp = StackNavigationProp<HomeTabStackParamList>;

type HomeScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeTabStackParamList, 'HomeScreen'>,
  BottomTabNavigationProp<BottomTabParamList>
>;

type ProductDetailScreenRouteProp = RouteProp<
  HomeTabStackParamList,
  'ProductDetailScreen'
>;
type ProductDetailScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeTabStackParamList, 'ProductDetailScreen'>,
  BottomTabNavigationProp<BottomTabParamList>
>;

// ***** Auth Stack ***** //
type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};
type AuthStackNavigationProp = StackNavigationProp<AuthStackParamList>;
// ***** Auth Stack ***** //

type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
