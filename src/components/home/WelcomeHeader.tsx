import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import {
  Colors,
  Fonts,
  Radius,
  Spacing,
} from "../../theme";

const WelcomeHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.brandIcon}>
          <Ionicons
            name="location"
            size={20}
            color={Colors.primary}
          />
        </View>

        <Text style={styles.brandName}>
          CampusFound
        </Text>
      </View>

      <Text style={styles.title}>
        Lost something?
      </Text>

      <Text style={styles.subtitle}>
        Search recently found items across your campus.
      </Text>
    </View>
  );
};

export default WelcomeHeader;

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },

  brandIcon: {
    width: 34,
    height: 34,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primarySoft,
  },

  brandName: {
    marginLeft: Spacing.sm,
    fontSize: 15,
    color: Colors.primary,
    fontFamily: Fonts.semiBold,
  },

  title: {
    fontSize: 28,
    lineHeight: 34,
    color: Colors.text,
    fontFamily: Fonts.bold,
  },

  subtitle: {
    marginTop: Spacing.sm,
    maxWidth: 310,
    fontSize: 14,
    lineHeight: 21,
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
  },
});