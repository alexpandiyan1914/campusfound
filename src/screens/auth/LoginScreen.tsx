import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert } from "react-native";
import ScreenContainer from "../../components/common/ScreenContainer";
import CustomInput from "../../components/inputs/CustomInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import AuthHeader from "../../components/common/AuthHeader";
import AuthLayout from "../../components/common/AuthLayout";
import authService from "../../services/authService";
import useAuth from "../../hooks/useAuth";

import {
    Colors,
    Fonts,
    Radius,
    Shadows,
    Spacing,
} from "../../theme";

type RootStackParamList = {
    Login: undefined;
    Register: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen = ({ navigation }: Props) => {
    const { login } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {

        if (!email || !password) {

            Alert.alert(
                "Validation",
                "Please fill in all fields."
            );

            return;

        }

        try {

            setLoading(true);

            const response = await authService.login({

                email,

                password,

            });

            await login(response.token);

            Alert.alert(
                "Success",
                response.message
            );

            console.log(response.message);

            // navigation.replace("Home");

        } catch (error: any) {

            Alert.alert(

                "Login Failed",

                error?.response?.data?.error ??

                "Unable to login."

            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <AuthLayout>

            <View style={styles.container}>
                {/* Heading */}
                <AuthHeader
                    title="Welcome Back"
                    subtitle="Sign in to continue to CampusFound"
                />

                {/* Inputs */}

                <View style={styles.form}>

                    <CustomInput
                        label="Email Address"
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <CustomInput
                        label="Password"
                        placeholder="Enter your password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity>

                        <Text style={styles.forgot}>
                            Forgot Password?
                        </Text>

                    </TouchableOpacity>

                    <PrimaryButton
                        title="Login"
                        loading={loading}
                        onPress={handleLogin}
                    />

                </View>

                {/* Bottom */}

                <View style={styles.bottomContainer}>

                    <Text style={styles.bottomText}>
                        Don't have an account?
                    </Text>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("Register")}
                    >
                        <Text style={styles.register}>
                            Create Account
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>

        </AuthLayout>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
    },

    logoContainer: {
        alignItems: "center",
        marginBottom: Spacing.xl,
    },

    logo: {
        width: 120,
        height: 120,
    },

    title: {
        fontSize: 30,
        fontFamily: Fonts.bold,
        color: Colors.text,
        textAlign: "center",
    },

    subtitle: {
        textAlign: "center",
        color: Colors.textSecondary,
        marginTop: 8,
        marginBottom: Spacing.xxl,
        fontFamily: Fonts.regular,
        fontSize: 15,
    },

    form: {
        gap: Spacing.md,
    },

    forgot: {
        alignSelf: "flex-end",
        color: Colors.primary,
        marginBottom: Spacing.md,
        fontFamily: Fonts.medium,
    },

    bottomContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: Spacing.xxl,
    },

    bottomText: {
        color: Colors.textSecondary,
        fontFamily: Fonts.regular,
    },

    register: {
        color: Colors.primary,
        marginLeft: 6,
        fontFamily: Fonts.semiBold,
    },

});