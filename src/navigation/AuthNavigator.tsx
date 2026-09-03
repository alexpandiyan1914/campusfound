import {
    createNativeStackNavigator,
} from "@react-navigation/native-stack";

import LoginScreen from "../screens/auth/LoginScreen";

import RegisterScreen from "../screens/auth/RegisterScreen";

import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";

import ForgotPasswordOtpScreen from "../screens/auth/ForgotPasswordOtpScreen";

import ResetPasswordScreen from "../screens/auth/ResetPasswordScreen";

import {
    AuthStackParamList,
} from "../types/navigation";

const Stack =
    createNativeStackNavigator<
        AuthStackParamList
    >();

const AuthNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />

            <Stack.Screen
                name="Register"
                component={RegisterScreen}
            />

            <Stack.Screen
                name="ForgotPassword"
                component={
                    ForgotPasswordScreen
                }
            />

            <Stack.Screen
                name="ForgotPasswordOtp"
                component={
                    ForgotPasswordOtpScreen
                }
            />

            <Stack.Screen
                name="ResetPassword"
                component={
                    ResetPasswordScreen
                }
            />
        </Stack.Navigator>
    );
};

export default AuthNavigator;