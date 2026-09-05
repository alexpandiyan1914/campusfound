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

import authService
    from "../../services/authService";

import {
    Colors,
    Fonts,
    Radius,
    Shadows,
    Spacing,
} from "../../theme";

import useFeedback from "../../hooks/useFeedback";

import PrimaryButton
    from "../../components/buttons/PrimaryButton";

import { AuthStackParamList } from "../../types/navigation";



type Props =
    NativeStackScreenProps<
        AuthStackParamList,
        "Register"
    >;


type RegisterStep =
    | "EMAIL"
    | "OTP"
    | "DETAILS";

const RegisterScreen = ({
    navigation,
}: Props) => {

    const {
        showSuccess,
        showError,
        showWarning,
        showInfo,
        showConfirm,
    } = useFeedback();

    // ==========================================
    // STEP
    // ==========================================

    const [step, setStep] =
        useState<RegisterStep>("EMAIL");


    // ==========================================
    // EMAIL / OTP
    // ==========================================

    const [email, setEmail] =
        useState("");

    const [otp, setOtp] =
        useState("");

    const [countdown, setCountdown] =
        useState(0);


    // ==========================================
    // REGISTRATION DATA
    // ==========================================

    const [fullName, setFullName] =
        useState("");

    const [phone, setPhone] =
        useState("");

    const [department, setDepartment] =
        useState("");

    const [year, setYear] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [
        confirmPassword,
        setConfirmPassword,
    ] = useState("");


    // ==========================================
    // LOADING
    // ==========================================

    const [loading, setLoading] =
        useState(false);


    // ==========================================
    // RESEND COUNTDOWN
    // ==========================================

    useEffect(() => {

        if (countdown <= 0) {
            return;
        }

        const timer =
            setInterval(() => {

                setCountdown(prev =>
                    prev > 0
                        ? prev - 1
                        : 0
                );

            }, 1000);


        return () =>
            clearInterval(timer);

    }, [countdown]);


    // ==========================================
    // EMAIL VALIDATION
    // ==========================================

    const isTceEmail = (
        value: string
    ) => {

        const normalized =
            value
                .trim()
                .toLowerCase();

        const basicEmailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            !basicEmailRegex.test(
                normalized
            )
        ) {
            return false;
        }

        return (
            normalized.endsWith(
                "@student.tce.edu"
            ) ||
            normalized.endsWith(
                "@tce.edu"
            )
        );
    };


    // ==========================================
    // SEND OTP
    // ==========================================

    const handleSendOtp =
        async () => {

            const normalizedEmail =
                email
                    .trim()
                    .toLowerCase();


            if (!normalizedEmail) {

                showWarning(
                    "Email Required",
                    "Please enter your college email."
                );

                return;
            }


            if (
                !isTceEmail(
                    normalizedEmail
                )
            ) {

                showError(
                    "Invalid College Email",
                    "Please use your TCE email ending with @student.tce.edu or @tce.edu."
                );

                return;
            }


            try {

                setLoading(true);

                const message =
                    await authService
                        .sendOtp(
                            normalizedEmail
                        );

                setEmail(
                    normalizedEmail
                );

                setOtp("");

                setCountdown(60);

                setStep("OTP");


                showSuccess(
                    "OTP Sent",
                    message ||
                    "OTP sent successfully."
                );

            } catch (error: any) {

                console.log(
                    "Send OTP Error:",
                    error.response?.data ||
                    error.message
                );

                showError(
                    "Unable to Send OTP",
                    getErrorMessage(
                        error,
                        "Unable to send OTP. Please try again."
                    )
                );

            } finally {

                setLoading(false);

            }

        };


    // ==========================================
    // RESEND OTP
    // ==========================================

    const handleResendOtp =
        async () => {

            if (countdown > 0) {
                return;
            }

            try {

                setLoading(true);

                const message =
                    await authService
                        .sendOtp(email);

                setOtp("");

                setCountdown(60);

                showSuccess(
                    "New OTP Sent",
                    message ||
                    "A new OTP has been sent to your email."
                );

            } catch (error: any) {

                console.log(
                    "Resend OTP Error:",
                    error.response?.data ||
                    error.message
                );

                showError(
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


    // ==========================================
    // VERIFY OTP
    // ==========================================

    const handleVerifyOtp =
        async () => {

            if (!/^\d{6}$/.test(otp)) {

                showWarning(
                    "Invalid OTP",
                    "Please enter the 6-digit OTP sent to your email."
                );

                return;
            }


            try {

                setLoading(true);

                const message =
                    await authService
                        .verifyOtp(
                            email,
                            otp
                        );


                showSuccess(
                    "Email Verified",
                    message ||
                    "Email verified successfully."
                );


                setStep(
                    "DETAILS"
                );

            } catch (error: any) {

                console.log(
                    "Verify OTP Error:",
                    error.response?.data ||
                    error.message
                );

                showError(
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


    // ==========================================
    // REGISTER
    // ==========================================

    const handleRegister =
        async () => {

            if (
                !fullName.trim() ||
                !phone.trim() ||
                !department.trim() ||
                !year.trim() ||
                !password ||
                !confirmPassword
            ) {

                showWarning(
                    "Missing Information",
                    "Please complete all registration fields."
                );

                return;
            }


            if (
                password !==
                confirmPassword
            ) {

                showError(
                    "Password Mismatch",
                    "Password and confirm password must match."
                );

                return;
            }


            const yearNumber =
                Number(year);


            if (
                Number.isNaN(
                    yearNumber
                ) ||
                yearNumber < 1 ||
                yearNumber > 4
            ) {

                showWarning(
                    "Invalid Year",
                    "Please enter a valid year between 1 and 4."
                );

                return;
            }


            try {

                setLoading(true);


                const response =
                    await authService.register({

                        fullName:
                            fullName.trim(),

                        email,

                        phone:
                            phone.trim(),

                        department:
                            department
                                .trim()
                                .toUpperCase(),

                        year:
                            yearNumber,

                        password,

                    });

                showSuccess(
                    "Account Created",
                    response.message ||
                    "Registration successful. Please login."
                );

                navigation.navigate("Login");

            } catch (error: any) {

                console.log(
                    "Registration Error:",
                    error.response?.data ||
                    error.message
                );

                showError(
                    "Registration Failed",
                    getErrorMessage(
                        error,
                        "Unable to create your account."
                    )
                );

            } finally {

                setLoading(false);

            }

        };


    // ==========================================
    // STEP 1 — EMAIL
    // ==========================================

    const renderEmailStep = () => (

        <View>

            <StepIndicator
                current={1}
            />

            <Text style={styles.title}>
                Create your account
            </Text>

            <Text style={styles.subtitle}>
                Verify your TCE college email to continue.
            </Text>


            <Text style={styles.label}>
                College Email
            </Text>

            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
                placeholder="example@student.tce.edu"
                placeholderTextColor={
                    Colors.gray400
                }
                editable={!loading}
            />


            <Text style={styles.helper}>
                Use your @student.tce.edu email address.
            </Text>


            <PrimaryButton
                title="Send OTP"
                onPress={
                    handleSendOtp
                }
                loading={loading}
                disabled={loading}
            />


            <View style={styles.loginRow}>

                <Text style={styles.loginText}>
                    Already have an account?
                </Text>

                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate(
                            "Login"
                        )
                    }
                >

                    <Text
                        style={
                            styles.loginLink
                        }
                    >
                        Login
                    </Text>

                </TouchableOpacity>

            </View>

        </View>

    );


    // ==========================================
    // STEP 2 — OTP
    // ==========================================

    const renderOtpStep = () => (

        <View>

            <StepIndicator
                current={2}
            />


            <TouchableOpacity
                style={styles.backRow}
                onPress={() => {

                    setStep(
                        "EMAIL"
                    );

                    setOtp("");

                }}
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
                We've sent a 6-digit verification code to
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
                title="Verify OTP"
                onPress={
                    handleVerifyOtp
                }
                loading={loading}
                disabled={
                    loading ||
                    otp.length !== 6
                }
            />


            <View style={styles.resendContainer}>

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

                        <Text style={styles.resendText}>
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

        </View>

    );


    // ==========================================
    // STEP 3 — DETAILS
    // ==========================================

    const renderDetailsStep = () => (

        <View>

            <StepIndicator
                current={3}
            />


            <Text style={styles.title}>
                Complete your profile
            </Text>

            <Text style={styles.subtitle}>
                Your email has been verified. Complete the remaining details.
            </Text>


            <View
                style={
                    styles.verifiedEmail
                }
            >

                <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={Colors.success}
                />

                <View
                    style={
                        styles.verifiedContent
                    }
                >

                    <Text
                        style={
                            styles.verifiedAddress
                        }
                    >
                        {email}
                    </Text>

                    <Text
                        style={
                            styles.verifiedText
                        }
                    >
                        Email verified
                    </Text>

                </View>

            </View>


            <FormInput
                label="Full Name"
                value={fullName}
                onChangeText={
                    setFullName
                }
                placeholder="Your full name"
            />

            <FormInput
                label="Phone"
                value={phone}
                onChangeText={value =>
                    setPhone(
                        value.replace(
                            /\D/g,
                            ""
                        )
                    )
                }
                placeholder="9876543210"
                keyboardType="phone-pad"
            />

            <FormInput
                label="Department"
                value={department}
                onChangeText={
                    setDepartment
                }
                placeholder="CSE"
            />

            <FormInput
                label="Year"
                value={year}
                onChangeText={value =>
                    setYear(
                        value.replace(
                            /\D/g,
                            ""
                        ).slice(0, 1)
                    )
                }
                placeholder="4"
                keyboardType="number-pad"
            />

            <FormInput
                label="Password"
                value={password}
                onChangeText={
                    setPassword
                }
                placeholder="Enter password"
                secureTextEntry
            />

            <FormInput
                label="Confirm Password"
                value={
                    confirmPassword
                }
                onChangeText={
                    setConfirmPassword
                }
                placeholder="Confirm password"
                secureTextEntry
            />


            <View
                style={
                    styles.createButton
                }
            >

                <PrimaryButton
                    title="Create Account"
                    onPress={
                        handleRegister
                    }
                    loading={loading}
                    disabled={loading}
                />

            </View>

        </View>

    );


    return (

        <SafeAreaView
            style={styles.container}
        >

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

                    {step === "EMAIL" &&
                        renderEmailStep()}

                    {step === "OTP" &&
                        renderOtpStep()}

                    {step === "DETAILS" &&
                        renderDetailsStep()}

                </ScrollView>

            </KeyboardAvoidingView>

        </SafeAreaView>

    );

};


// ==========================================
// ERROR MESSAGE
// ==========================================

const getErrorMessage = (
    error: any,
    fallback: string
): string => {

    const data =
        error.response?.data;


    if (
        typeof data === "string"
    ) {
        return data;
    }


    if (
        data?.message
    ) {
        return data.message;
    }


    return fallback;
};


// ==========================================
// INPUT
// ==========================================

interface FormInputProps {

    label: string;

    value: string;

    onChangeText:
    (value: string) => void;

    placeholder: string;

    keyboardType?: any;

    secureTextEntry?: boolean;
}


const FormInput = ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType,
    secureTextEntry = false,
}: FormInputProps) => (

    <View style={styles.field}>

        <Text style={styles.label}>
            {label}
        </Text>

        <TextInput
            style={styles.input}
            value={value}
            onChangeText={
                onChangeText
            }
            placeholder={
                placeholder
            }
            placeholderTextColor={
                Colors.gray400
            }
            keyboardType={
                keyboardType
            }
            secureTextEntry={
                secureTextEntry
            }
            editable
        />

    </View>

);


// ==========================================
// STEP INDICATOR
// ==========================================

const StepIndicator = ({
    current,
}: {
    current: number;
}) => {

    return (

        <View style={styles.steps}>

            {[1, 2, 3].map(
                stepNumber => (

                    <React.Fragment
                        key={
                            stepNumber
                        }
                    >

                        <View
                            style={[
                                styles.stepCircle,

                                current >=
                                stepNumber &&
                                styles.activeStepCircle,
                            ]}
                        >

                            {current >
                                stepNumber ? (

                                <Ionicons
                                    name="checkmark"
                                    size={16}
                                    color={
                                        Colors.white
                                    }
                                />

                            ) : (

                                <Text
                                    style={[
                                        styles.stepNumber,

                                        current >=
                                        stepNumber &&
                                        styles.activeStepNumber,
                                    ]}
                                >
                                    {
                                        stepNumber
                                    }
                                </Text>

                            )}

                        </View>


                        {stepNumber < 3 && (

                            <View
                                style={[
                                    styles.stepLine,

                                    current >
                                    stepNumber &&
                                    styles.activeStepLine,
                                ]}
                            />

                        )}

                    </React.Fragment>

                )
            )}

        </View>

    );

};

export default RegisterScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor:
            Colors.background,
    },

    keyboard: {
        flex: 1,
    },

    content: {
        padding:
            Spacing.lg,
        paddingBottom: 60,
    },

    steps: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom:
            Spacing.xl,
    },

    stepCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor:
            Colors.gray400,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:
            Colors.white,
    },

    activeStepCircle: {
        backgroundColor:
            Colors.primary,
        borderColor:
            Colors.primary,
    },

    stepNumber: {
        fontSize: 13,
        fontFamily:
            Fonts.bold,
        color:
            Colors.gray500,
    },

    activeStepNumber: {
        color:
            Colors.white,
    },

    stepLine: {
        width: 55,
        height: 2,
        backgroundColor:
            Colors.border,
    },

    activeStepLine: {
        backgroundColor:
            Colors.primary,
    },

    title: {
        fontSize: 28,
        fontFamily:
            Fonts.bold,
        color:
            Colors.text,
    },

    subtitle: {
        marginTop: 6,
        marginBottom:
            Spacing.xl,
        fontSize: 14,
        lineHeight: 21,
        fontFamily:
            Fonts.regular,
        color:
            Colors.textSecondary,
    },

    label: {
        marginBottom: 7,
        fontSize: 14,
        fontFamily:
            Fonts.semiBold,
        color:
            Colors.text,
    },

    field: {
        marginBottom:
            Spacing.md,
    },

    input: {
        height: 54,
        borderWidth: 1,
        borderColor:
            Colors.border,
        borderRadius:
            Radius.md,
        backgroundColor:
            Colors.white,
        paddingHorizontal: 15,
        fontSize: 15,
        fontFamily:
            Fonts.regular,
        color:
            Colors.text,
    },

    helper: {
        marginTop: 7,
        marginBottom:
            Spacing.lg,
        fontSize: 12,
        lineHeight: 18,
        fontFamily:
            Fonts.regular,
        color:
            Colors.gray500,
    },

    loginRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop:
            Spacing.xl,
    },

    loginText: {
        color:
            Colors.textSecondary,
        fontFamily:
            Fonts.regular,
    },

    loginLink: {
        marginLeft: 5,
        color:
            Colors.primary,
        fontFamily:
            Fonts.bold,
    },

    backRow: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        marginBottom:
            Spacing.md,
    },

    backText: {
        marginLeft: 6,
        color:
            Colors.primary,
        fontFamily:
            Fonts.semiBold,
    },

    emailDisplay: {
        marginTop:
            -Spacing.md,
        marginBottom:
            Spacing.xl,
        fontSize: 15,
        fontFamily:
            Fonts.bold,
        color:
            Colors.primary,
    },

    otpInput: {
        textAlign: "center",
        letterSpacing: 12,
        fontSize: 22,
        fontFamily:
            Fonts.bold,
    },

    otpHelper: {
        textAlign: "center",
        marginTop: 8,
        marginBottom:
            Spacing.lg,
        color:
            Colors.gray500,
        fontFamily:
            Fonts.regular,
        fontSize: 12,
    },

    resendContainer: {
        marginTop:
            Spacing.lg,
        alignItems: "center",
    },

    resendCountdown: {
        color:
            Colors.gray500,
        fontFamily:
            Fonts.medium,
    },

    resendText: {
        color:
            Colors.textSecondary,
        fontFamily:
            Fonts.regular,
    },

    resendLink: {
        marginTop: 5,
        color:
            Colors.primary,
        fontFamily:
            Fonts.bold,
    },

    verifiedEmail: {
        flexDirection: "row",
        alignItems: "center",
        padding:
            Spacing.md,
        borderRadius:
            Radius.md,
        backgroundColor:
            "#DCFCE7",
        marginBottom:
            Spacing.xl,
        ...Shadows.sm,
    },

    verifiedContent: {
        marginLeft:
            Spacing.sm,
        flex: 1,
    },

    verifiedAddress: {
        fontSize: 14,
        fontFamily:
            Fonts.semiBold,
        color:
            Colors.text,
    },

    verifiedText: {
        marginTop: 2,
        fontSize: 12,
        fontFamily:
            Fonts.medium,
        color:
            Colors.success,
    },

    createButton: {
        marginTop:
            Spacing.md,
    },

});