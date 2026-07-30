import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import ScreenContainer from "./ScreenContainer";
import { Spacing } from "../../theme";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <ScreenContainer scrollable>
      <View style={styles.container}>
        {children}
      </View>
    </ScreenContainer>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: Spacing.xxl,
  },
});