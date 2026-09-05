import {
  StyleSheet,
  Text,
  TouchableOpacity,
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

interface Props {
  title: string;
  icon:
    keyof typeof Ionicons.glyphMap;
  selected?: boolean;
  onPress?: () => void;
}

const CategoryCard = ({
  title,
  icon,
  selected = false,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        selected &&
          styles.selectedContainer,
      ]}
      activeOpacity={0.75}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={18}
        color={
          selected
            ? Colors.white
            : Colors.primary
        }
      />

      <Text
        style={[
          styles.title,
          selected &&
            styles.selectedTitle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  container: {
    minHeight: 42,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginRight: Spacing.sm,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },

  selectedContainer: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },

  title: {
    marginLeft: 6,
    fontSize: 13,
    fontFamily: Fonts.medium,
    color: Colors.gray700,
  },

  selectedTitle: {
    color: Colors.white,
    fontFamily: Fonts.semiBold,
  },
});