import { StyleSheet, Text, View } from "react-native";
import { Colors, Fonts, Spacing } from "../../theme";

const WelcomeHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Welcome Back
      </Text>

      <Text style={styles.title}>
        CampusFound
      </Text>

      <Text style={styles.subtitle}>
        Find and report lost items across campus.
      </Text>
    </View>
  );
};

export default WelcomeHeader;

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
  },

  greeting: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontFamily: Fonts.medium,
  },

  title: {
    fontSize: 30,
    color: Colors.text,
    fontFamily: Fonts.bold,
    marginTop: 6,
  },

  subtitle: {
    marginTop: 8,
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    lineHeight: 22,
  },
});