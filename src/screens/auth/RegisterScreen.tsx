import React, { useState } from "react";
import {
  Alert,
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

import authService from "../../services/authService";

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
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {

    if (
      !fullName ||
      !email ||
      !phone ||
      !department ||
      !year ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert(
        "Validation",
        "Please fill in all fields."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Validation",
        "Passwords do not match."
      );
      return;
    }

    try {

      setLoading(true);

      const response = await authService.register({

        fullName,
        email,
        password,
        phone,
        department,
        year: Number(year),

      });

      Alert.alert(
        "Success",
        response.message
      );

      navigation.navigate("Login");

    } catch (error: any) {

      Alert.alert(

        "Registration Failed",

        error?.response?.data?.error ??
        "Unable to register."

      );

    } finally {

      setLoading(false);

    }

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
        label="Phone Number"
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <CustomInput
        label="Department"
        placeholder="CSE / IT / ECE"
        value={department}
        onChangeText={setDepartment}
      />

      <CustomInput
        label="Year"
        placeholder="1 - 4"
        keyboardType="numeric"
        value={year}
        onChangeText={setYear}
      />

      <CustomInput
        label="Password"
        placeholder="Create password"
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
        loading={loading}
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