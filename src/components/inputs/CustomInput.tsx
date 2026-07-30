import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";

import {
  Colors,
  Radius,
  Fonts,
  Spacing,
} from "../../theme";

interface CustomInputProps extends TextInputProps {
  label: string;
  error?: string;
}

const CustomInput = ({
  label,
  error,
  ...props
}: CustomInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        placeholderTextColor={Colors.gray400}
        style={[
          styles.input,
          error && styles.inputError,
        ]}
        {...props}
      />

      {error ? (
        <Text style={styles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },

  label: {
    marginBottom: Spacing.sm,
    color: Colors.text,
    fontSize: 14,
    fontFamily: Fonts.medium,
  },

  input: {
    height: 56,

    backgroundColor: Colors.white,

    borderWidth: 1,
    borderColor: Colors.border,

    borderRadius: Radius.md,

    paddingHorizontal: Spacing.md,

    color: Colors.text,

    fontSize: 16,
    fontFamily: Fonts.regular,
  },

  inputError: {
    borderColor: Colors.danger,
  },

  error: {
    marginTop: 6,
    color: Colors.danger,
    fontSize: 12,
    fontFamily: Fonts.regular,
  },
});