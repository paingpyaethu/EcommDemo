import { StackScreenProps } from "@react-navigation/stack";

type RootStackParamList = {
  Onboarding: undefined,
  Login: undefined,
};


type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}