import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  Ionicons,
} from "@expo/vector-icons";

import userService from "../../services/userService";

import {
  Colors,
  Fonts,
  Radius,
  Shadows,
  Spacing,
} from "../../theme";

const EditProfileScreen = () => {

  const navigation = useNavigation();

  const [fullName, setFullName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {

    loadProfile();

  }, []);

  const loadProfile = async () => {

    try {

      const profile =
        await userService.getCurrentUser();

      setFullName(profile.fullName);
      setPhone(profile.phone || "");
      setEmail(profile.email);

    } catch (error: any) {

      console.log(
        "Edit Profile Error:",
        error.response?.data || error.message
      );

      Alert.alert(
        "Error",
        "Failed to load profile."
      );

    } finally {

      setLoading(false);

    }
  };

  const handleSave = async () => {

    if (!fullName.trim()) {

      Alert.alert(
        "Invalid Name",
        "Please enter your full name."
      );

      return;
    }

    if (!phone.trim()) {

      Alert.alert(
        "Invalid Phone",
        "Please enter your phone number."
      );

      return;
    }

    try {

      setSaving(true);

      await userService.updateProfile({

        fullName: fullName.trim(),

        phone: phone.trim(),

      });

      Alert.alert(
        "Success",
        "Profile updated successfully.",
        [
          {
            text: "OK",
            onPress: () =>
              navigation.goBack(),
          },
        ]
      );

    } catch (error: any) {

      console.log(
        "Update Profile Error:",
        error.response?.data || error.message
      );

      Alert.alert(
        "Update Failed",
        "Unable to update your profile."
      );

    } finally {

      setSaving(false);

    }
  };

  if (loading) {

    return (

      <SafeAreaView
        style={styles.loadingContainer}
      >

        <ActivityIndicator
          size="large"
          color={Colors.primary}
        />

      </SafeAreaView>
    );
  }

  return (

    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >

          <View style={styles.avatarContainer}>

            <View style={styles.avatar}>

              <Ionicons
                name="person"
                size={42}
                color={Colors.primary}
              />

            </View>

            <Text style={styles.avatarHint}>
              Profile information
            </Text>

          </View>

          <View style={styles.form}>

            <Text style={styles.label}>
              Full Name
            </Text>

            <View style={styles.inputContainer}>

              <Ionicons
                name="person-outline"
                size={20}
                color={Colors.gray500}
              />

              <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter your full name"
                placeholderTextColor={
                  Colors.gray400
                }
              />

            </View>

            <Text style={styles.label}>
              Email
            </Text>

            <View
              style={[
                styles.inputContainer,
                styles.disabledInput,
              ]}
            >

              <Ionicons
                name="mail-outline"
                size={20}
                color={Colors.gray400}
              />

              <TextInput
                style={[
                  styles.input,
                  styles.disabledText,
                ]}
                value={email}
                editable={false}
              />

              <Ionicons
                name="lock-closed-outline"
                size={17}
                color={Colors.gray400}
              />

            </View>

            <Text style={styles.helperText}>
              Email cannot be changed.
            </Text>

            <Text style={styles.label}>
              Phone Number
            </Text>

            <View style={styles.inputContainer}>

              <Ionicons
                name="call-outline"
                size={20}
                color={Colors.gray500}
              />

              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter your phone number"
                placeholderTextColor={
                  Colors.gray400
                }
                keyboardType="phone-pad"
                maxLength={15}
              />

            </View>

          </View>

          <TouchableOpacity
            style={[
              styles.saveButton,
              saving && styles.disabledButton,
            ]}
            activeOpacity={0.8}
            disabled={saving}
            onPress={handleSave}
          >

            {saving ? (

              <ActivityIndicator
                size="small"
                color={Colors.white}
              />

            ) : (

              <>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={21}
                  color={Colors.white}
                />

                <Text style={styles.saveText}>
                  Save Changes
                </Text>
              </>

            )}

          </TouchableOpacity>

        </ScrollView>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({

  flex: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },

  content: {
    padding: Spacing.lg,
    paddingBottom: 60,
  },

  avatarContainer: {
    alignItems: "center",
    marginBottom: 30,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.primary + "15",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.primary + "30",
  },

  avatarHint: {
    marginTop: 10,
    color: Colors.gray500,
    fontFamily: Fonts.regular,
    fontSize: 13,
  },

  form: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    ...Shadows.sm,
  },

  label: {
    fontFamily: Fonts.medium,
    color: Colors.text,
    fontSize: 14,
    marginBottom: 8,
    marginTop: 12,
  },

  inputContainer: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  disabledInput: {
    backgroundColor: Colors.gray100,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontFamily: Fonts.regular,
    fontSize: 15,
    color: Colors.text,
  },

  disabledText: {
    color: Colors.gray500,
  },

  helperText: {
    fontFamily: Fonts.regular,
    color: Colors.gray500,
    fontSize: 12,
    marginTop: 6,
  },

  saveButton: {
    marginTop: 25,
    minHeight: 54,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    ...Shadows.sm,
  },

  disabledButton: {
    opacity: 0.7,
  },

  saveText: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: 16,
    marginLeft: 8,
  },

});