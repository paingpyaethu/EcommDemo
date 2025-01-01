import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  NavigationProp,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';

type RootStackParamList = {
  Onboarding: undefined;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  BottomTabs: NavigatorScreenParams<BottomTabParamList>;
  Checkout: undefined;
  CreateProduct: undefined;
};

type BottomTabParamList = {
  HomeTabStack: NavigatorScreenParams<HomeTabStackParamList>;
  FavouriteTab: undefined;
  CartTab: undefined;
  ProfileTabStack: NavigatorScreenParams<ProfileTabStackParamList>;
};

type HomeTabStackParamList = {
  HomeScreen: undefined;
  ProductDetailScreen: {productId: number};
};

type ProfileTabStackParamList = {
  ProfileScreen: undefined;
  OrderScreen: undefined;
};

type HomeTabStackNavigationProp = StackNavigationProp<HomeTabStackParamList>;

type HomeScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'HomeScreen'>,
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

type CheckoutScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Checkout'>,
  BottomTabNavigationProp<BottomTabParamList>
>;

type ProfileTabStackNavigationProp =
  StackNavigationProp<ProfileTabStackParamList>;

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
