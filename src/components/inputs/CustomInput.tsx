import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import {
  Colors,
  Fonts,
  Radius,
  Spacing,
} from "../../theme";

interface CustomInputProps extends TextInputProps {
  label: string;
}

const CustomInput = ({
  label,
  secureTextEntry,
  ...props
}: CustomInputProps) => {

  const [hidePassword, setHidePassword] = useState(secureTextEntry);

  return (

    <View style={styles.container}>

      <Text style={styles.label}>
        {label}
      </Text>

      <View style={styles.inputContainer}>

        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.gray400}
          secureTextEntry={hidePassword}
          {...props}
        />

        {secureTextEntry && (

          <TouchableOpacity
            onPress={() =>
              setHidePassword(!hidePassword)
            }
          >

            <Ionicons
              name={
                hidePassword
                  ? "eye-off-outline"
                  : "eye-outline"
              }
              size={22}
              color={Colors.gray500}
            />

          </TouchableOpacity>

        )}

      </View>

    </View>

  );

};

export default CustomInput;

const styles = StyleSheet.create({

  container: {

    marginBottom: Spacing.md,

  },

  label: {

    marginBottom: Spacing.sm,

    color: Colors.text,

    fontFamily: Fonts.medium,

  },

  inputContainer: {

    flexDirection: "row",

    alignItems: "center",

    borderWidth: 1,

    borderColor: Colors.border,

    borderRadius: Radius.md,

    backgroundColor: Colors.white,

    paddingHorizontal: Spacing.md,

  },

  input: {

    flex: 1,

    height: 50,

    color: Colors.text,

    fontFamily: Fonts.regular,

  },

});