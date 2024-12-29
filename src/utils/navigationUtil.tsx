import { RootStackParamList } from "@/types/navigation/root";
import { CommonActions, createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export async function prepareNavigation() {
  navigationRef.isReady();
}

export async function resetAndNavigate(routeName: string) {
  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName }],
    }),
  );
}