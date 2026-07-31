import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";

import PrimaryButton from "../../components/buttons/PrimaryButton";

import useAuth from "../../hooks/useAuth";

import {
  Colors,
  Fonts,
  Spacing,
} from "../../theme";

const HomeScreen = () => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
    Alert.alert(
      "Logged Out",
      "You have been logged out successfully."
    );
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        CampusFound
      </Text>

      <Text style={styles.subtitle}>
        Welcome!
      </Text>

      <Text style={styles.text}>
        Authentication is working successfully.
      </Text>

      <PrimaryButton
        title="Logout"
        onPress={handleLogout}
      />

    </View>
  );

};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: Spacing.lg,
    backgroundColor: Colors.background,
  },

  title: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: Colors.primary,
    textAlign: "center",
    marginBottom: Spacing.md,
  },

  subtitle: {
    textAlign: "center",
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    color: Colors.text,
  },

  text: {
    textAlign: "center",
    color: Colors.textSecondary,
    marginVertical: Spacing.xl,
    fontFamily: Fonts.regular,
  },
});