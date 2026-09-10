import React, {
  useEffect,
} from "react";

import {
  NavigationContainer,
} from "@react-navigation/native";

import * as SplashScreen
  from "expo-splash-screen";

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";

import AppNavigator
  from "./src/navigation/AppNavigator";

import {
  AuthProvider,
} from "./src/context/AuthContext";

import {
  ProfileProvider,
} from "./src/context/ProfileContext";

import {
  ClaimProvider,
} from "./src/context/ClaimContext";

import {
  FeedbackProvider,
} from "./src/context/FeedbackContext";

import {
  navigationRef,
} from "./src/navigation/navigationRef";

import NotificationHandler
  from "./src/components/NotificationHandler";

import AppUpdateChecker
  from "./src/components/update/AppUpdateChecker";

SplashScreen
  .preventAutoHideAsync()
  .catch(() => { });

export default function App() {
  const [
    fontsLoaded,
    fontError,
  ] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (
      fontsLoaded ||
      fontError
    ) {
      SplashScreen
        .hideAsync();
    }
  }, [
    fontsLoaded,
    fontError,
  ]);

  if (
    !fontsLoaded &&
    !fontError
  ) {
    return null;
  }

  return (
    <AppUpdateChecker>
      <FeedbackProvider>
        <AuthProvider>
          <ProfileProvider>
            <ClaimProvider>
              <NavigationContainer
                ref={navigationRef}
              >
                <NotificationHandler />
                <AppNavigator />
              </NavigationContainer>
            </ClaimProvider>
          </ProfileProvider>
        </AuthProvider>
      </FeedbackProvider>
    </AppUpdateChecker>
  );
}