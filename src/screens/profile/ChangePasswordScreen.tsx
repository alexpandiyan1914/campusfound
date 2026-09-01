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
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import userService from "../../services/userService";
import {
    Colors,
    Fonts,
    Radius,
    Spacing,
} from "../../theme";

const ChangePasswordScreen = () => {
    const navigation = useNavigation();

    const [currentPassword, setCurrentPassword] =
        useState("");

    const [newPassword, setNewPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [showCurrent, setShowCurrent] =
        useState(false);

    const [showNew, setShowNew] =
        useState(false);

    const [showConfirm, setShowConfirm] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const handleChangePassword = async () => {
        if (
            !currentPassword ||
            !newPassword ||
            !confirmPassword
        ) {
            Alert.alert(
                "Missing Information",
                "Please complete all password fields."
            );
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert(
                "Weak Password",
                "New password must contain at least 6 characters."
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert(
                "Password Mismatch",
                "New password and confirm password do not match."
            );
            return;
        }

        if (currentPassword === newPassword) {
            Alert.alert(
                "Choose a Different Password",
                "New password cannot be the same as your current password."
            );
            return;
        }

        try {
            setLoading(true);

            const message =
                await userService.changePassword({
                    currentPassword,
                    newPassword,
                });

            Alert.alert(
                "Password Updated",
                message ||
                "Your password has been changed successfully.",
                [
                    {
                        text: "OK",
                        onPress: () =>
                            navigation.goBack(),
                    },
                ]
            );

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error: any) {
            console.log(
                "Change Password Error:",
                error.response?.data ||
                error.message
            );

            const data =
                error.response?.data;

            const message =
                typeof data === "string"
                    ? data
                    : data?.message ||
                    "Unable to change password.";

            Alert.alert(
                "Password Change Failed",
                message
            );
        } finally {
            setLoading(false);
        }
    };

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
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.content}
                >
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() =>
                                navigation.goBack()
                            }
                        >
                            <Ionicons
                                name="arrow-back"
                                size={22}
                                color={Colors.text}
                            />
                        </TouchableOpacity>

                        <View style={styles.headerText}>
                            <Text style={styles.title}>
                                Change Password
                            </Text>

                            <Text style={styles.subtitle}>
                                Update your account password securely
                            </Text>
                        </View>
                    </View>

                    <View style={styles.securityCard}>
                        <View style={styles.securityIcon}>
                            <Ionicons
                                name="shield-checkmark-outline"
                                size={27}
                                color={Colors.primary}
                            />
                        </View>

                        <View style={styles.securityContent}>
                            <Text style={styles.securityTitle}>
                                Account Security
                            </Text>

                            <Text style={styles.securityText}>
                                Enter your current password before choosing a new one.
                            </Text>
                        </View>
                    </View>

                    <PasswordInput
                        label="Current Password"
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        visible={showCurrent}
                        onToggle={() =>
                            setShowCurrent(prev => !prev)
                        }
                    />

                    <PasswordInput
                        label="New Password"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        visible={showNew}
                        onToggle={() =>
                            setShowNew(prev => !prev)
                        }
                    />

                    <Text style={styles.requirement}>
                        Use at least 6 characters and choose a different password from your current one.
                    </Text>

                    <PasswordInput
                        label="Confirm New Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        visible={showConfirm}
                        onToggle={() =>
                            setShowConfirm(prev => !prev)
                        }
                    />

                    <TouchableOpacity
                        style={[
                            styles.button,
                            loading && styles.disabledButton,
                        ]}
                        disabled={loading}
                        activeOpacity={0.8}
                        onPress={handleChangePassword}
                    >
                        {loading ? (
                            <Text style={styles.buttonText}>
                                Updating...
                            </Text>
                        ) : (
                            <>
                                <Ionicons
                                    name="lock-closed-outline"
                                    size={19}
                                    color={Colors.white}
                                />

                                <Text style={styles.buttonText}>
                                    Update Password
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

interface PasswordInputProps {
    label: string;
    value: string;
    onChangeText: (value: string) => void;
    visible: boolean;
    onToggle: () => void;
}

const PasswordInput = ({
    label,
    value,
    onChangeText,
    visible,
    onToggle,
}: PasswordInputProps) => {
    return (
        <View style={styles.field}>
            <Text style={styles.label}>
                {label}
            </Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={!visible}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Enter password"
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
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    flex: {
        flex: 1,
    },
    content: {
        padding: Spacing.lg,
        paddingBottom: 70,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: Spacing.xl,
    },
    backButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: Colors.white,
        justifyContent: "center",
        alignItems: "center",
        marginRight: Spacing.md,
    },
    headerText: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontFamily: Fonts.bold,
        color: Colors.text,
    },
    subtitle: {
        marginTop: 3,
        fontSize: 13,
        fontFamily: Fonts.regular,
        color: Colors.textSecondary,
    },
    securityCard: {
        flexDirection: "row",
        backgroundColor: "#EEF4FF",
        borderRadius: Radius.lg,
        padding: Spacing.md,
        marginBottom: Spacing.xl,
    },
    securityIcon: {
        width: 46,
        height: 46,
        borderRadius: 14,
        backgroundColor: Colors.white,
        justifyContent: "center",
        alignItems: "center",
        marginRight: Spacing.md,
    },
    securityContent: {
        flex: 1,
    },
    securityTitle: {
        fontSize: 15,
        fontFamily: Fonts.semiBold,
        color: Colors.text,
    },
    securityText: {
        marginTop: 4,
        fontSize: 12,
        lineHeight: 18,
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
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: Radius.md,
    },
    input: {
        flex: 1,
        height: 54,
        paddingHorizontal: 15,
        fontSize: 15,
        fontFamily: Fonts.regular,
        color: Colors.text,
    },
    eyeButton: {
        paddingHorizontal: 15,
        height: 54,
        justifyContent: "center",
    },
    requirement: {
        marginTop: -5,
        marginBottom: Spacing.md,
        fontSize: 12,
        lineHeight: 18,
        fontFamily: Fonts.regular,
        color: Colors.gray500,
    },
    button: {
        height: 54,
        marginTop: Spacing.lg,
        borderRadius: Radius.md,
        backgroundColor: Colors.primary,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    disabledButton: {
        opacity: 0.65,
    },
    buttonText: {
        marginLeft: 7,
        fontSize: 15,
        fontFamily: Fonts.semiBold,
        color: Colors.white,
    },
});