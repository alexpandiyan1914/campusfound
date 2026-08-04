import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import {
  Colors,
  Fonts,
  Radius,
  Spacing,
} from "../../theme";

interface Props {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  selected: boolean;
  onPress: () => void;
}

const CategoryCard = ({ title, icon, selected, onPress }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.selectedContainer]}
      onPress={onPress}
    >

      <Ionicons
        name={icon}
        size={28}
        color={Colors.primary}
      />

      <Text
        style={[
          styles.title,
          selected && styles.selectedTitle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    width: 95,
    height: 95,

    backgroundColor: Colors.white,

    borderRadius: Radius.lg,

    justifyContent: "center",
    alignItems: "center",

    marginRight: Spacing.md,

    borderWidth: 1,
    borderColor: Colors.border,
  },

  title: {
    marginTop: 10,
    textAlign: "center",
    color: Colors.text,
    fontFamily: Fonts.medium,
    fontSize: 13,
  },

  selectedContainer: {
    backgroundColor: Colors.primary,
  },

  selectedTitle: {
    color: Colors.white,
  },
});