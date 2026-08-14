import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AppNavigator from "./src/navigation/AppNavigator";

import { AuthProvider } from "./src/context/AuthContext";
import { ProfileProvider } from "./src/context/ProfileContext";
import { ClaimProvider } from "./src/context/ClaimContext";

export default function App() {

  return (

    <AuthProvider>

      <ProfileProvider>

        <ClaimProvider>

          <NavigationContainer>

            <AppNavigator />

          </NavigationContainer>
          
        </ClaimProvider>

      </ProfileProvider>

    </AuthProvider>

  );

}