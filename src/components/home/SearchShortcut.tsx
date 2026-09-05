import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  Colors,
  Fonts,
  Radius,
  Shadows,
  Spacing,
} from "../../theme";

const SearchShortcut = () => {
  const navigation =
    useNavigation<any>();

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("Search")
      }
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color={Colors.primary}
        />
      </View>

      <Text style={styles.placeholder}>
        Search found items...
      </Text>

      <Ionicons
        name="chevron-forward"
        size={19}
        color={Colors.gray400}
      />
    </TouchableOpacity>
  );
};

export default SearchShortcut;

const styles = StyleSheet.create({
  container: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },

  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primarySoft,
  },

  placeholder: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.gray500,
  },
});