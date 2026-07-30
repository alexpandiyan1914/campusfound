import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import {
  Colors,
  Radius,
  Fonts,
  Spacing,
  Shadows,
} from "../../theme";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const PrimaryButton = ({
  title,
  onPress,
  loading = false,
  disabled = false,
}: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || loading}
      style={[
        styles.button,
        (disabled || loading) && styles.disabled,
      ]}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator color={Colors.white} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    height: 56,

    justifyContent: "center",
    alignItems: "center",

    ...Shadows.sm,
  },

  disabled: {
    opacity: 0.7,
  },

  text: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: Fonts.semiBold,
  },
});