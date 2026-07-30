import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Logo from "./Logo";

import {
  Colors,
  Fonts,
  Spacing,
} from "../../theme";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

const AuthHeader = ({
  title,
  subtitle,
}: AuthHeaderProps) => {
  return (
    <View style={styles.container}>

      <Logo />

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.subtitle}>
        {subtitle}
      </Text>

    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({

  container: {
    alignItems: "center",
    marginBottom: Spacing.xxl,
  },

  title: {
    marginTop: Spacing.lg,
    fontSize: 30,
    color: Colors.text,
    fontFamily: Fonts.bold,
  },

  subtitle: {
    marginTop: Spacing.sm,
    fontSize: 15,
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    textAlign: "center",
  },

});