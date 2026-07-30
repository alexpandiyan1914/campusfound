import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import AuthLayout from "../../components/common/AuthLayout";
import AuthHeader from "../../components/common/AuthHeader";
import CustomInput from "../../components/inputs/CustomInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";

import {
  Colors,
  Fonts,
  Spacing,
} from "../../theme";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Register"
>;

const RegisterScreen = ({ navigation }: Props) => {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    console.log({
      fullName,
      email,
      registerNumber,
      password,
      confirmPassword,
    });
  };

  return (

    <AuthLayout>

      <AuthHeader
        title="Create Account"
        subtitle="Join CampusFound today"
      />

      <CustomInput
        label="Full Name"
        placeholder="Enter your full name"
        value={fullName}
        onChangeText={setFullName}
      />

      <CustomInput
        label="Email Address"
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <CustomInput
        label="Register Number"
        placeholder="Enter your register number"
        value={registerNumber}
        onChangeText={setRegisterNumber}
      />

      <CustomInput
        label="Password"
        placeholder="Create a password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <CustomInput
        label="Confirm Password"
        placeholder="Confirm password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <PrimaryButton
        title="Create Account"
        onPress={handleRegister}
      />

      <View style={styles.bottomContainer}>

        <Text style={styles.bottomText}>
          Already have an account?
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.login}>
            Login
          </Text>
        </TouchableOpacity>

      </View>

    </AuthLayout>

  );
};

export default RegisterScreen;

const styles = StyleSheet.create({

  bottomContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Spacing.xl,
  },

  bottomText: {
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
  },

  login: {
    color: Colors.primary,
    marginLeft: 6,
    fontFamily: Fonts.semiBold,
  },

});