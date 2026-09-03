import React, {
    useEffect,
    useState,
} from "react";

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
        "ForgotPasswordOtp"
    >;

const ForgotPasswordOtpScreen = ({
    route,
    navigation,
}: Props) => {
    const { email } = route.params;

    const [otp, setOtp] =
        useState("");

    const [countdown, setCountdown] =
        useState(60);

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {
        if (countdown <= 0) {
            return;
        }

        const timer = setInterval(() => {
            setCountdown(prev =>
                prev > 0
                    ? prev - 1
                    : 0
            );
        }, 1000);

        return () =>
            clearInterval(timer);
    }, [countdown]);

    const handleVerifyOtp = async () => {
        if (!/^\d{6}$/.test(otp)) {
            Alert.alert(
                "Invalid OTP",
                "Please enter the 6-digit OTP sent to your email."
            );

            return;
        }

        try {
            setLoading(true);

            const response =
                await authService
                    .verifyPasswordResetOtp(
                        email,
                        otp
                    );

            if (!response.resetToken) {
                Alert.alert(
                    "Verification Failed",
                    "Password reset token was not received."
                );

                return;
            }

            navigation.replace(
                "ResetPassword",
                {
                    resetToken:
                        response.resetToken,
                }
            );
        } catch (error: any) {
            console.log(
                "Password Reset OTP Verification Error:",
                error.response?.data ||
                error.message
            );

            Alert.alert(
                "Verification Failed",
                getErrorMessage(
                    error,
                    "Unable to verify OTP."
                )
            );
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (countdown > 0 || loading) {
            return;
        }

        try {
            setLoading(true);

            const message =
                await authService
                    .sendPasswordResetOtp(
                        email
                    );

            setOtp("");
            setCountdown(60);

            Alert.alert(
                "New OTP Sent",
                message ||
                "A new OTP has been sent to your email."
            );
        } catch (error: any) {
            console.log(
                "Password Reset Resend OTP Error:",
                error.response?.data ||
                error.message
            );

            Alert.alert(
                "Unable to Resend OTP",
                getErrorMessage(
                    error,
                    "Unable to resend OTP."
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
                    <TouchableOpacity
                        style={styles.backRow}
                        onPress={() =>
                            navigation.goBack()
                        }
                    >
                        <Ionicons
                            name="arrow-back"
                            size={20}
                            color={Colors.primary}
                        />

                        <Text style={styles.backText}>
                            Change email
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.title}>
                        Verify your email
                    </Text>

                    <Text style={styles.subtitle}>
                        We've sent a 6-digit password reset code to
                    </Text>

                    <Text style={styles.emailDisplay}>
                        {email}
                    </Text>

                    <Text style={styles.label}>
                        Verification Code
                    </Text>

                    <TextInput
                        style={[
                            styles.input,
                            styles.otpInput,
                        ]}
                        value={otp}
                        onChangeText={value => {
                            const numeric =
                                value.replace(
                                    /\D/g,
                                    ""
                                );

                            setOtp(
                                numeric.slice(
                                    0,
                                    6
                                )
                            );
                        }}
                        keyboardType="number-pad"
                        maxLength={6}
                        placeholder="000000"
                        placeholderTextColor={
                            Colors.gray400
                        }
                        editable={!loading}
                    />

                    <Text style={styles.otpHelper}>
                        OTP expires in 5 minutes
                    </Text>

                    <PrimaryButton
                        title="Verify Code"
                        onPress={handleVerifyOtp}
                        loading={loading}
                        disabled={
                            loading ||
                            otp.length !== 6
                        }
                    />

                    <View
                        style={
                            styles.resendContainer
                        }
                    >
                        {countdown > 0 ? (
                            <Text
                                style={
                                    styles.resendCountdown
                                }
                            >
                                Resend OTP in {countdown}s
                            </Text>
                        ) : (
                            <>
                                <Text
                                    style={
                                        styles.resendText
                                    }
                                >
                                    Didn't receive the code?
                                </Text>

                                <TouchableOpacity
                                    disabled={loading}
                                    onPress={
                                        handleResendOtp
                                    }
                                >
                                    <Text
                                        style={
                                            styles.resendLink
                                        }
                                    >
                                        Resend OTP
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
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

export default ForgotPasswordOtpScreen;

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
        paddingBottom: 60,
    },
    backRow: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        marginBottom: Spacing.xl,
    },
    backText: {
        marginLeft: 6,
        color: Colors.primary,
        fontFamily: Fonts.semiBold,
    },
    title: {
        fontSize: 28,
        fontFamily: Fonts.bold,
        color: Colors.text,
    },
    subtitle: {
        marginTop: 6,
        fontSize: 14,
        lineHeight: 21,
        fontFamily: Fonts.regular,
        color: Colors.textSecondary,
    },
    emailDisplay: {
        marginTop: Spacing.sm,
        marginBottom: Spacing.xl,
        fontSize: 15,
        fontFamily: Fonts.bold,
        color: Colors.primary,
    },
    label: {
        marginBottom: 7,
        fontSize: 14,
        fontFamily: Fonts.semiBold,
        color: Colors.text,
    },
    input: {
        height: 54,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: Radius.md,
        backgroundColor: Colors.white,
        paddingHorizontal: 15,
        fontSize: 15,
        fontFamily: Fonts.regular,
        color: Colors.text,
    },
    otpInput: {
        textAlign: "center",
        letterSpacing: 12,
        fontSize: 22,
        fontFamily: Fonts.bold,
    },
    otpHelper: {
        textAlign: "center",
        marginTop: 8,
        marginBottom: Spacing.lg,
        color: Colors.gray500,
        fontFamily: Fonts.regular,
        fontSize: 12,
    },
    resendContainer: {
        marginTop: Spacing.lg,
        alignItems: "center",
    },
    resendCountdown: {
        color: Colors.gray500,
        fontFamily: Fonts.medium,
    },
    resendText: {
        color: Colors.textSecondary,
        fontFamily: Fonts.regular,
    },
    resendLink: {
        marginTop: 5,
        color: Colors.primary,
        fontFamily: Fonts.bold,
    },
});