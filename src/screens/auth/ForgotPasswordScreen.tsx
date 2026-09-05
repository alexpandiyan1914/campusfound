import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import {
    NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { Ionicons } from "@expo/vector-icons";

import AuthLayout from "../../components/common/AuthLayout";
import AuthHeader from "../../components/common/AuthHeader";
import CustomInput from "../../components/inputs/CustomInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";

import authService from "../../services/authService";

import {
    AuthStackParamList,
} from "../../types/navigation";

import {
    Colors,
    Fonts,
    Spacing,
} from "../../theme";

import useFeedback from "../../hooks/useFeedback";

type Props =
    NativeStackScreenProps<
        AuthStackParamList,
        "ForgotPassword"
    >;

const ForgotPasswordScreen = ({
    navigation,
}: Props) => {

    const {
        showSuccess,
        showError,
        showWarning,
        showInfo,
        showConfirm,
    } = useFeedback();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendOtp = async () => {
        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedEmail) {
            showWarning(
                "Email Required",
                "Please enter your registered email address."
            );

            return;
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(normalizedEmail)) {
            showError(
                "Invalid Email",
                "Please enter a valid email address."
            );

            return;
        }

        try {
            setLoading(true);

            await authService.sendPasswordResetOtp(
                normalizedEmail
            );

            navigation.navigate(
                "ForgotPasswordOtp",
                {
                    email: normalizedEmail,
                }
            );
        } catch (error: any) {
            console.log(
                "Forgot Password Send OTP Error:",
                error.response?.data ||
                error.message
            );

            showError(
                "Unable to Send OTP",
                getErrorMessage(
                    error,
                    "Unable to send password reset OTP."
                )
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() =>
                        navigation.goBack()
                    }
                >
                    <Ionicons
                        name="arrow-back"
                        size={22}
                        color={Colors.primary}
                    />

                    <Text style={styles.backText}>
                        Back to Login
                    </Text>
                </TouchableOpacity>

                <AuthHeader
                    title="Forgot Password?"
                    subtitle="Enter the email associated with your CampusFound account."
                />

                <View style={styles.form}>
                    <CustomInput
                        label="Email Address"
                        placeholder="Enter your registered email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <PrimaryButton
                        title="Send Verification Code"
                        loading={loading}
                        disabled={loading}
                        onPress={handleSendOtp}
                    />
                </View>

                <View style={styles.loginRow}>
                    <Text style={styles.loginText}>
                        Remember your password?
                    </Text>

                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("Login")
                        }
                    >
                        <Text style={styles.loginLink}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </AuthLayout>
    );
};

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

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        marginBottom: Spacing.lg,
    },
    backText: {
        marginLeft: 6,
        color: Colors.primary,
        fontFamily: Fonts.semiBold,
        fontSize: 14,
    },
    form: {
        marginTop: Spacing.md,
    },
    loginRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: Spacing.xl,
    },
    loginText: {
        color: Colors.textSecondary,
        fontFamily: Fonts.regular,
    },
    loginLink: {
        marginLeft: 5,
        color: Colors.primary,
        fontFamily: Fonts.bold,
    },
});