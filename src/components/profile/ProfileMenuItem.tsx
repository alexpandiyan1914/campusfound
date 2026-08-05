import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import {
  Colors,
  Fonts,
 Radius,
  Shadows,
  Spacing,
} from "../../theme";

interface Props {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

const ProfileMenuItem = ({
  title,
  icon,
  onPress,
}: Props) => {
  return (

    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}
    >

      <View style={styles.left}>

        <View style={styles.iconContainer}>

          <Ionicons
            name={icon}
            size={22}
            color={Colors.primary}
          />

        </View>

        <Text style={styles.title}>
          {title}
        </Text>

      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color={Colors.gray400}
      />

    </TouchableOpacity>

  );
};

export default ProfileMenuItem;

const styles = StyleSheet.create({

  container: {

    backgroundColor: Colors.white,

    borderRadius: Radius.lg,

    padding: Spacing.md,

    marginBottom: Spacing.md,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    ...Shadows.sm,

  },

  left: {

    flexDirection: "row",

    alignItems: "center",

  },

  iconContainer: {

    width: 42,

    height: 42,

    borderRadius: 21,

    backgroundColor: "#EEF4FF",

    justifyContent: "center",

    alignItems: "center",

    marginRight: Spacing.md,

  },

  title: {

    fontSize: 16,

    color: Colors.text,

    fontFamily: Fonts.medium,

  },

});