import React, { useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import AuthLayout from "../../components/common/AuthLayout";
import CustomInput from "../../components/inputs/CustomInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import authService from "../../services/authService";
import useAuth from "../../hooks/useAuth";
import useFeedback from "../../hooks/useFeedback";
import { AuthStackParamList } from "../../types/navigation";

import {
    Colors,
    Fonts,
    Spacing,
} from "../../theme";

type Props = NativeStackScreenProps<
    AuthStackParamList,
    "Login"
>;

const LoginScreen = ({ navigation }: Props) => {
    const { showError, showWarning } =
        useFeedback();

    const { login } = useAuth();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const isValidEmail = (
        value: string
    ) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            value.trim()
        );
    };

    const getErrorMessage = (
        error: any
    ) => {
        const data =
            error.response?.data;

        if (
            typeof data ===
            "string"
        ) {
            return data;
        }

        if (data?.message) {
            return data.message;
        }

        return (
            error.message ||
            "Unable to login. Please try again."
        );
    };

    const handleLogin =
        async () => {
            const normalizedEmail =
                email
                    .trim()
                    .toLowerCase();

            if (
                !normalizedEmail ||
                !password
            ) {
                showWarning(
                    "Missing Information",
                    "Please enter your email and password."
                );

                return;
            }

            if (
                !isValidEmail(
                    normalizedEmail
                )
            ) {
                showWarning(
                    "Invalid Email",
                    "Please enter a valid email address."
                );

                return;
            }

            try {
                setLoading(true);

                const response =
                    await authService.login({
                        email:
                            normalizedEmail,
                        password,
                    });

                if (
                    !response.token
                ) {
                    showError(
                        "Login Failed",
                        "Authentication token was not received."
                    );

                    return;
                }

                await login(
                    response.token
                );
            } catch (
            error: any
            ) {
                console.log(
                    "Login Error:",
                    error.response?.data ||
                    error.message
                );

                showError(
                    "Login Failed",
                    getErrorMessage(
                        error
                    )
                );
            } finally {
                setLoading(false);
            }
        };

    return (
        <AuthLayout>
            <View
                style={
                    styles.container
                }
            >
                <View
                    style={
                        styles.logoContainer
                    }
                >
                    <Image
                        source={require(
                            "../../assets/images/campusfound-logo.png"
                        )}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                <Text
                    style={styles.title}
                >
                    Welcome back
                </Text>

                <Text
                    style={
                        styles.subtitle
                    }
                >
                    Sign in to continue to CampusFound
                </Text>

                <View
                    style={styles.form}
                >
                    <CustomInput
                        label="Email Address"
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={
                            setEmail
                        }
                    />

                    <CustomInput
                        label="Password"
                        placeholder="Enter your password"
                        secureTextEntry
                        value={password}
                        onChangeText={
                            setPassword
                        }
                    />

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() =>
                            navigation.navigate(
                                "ForgotPassword"
                            )
                        }
                    >
                        <Text
                            style={
                                styles.forgot
                            }
                        >
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>

                    <PrimaryButton
                        title="Login"
                        loading={loading}
                        disabled={loading}
                        onPress={
                            handleLogin
                        }
                    />
                </View>

                <View
                    style={
                        styles.bottomContainer
                    }
                >
                    <Text
                        style={
                            styles.bottomText
                        }
                    >
                        Don't have an account?
                    </Text>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() =>
                            navigation.navigate(
                                "Register"
                            )
                        }
                    >
                        <Text
                            style={
                                styles.register
                            }
                        >
                            Create Account
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </AuthLayout>
    );
};

export default LoginScreen;

const styles =
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent:
                "center",
        },

        logoContainer: {
            alignItems:
                "center",
            marginBottom:
                Spacing.lg,
        },

        logo: {
            width: 110,
            height: 110,
        },

        title: {
            fontSize: 28,
            fontFamily:
                Fonts.bold,
            color: Colors.text,
            textAlign:
                "center",
        },

        subtitle: {
            marginTop: 6,
            marginBottom:
                Spacing.xl,
            textAlign:
                "center",
            fontSize: 14,
            fontFamily:
                Fonts.regular,
            color:
                Colors.textSecondary,
        },

        form: {
            gap: Spacing.md,
        },

        forgot: {
            alignSelf:
                "flex-end",
            marginBottom:
                Spacing.sm,
            fontSize: 13,
            fontFamily:
                Fonts.semiBold,
            color:
                Colors.primary,
        },

        bottomContainer: {
            flexDirection:
                "row",
            justifyContent:
                "center",
            marginTop:
                Spacing.xl,
        },

        bottomText: {
            fontSize: 13,
            fontFamily:
                Fonts.regular,
            color:
                Colors.textSecondary,
        },

        register: {
            marginLeft: 6,
            fontSize: 13,
            fontFamily:
                Fonts.semiBold,
            color:
                Colors.primary,
        },
    });