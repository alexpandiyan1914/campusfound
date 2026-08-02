import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import {
  Colors,
  Fonts,
  Spacing,
} from "../../theme";

interface Props {
  title: string;
  onPress?: () => void;
}

const SectionHeader = ({
  title,
  onPress,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      <TouchableOpacity onPress={onPress}>
        <Text style={styles.seeAll}>
          See All
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.text,
  },

  seeAll: {
    color: Colors.primary,
    fontFamily: Fonts.medium,
  },
});