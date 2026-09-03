import React, { useState } from "react";

import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import {
    SafeAreaView,
} from "react-native-safe-area-context";

import {
    NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { Ionicons } from "@expo/vector-icons";

import authService from "../../services/authService";

import PrimaryButton
    from "../../components/buttons/PrimaryButton";

import {
    AuthStackParamList,
} from "../../types/navigation";

import {
    Colors,
    Fonts,
    Radius,
    Spacing,
} from "../../theme";

type Props =
    NativeStackScreenProps<
        AuthStackParamList,
        "ResetPassword"
    >;

const ResetPasswordScreen = ({
    route,
    navigation,
}: Props) => {
    const { resetToken } = route.params;

    const [newPassword, setNewPassword] =
        useState("");

    const [
        confirmPassword,
        setConfirmPassword,
    ] = useState("");

    const [
        showNewPassword,
        setShowNewPassword,
    ] = useState(false);

    const [
        showConfirmPassword,
        setShowConfirmPassword,
    ] = useState(false);

    const [loading, setLoading] =
        useState(false);

    const handleResetPassword =
        async () => {
            if (
                !newPassword ||
                !confirmPassword
            ) {
                Alert.alert(
                    "Missing Information",
                    "Please enter and confirm your new password."
                );

                return;
            }

            if (newPassword.length < 6) {
                Alert.alert(
                    "Invalid Password",
                    "Password must contain at least 6 characters."
                );

                return;
            }

            if (
                newPassword !==
                confirmPassword
            ) {
                Alert.alert(
                    "Password Mismatch",
                    "Passwords do not match."
                );

                return;
            }

            try {
                setLoading(true);

                const message =
                    await authService.resetPassword(
                        resetToken,
                        newPassword
                    );

                Alert.alert(
                    "Password Updated",
                    message ||
                    "Your password has been reset successfully. You can now sign in using your new password.",
                    [
                        {
                            text: "Login",
                            onPress: () => {
                                navigation.reset({
                                    index: 0,
                                    routes: [
                                        {
                                            name: "Login",
                                        },
                                    ],
                                });
                            },
                        },
                    ]
                );
            } catch (error: any) {
                console.log(
                    "Reset Password Error:",
                    error.response?.data ||
                    error.message
                );

                Alert.alert(
                    "Password Reset Failed",
                    getErrorMessage(
                        error,
                        "Unable to reset your password."
                    )
                );
            } finally {
                setLoading(false);
            }
        };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.keyboard}
                behavior={
                    Platform.OS === "ios"
                        ? "padding"
                        : undefined
                }
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={
                        styles.content
                    }
                >
                    <Text style={styles.title}>
                        Create New Password
                    </Text>

                    <Text style={styles.subtitle}>
                        Choose a new password for your CampusFound account.
                    </Text>

                    <PasswordInput
                        label="New Password"
                        value={newPassword}
                        onChangeText={
                            setNewPassword
                        }
                        visible={
                            showNewPassword
                        }
                        onToggle={() =>
                            setShowNewPassword(
                                prev => !prev
                            )
                        }
                        placeholder="Enter new password"
                    />

                    <Text style={styles.helper}>
                        Password must contain at least 6 characters.
                    </Text>

                    <PasswordInput
                        label="Confirm Password"
                        value={confirmPassword}
                        onChangeText={
                            setConfirmPassword
                        }
                        visible={
                            showConfirmPassword
                        }
                        onToggle={() =>
                            setShowConfirmPassword(
                                prev => !prev
                            )
                        }
                        placeholder="Confirm new password"
                    />

                    <View style={styles.buttonContainer}>
                        <PrimaryButton
                            title="Reset Password"
                            onPress={
                                handleResetPassword
                            }
                            loading={loading}
                            disabled={loading}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

interface PasswordInputProps {
    label: string;
    value: string;
    onChangeText:
        (value: string) => void;
    visible: boolean;
    onToggle: () => void;
    placeholder: string;
}

const PasswordInput = ({
    label,
    value,
    onChangeText,
    visible,
    onToggle,
    placeholder,
}: PasswordInputProps) => (
    <View style={styles.field}>
        <Text style={styles.label}>
            {label}
        </Text>

        <View style={styles.passwordContainer}>
            <TextInput
                style={styles.passwordInput}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={!visible}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder={placeholder}
                placeholderTextColor={
                    Colors.gray400
                }
            />

            <TouchableOpacity
                style={styles.eyeButton}
                onPress={onToggle}
            >
                <Ionicons
                    name={
                        visible
                            ? "eye-off-outline"
                            : "eye-outline"
                    }
                    size={21}
                    color={Colors.gray500}
                />
            </TouchableOpacity>
        </View>
    </View>
);

const getErrorMessage = (
    error: any,
    fallback: string
): string => {
    const data = error.response?.data;

    if (typeof data === "string") {
        return data;
    }

    if (data?.message) {
        return data.message;
    }

    return fallback;
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    keyboard: {
        flex: 1,
    },
    content: {
        padding: Spacing.lg,
        paddingTop: Spacing.xl,
        paddingBottom: 60,
    },
    title: {
        fontSize: 28,
        fontFamily: Fonts.bold,
        color: Colors.text,
    },
    subtitle: {
        marginTop: 6,
        marginBottom: Spacing.xl,
        fontSize: 14,
        lineHeight: 21,
        fontFamily: Fonts.regular,
        color: Colors.textSecondary,
    },
    field: {
        marginBottom: Spacing.md,
    },
    label: {
        marginBottom: 7,
        fontSize: 14,
        fontFamily: Fonts.semiBold,
        color: Colors.text,
    },
    passwordContainer: {
        height: 54,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: Radius.md,
        backgroundColor: Colors.white,
    },
    passwordInput: {
        flex: 1,
        height: "100%",
        paddingHorizontal: 15,
        fontSize: 15,
        fontFamily: Fonts.regular,
        color: Colors.text,
    },
    eyeButton: {
        height: "100%",
        paddingHorizontal: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    helper: {
        marginTop: -6,
        marginBottom: Spacing.md,
        fontSize: 12,
        lineHeight: 18,
        fontFamily: Fonts.regular,
        color: Colors.gray500,
    },
    buttonContainer: {
        marginTop: Spacing.md,
    },
});