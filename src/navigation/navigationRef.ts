import {
  createNavigationContainerRef,
} from "@react-navigation/native";

import {
  MainStackParamList,
} from "./MainNavigator";

export const navigationRef = createNavigationContainerRef<MainStackParamList>();