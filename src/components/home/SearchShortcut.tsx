import {
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import {
  Colors,
  Fonts,
  Radius,
  Shadows,
  Spacing,
} from "../../theme";


const SearchShortcut = () => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity style={styles.container}
      activeOpacity={0.8}
      onPress={() => navigation.navigate("Search")}>
      <Ionicons
        name="search"
        size={22}
        color={Colors.gray500}
      />

      <Text style={styles.placeholder}>
        Search lost or found items...
      </Text>
    </TouchableOpacity>
  );
};

export default SearchShortcut;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: Colors.white,

    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,

    borderRadius: Radius.lg,

    marginBottom: Spacing.xl,

    ...Shadows.sm,
  },

  placeholder: {
    marginLeft: Spacing.md,
    color: Colors.gray500,
    fontFamily: Fonts.regular,
    fontSize: 15,
  },
});