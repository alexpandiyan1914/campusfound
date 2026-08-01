import { View, Text, StyleSheet } from "react-native";

import { Colors, Fonts } from "../../theme";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CampusFound</Text>
      <Text style={styles.subtitle}>
        Home Screen
      </Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },

  title: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: Colors.primary,
  },

  subtitle: {
    marginTop: 8,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
});