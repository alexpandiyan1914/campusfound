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
  Shadows,
} from "../../theme";

interface PrimaryButtonProps {

  title: string;

  onPress: () => void;

  loading?: boolean;

  disabled?: boolean;

  backgroundColor?: string;
}

const PrimaryButton = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  backgroundColor = Colors.primary,
}: PrimaryButtonProps) => {

  return (

    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor,
        },
        (disabled || loading) &&
        styles.disabled,
      ]}
      onPress={onPress}
    >

      {loading ? (

        <ActivityIndicator
          size="small"
          color={Colors.white}
        />

      ) : (

        <Text style={styles.text}>
          {title}
        </Text>

      )}

    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({

  button: {
    borderRadius: Radius.md,
    height: 56,

    justifyContent: "center",
    alignItems: "center",

    ...Shadows.sm,
  },

  disabled: {
    opacity: 0.85,
  },

  text: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: Fonts.semiBold,
  },

});