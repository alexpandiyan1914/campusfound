import {
  StyleSheet,
  Text,
  View,
  Image
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  Colors,
  Fonts,
  Radius,
  Spacing,
} from "../../theme";

const WelcomeHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.brandRow}>
        <View style={styles.brandIcon}>
          <Image
            source={require('../../assets/images/campusfound-logo.png')}
            style={styles.icon}
          />
        </View>

        <Text style={styles.brandName}>
          Campus Found
        </Text>
      </View>

      <Text style={styles.title}>
        Lost something?
      </Text>

      <Text style={styles.subtitle}>
        Search recently found items and get them back safely.
      </Text>
    </View>
  );
};

export default WelcomeHeader;

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    alignContent:"center",
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
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: Colors.primary,
    letterSpacing: 0.2,
  },

  title: {
    fontSize: 29,
    lineHeight: 35,
    fontFamily: Fonts.bold,
    color: Colors.text,
  },

  subtitle: {
    marginTop: 7,
    maxWidth: 330,
    fontSize: 14,
    lineHeight: 21,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },

  icon: {
    width: 42, 
    height: 42
  },
});