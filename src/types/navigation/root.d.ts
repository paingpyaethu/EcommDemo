import { NavigatorScreenParams } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";

type RootStackParamList = {
  Onboarding: undefined,
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  BottomTabs: undefined,
};

type BottomTabParamList = {
  HomeTab: undefined;
  FavouriteTab: undefined;
};

// ***** Auth Stack ***** //
type AuthStackParamList = {
  Login: undefined,
  Signup: undefined,
}
type AuthStackNavigationProp = StackNavigationProp<AuthStackParamList>;
// ***** Auth Stack ***** //



type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}