import React, {
    useEffect,
    useState,
} from "react";

import {
    Image,
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

import {
    Ionicons,
} from "@expo/vector-icons";

import authService
    from "../../services/authService";

import useFeedback
    from "../../hooks/useFeedback";

import PrimaryButton
    from "../../components/buttons/PrimaryButton";

import {
    AuthStackParamList,
} from "../../types/navigation";

import {
    Colors,
    Fonts,
    Radius,
    Shadows,
    Spacing,
} from "../../theme";

type Props =
    NativeStackScreenProps<
        AuthStackParamList,
        "Register"
    >;

type RegisterStep =
    | "EMAIL"
    | "OTP"
    | "DETAILS";

const YEAR_OPTIONS = [
    { label: "1st Year", value: "1" },
    { label: "2nd Year", value: "2" },
    { label: "3rd Year", value: "3" },
    { label: "4th Year", value: "4" },
    { label: "5th Year", value: "5" },
];

const RegisterScreen = ({
    navigation,
}: Props) => {
    const {
        showSuccess,
        showError,
        showWarning,
    } = useFeedback();

    const [step, setStep] =
        useState<RegisterStep>(
            "EMAIL"
        );

    const [email, setEmail] =
        useState("");

    const [otp, setOtp] =
        useState("");

    const [
        countdown,
        setCountdown,
    ] = useState(0);

    const [
        fullName,
        setFullName,
    ] = useState("");

    const [phone, setPhone] =
        useState("");

    const [
        department,
        setDepartment,
    ] = useState("");

    const [year, setYear] =
        useState("");

    const [
        yearDropdownOpen,
        setYearDropdownOpen,
    ] = useState(false);

    const [
        password,
        setPassword,
    ] = useState("");

    const [
        confirmPassword,
        setConfirmPassword,
    ] = useState("");

    const [
        passwordVisible,
        setPasswordVisible,
    ] = useState(false);

    const [
        confirmPasswordVisible,
        setConfirmPasswordVisible,
    ] = useState(false);

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {
        if (
            countdown <= 0
        ) {
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

    const isTceEmail = (
        value: string
    ) => {
        const normalized =
            value
                .trim()
                .toLowerCase();

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return (
            emailRegex.test(
                normalized
            ) &&
            (
                normalized.endsWith(
                    "@student.tce.edu"
                ) ||
                normalized.endsWith(
                    "@tce.edu"
                )
            )
        );
    };

    const hasMinimumLength =
        password.length >= 8;

    const hasLetter =
        /[A-Za-z]/.test(
            password
        );

    const hasNumber =
        /\d/.test(
            password
        );

    const hasSpecialCharacter =
        /[^A-Za-z0-9]/.test(
            password
        );

    const isStrongPassword =
        hasMinimumLength &&
        hasLetter &&
        hasNumber &&
        hasSpecialCharacter;

    const handleSendOtp =
        async () => {
            const normalizedEmail =
                email
                    .trim()
                    .toLowerCase();

            if (
                !normalizedEmail
            ) {
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
            } catch (
            error: any
            ) {
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

    const handleResendOtp =
        async () => {
            if (
                countdown > 0
            ) {
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
            } catch (
            error: any
            ) {
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

    const handleVerifyOtp =
        async () => {
            if (
                !/^\d{6}$/.test(
                    otp
                )
            ) {
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

                setStep("DETAILS");
            } catch (
            error: any
            ) {
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

    const handleRegister =
        async () => {
            if (
                !fullName.trim() ||
                !phone.trim() ||
                !department.trim() ||
                !year ||
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
                fullName.trim().length <
                3
            ) {
                showWarning(
                    "Invalid Name",
                    "Please enter your full name."
                );

                return;
            }

            if (
                !/^\d{10}$/.test(
                    phone.trim()
                )
            ) {
                showWarning(
                    "Invalid Phone Number",
                    "Please enter a valid 10-digit phone number."
                );

                return;
            }

            if (
                department
                    .trim()
                    .length < 2
            ) {
                showWarning(
                    "Invalid Department",
                    "Please enter your department."
                );

                return;
            }

            if (
                !YEAR_OPTIONS.some(
                    option =>
                        option.value ===
                        year
                )
            ) {
                showWarning(
                    "Year Required",
                    "Please select your year of study."
                );

                return;
            }

            if (
                !isStrongPassword
            ) {
                showWarning(
                    "Weak Password",
                    "Password must contain at least 8 characters, including a letter, number and special character."
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

            try {
                setLoading(true);

                const response =
                    await authService
                        .register({
                            fullName:
                                fullName.trim(),

                            email,

                            phone:
                                phone.trim(),

                            department:
                                department.trim(),

                            year:
                                Number(year),

                            password,
                        });

                showSuccess(
                    "Account Created",
                    response.message ||
                    "Registration successful. Please login."
                );

                navigation.navigate(
                    "Login"
                );
            } catch (
            error: any
            ) {
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

    const renderLogo = () => (
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

            <Text
                style={
                    styles.brandName
                }
            >
                CampusFound
            </Text>
        </View>
    );

    const renderEmailStep =
        () => (
            <View>
                {renderLogo()}

                <StepIndicator
                    current={1}
                />

                <Text
                    style={styles.title}
                >
                    Create your account
                </Text>

                <Text
                    style={
                        styles.subtitle
                    }
                >
                    Verify your TCE email to get started.
                </Text>

                <Text
                    style={styles.label}
                >
                    College Email
                </Text>

                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={
                        setEmail
                    }
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoCorrect={false}
                    placeholder="example@student.tce.edu"
                    placeholderTextColor={
                        Colors.gray400
                    }
                    editable={!loading}
                />

                <Text
                    style={styles.helper}
                >
                    Use your @student.tce.edu or @tce.edu email address.
                </Text>

                <PrimaryButton
                    title="Send OTP"
                    onPress={
                        handleSendOtp
                    }
                    loading={loading}
                    disabled={loading}
                />

                <View
                    style={
                        styles.loginRow
                    }
                >
                    <Text
                        style={
                            styles.loginText
                        }
                    >
                        Already have an account?
                    </Text>

                    <TouchableOpacity
                        activeOpacity={0.7}
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

    const renderOtpStep =
        () => (
            <View>
                {renderLogo()}

                <StepIndicator
                    current={2}
                />

                <TouchableOpacity
                    style={
                        styles.backRow
                    }
                    activeOpacity={0.7}
                    onPress={() => {
                        setStep("EMAIL");
                        setOtp("");
                    }}
                >
                    <Ionicons
                        name="arrow-back"
                        size={20}
                        color={
                            Colors.primary
                        }
                    />

                    <Text
                        style={
                            styles.backText
                        }
                    >
                        Change email
                    </Text>
                </TouchableOpacity>

                <Text
                    style={styles.title}
                >
                    Verify your email
                </Text>

                <Text
                    style={
                        styles.subtitleSmall
                    }
                >
                    Enter the 6-digit verification code sent to
                </Text>

                <Text
                    style={
                        styles.emailDisplay
                    }
                >
                    {email}
                </Text>

                <Text
                    style={styles.label}
                >
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

                <Text
                    style={
                        styles.otpHelper
                    }
                >
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
                                activeOpacity={0.7}
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

    const renderDetailsStep =
        () => (
            <View>
                {renderLogo()}

                <StepIndicator
                    current={3}
                />

                <Text
                    style={styles.title}
                >
                    Complete your profile
                </Text>

                <Text
                    style={
                        styles.subtitle
                    }
                >
                    Add a few details to finish creating your CampusFound account.
                </Text>

                <View
                    style={
                        styles.verifiedEmail
                    }
                >
                    <Ionicons
                        name="checkmark-circle"
                        size={22}
                        color={
                            Colors.success
                        }
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
                    autoCapitalize="words"
                />

                <FormInput
                    label="Phone Number"
                    value={phone}
                    onChangeText={value =>
                        setPhone(
                            value
                                .replace(
                                    /\D/g,
                                    ""
                                )
                                .slice(
                                    0,
                                    10
                                )
                        )
                    }
                    placeholder="9876543210"
                    keyboardType="phone-pad"
                    maxLength={10}
                />

                <FormInput
                    label="Department"
                    value={department}
                    onChangeText={
                        setDepartment
                    }
                    placeholder="Example: CSE"
                    autoCapitalize="characters"
                />

                <View
                    style={styles.field}
                >
                    <Text
                        style={styles.label}
                    >
                        Year
                    </Text>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={
                            styles.dropdown
                        }
                        onPress={() =>
                            setYearDropdownOpen(
                                prev => !prev
                            )
                        }
                    >
                        <Text
                            style={[
                                styles.dropdownText,
                                !year &&
                                styles.dropdownPlaceholder,
                            ]}
                        >
                            {year
                                ? YEAR_OPTIONS.find(
                                    option =>
                                        option.value ===
                                        year
                                )?.label
                                : "Select year"}
                        </Text>

                        <Ionicons
                            name={
                                yearDropdownOpen
                                    ? "chevron-up"
                                    : "chevron-down"
                            }
                            size={20}
                            color={
                                Colors.gray500
                            }
                        />
                    </TouchableOpacity>

                    {yearDropdownOpen && (
                        <View
                            style={
                                styles.dropdownMenu
                            }
                        >
                            {YEAR_OPTIONS.map(
                                (
                                    option,
                                    index
                                ) => (
                                    <TouchableOpacity
                                        key={
                                            option.value
                                        }
                                        activeOpacity={0.7}
                                        style={[
                                            styles.dropdownOption,
                                            index !==
                                            YEAR_OPTIONS.length -
                                            1 &&
                                            styles.dropdownOptionBorder,
                                        ]}
                                        onPress={() => {
                                            setYear(
                                                option.value
                                            );

                                            setYearDropdownOpen(
                                                false
                                            );
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.dropdownOptionText,
                                                year ===
                                                option.value &&
                                                styles.dropdownOptionSelected,
                                            ]}
                                        >
                                            {
                                                option.label
                                            }
                                        </Text>

                                        {year ===
                                            option.value && (
                                                <Ionicons
                                                    name="checkmark"
                                                    size={18}
                                                    color={
                                                        Colors.primary
                                                    }
                                                />
                                            )}
                                    </TouchableOpacity>
                                )
                            )}
                        </View>
                    )}
                </View>

                <PasswordInput
                    label="Password"
                    value={password}
                    onChangeText={
                        setPassword
                    }
                    placeholder="Create a password"
                    visible={
                        passwordVisible
                    }
                    onToggle={() =>
                        setPasswordVisible(
                            prev => !prev
                        )
                    }
                />

                {!!password && (
                    <View
                        style={
                            styles.passwordRules
                        }
                    >
                        <PasswordRule
                            valid={
                                hasMinimumLength
                            }
                            text="At least 8 characters"
                        />

                        <PasswordRule
                            valid={
                                hasLetter
                            }
                            text="Contains a letter"
                        />

                        <PasswordRule
                            valid={
                                hasNumber
                            }
                            text="Contains a number"
                        />

                        <PasswordRule
                            valid={
                                hasSpecialCharacter
                            }
                            text="Contains a special character"
                        />
                    </View>
                )}

                <PasswordInput
                    label="Confirm Password"
                    value={
                        confirmPassword
                    }
                    onChangeText={
                        setConfirmPassword
                    }
                    placeholder="Re-enter your password"
                    visible={
                        confirmPasswordVisible
                    }
                    onToggle={() =>
                        setConfirmPasswordVisible(
                            prev => !prev
                        )
                    }
                />

                {confirmPassword.length >
                    0 && (
                        <View
                            style={
                                styles.matchRow
                            }
                        >
                            <Ionicons
                                name={
                                    password ===
                                        confirmPassword
                                        ? "checkmark-circle"
                                        : "alert-circle"
                                }
                                size={16}
                                color={
                                    password ===
                                        confirmPassword
                                        ? Colors.success
                                        : Colors.danger
                                }
                            />

                            <Text
                                style={[
                                    styles.matchText,
                                    {
                                        color:
                                            password ===
                                                confirmPassword
                                                ? Colors.success
                                                : Colors.danger,
                                    },
                                ]}
                            >
                                {password ===
                                    confirmPassword
                                    ? "Passwords match"
                                    : "Passwords do not match"}
                            </Text>
                        </View>
                    )}

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

                <Text
                    style={
                        styles.accountNote
                    }
                >
                    By creating an account, you agree to use CampusFound responsibly for campus lost-and-found testing.
                </Text>
            </View>
        );

    return (
        <SafeAreaView
            style={styles.container}
        >
            <KeyboardAvoidingView
                style={styles.keyboard}
                behavior={
                    Platform.OS ===
                        "ios"
                        ? "padding"
                        : undefined
                }
            >
                <ScrollView
                    showsVerticalScrollIndicator={
                        false
                    }
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={
                        styles.content
                    }
                >
                    {step ===
                        "EMAIL" &&
                        renderEmailStep()}

                    {step ===
                        "OTP" &&
                        renderOtpStep()}

                    {step ===
                        "DETAILS" &&
                        renderDetailsStep()}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const getErrorMessage = (
    error: any,
    fallback: string
): string => {
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

    return fallback;
};

interface FormInputProps {
    label: string;
    value: string;
    onChangeText:
    (value: string) => void;
    placeholder: string;
    keyboardType?: any;
    maxLength?: number;
    autoCapitalize?:
    | "none"
    | "sentences"
    | "words"
    | "characters";
}

const FormInput = ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType,
    maxLength,
    autoCapitalize = "sentences",
}: FormInputProps) => (
    <View
        style={styles.field}
    >
        <Text
            style={styles.label}
        >
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
            maxLength={
                maxLength
            }
            autoCapitalize={
                autoCapitalize
            }
            autoCorrect={false}
        />
    </View>
);

interface PasswordInputProps {
    label: string;
    value: string;
    onChangeText:
    (value: string) => void;
    placeholder: string;
    visible: boolean;
    onToggle: () => void;
}

const PasswordInput = ({
    label,
    value,
    onChangeText,
    placeholder,
    visible,
    onToggle,
}: PasswordInputProps) => (
    <View
        style={styles.field}
    >
        <Text
            style={styles.label}
        >
            {label}
        </Text>

        <View
            style={
                styles.passwordContainer
            }
        >
            <TextInput
                style={
                    styles.passwordInput
                }
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
                secureTextEntry={
                    !visible
                }
                autoCapitalize="none"
                autoCorrect={false}
            />

            <TouchableOpacity
                activeOpacity={0.7}
                style={
                    styles.eyeButton
                }
                onPress={onToggle}
            >
                <Ionicons
                    name={
                        visible
                            ? "eye-off-outline"
                            : "eye-outline"
                    }
                    size={21}
                    color={
                        Colors.gray500
                    }
                />
            </TouchableOpacity>
        </View>
    </View>
);

const PasswordRule = ({
    valid,
    text,
}: {
    valid: boolean;
    text: string;
}) => (
    <View
        style={
            styles.passwordRule
        }
    >
        <Ionicons
            name={
                valid
                    ? "checkmark-circle"
                    : "ellipse-outline"
            }
            size={15}
            color={
                valid
                    ? Colors.success
                    : Colors.gray400
            }
        />

        <Text
            style={[
                styles.passwordRuleText,
                valid &&
                styles.passwordRuleValid,
            ]}
        >
            {text}
        </Text>
    </View>
);

const StepIndicator = ({
    current,
}: {
    current: number;
}) => (
    <View
        style={styles.steps}
    >
        {[1, 2, 3].map(
            stepNumber => (
                <React.Fragment
                    key={stepNumber}
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
                                size={15}
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
                                {stepNumber}
                            </Text>
                        )}
                    </View>

                    {stepNumber <
                        3 && (
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

export default RegisterScreen;

const styles =
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor:
                Colors.background,
        },

        keyboard: {
            flex: 1,
        },

        content: {
            paddingHorizontal:
                Spacing.lg,
            paddingTop:
                Spacing.md,
            paddingBottom: 60,
        },

        logoContainer: {
            alignItems:
                "center",
            marginBottom:
                Spacing.md,
        },

        logo: {
            width: 74,
            height: 74,
        },

        brandName: {
            marginTop: 3,
            fontSize: 15,
            fontFamily:
                Fonts.bold,
            color:
                Colors.primary,
        },

        steps: {
            flexDirection:
                "row",
            alignItems:
                "center",
            justifyContent:
                "center",
            marginBottom:
                Spacing.xl,
        },

        stepCircle: {
            width: 30,
            height: 30,
            borderRadius: 15,
            borderWidth: 2,
            borderColor:
                Colors.gray300,
            justifyContent:
                "center",
            alignItems:
                "center",
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
            fontSize: 12,
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
            width: 52,
            height: 2,
            backgroundColor:
                Colors.border,
        },

        activeStepLine: {
            backgroundColor:
                Colors.primary,
        },

        title: {
            fontSize: 25,
            fontFamily:
                Fonts.bold,
            color: Colors.text,
        },

        subtitle: {
            marginTop: 5,
            marginBottom:
                Spacing.lg,
            fontSize: 14,
            lineHeight: 20,
            fontFamily:
                Fonts.regular,
            color:
                Colors.textSecondary,
        },

        subtitleSmall: {
            marginTop: 5,
            fontSize: 14,
            lineHeight: 20,
            fontFamily:
                Fonts.regular,
            color:
                Colors.textSecondary,
        },

        label: {
            marginBottom: 7,
            fontSize: 13,
            fontFamily:
                Fonts.semiBold,
            color: Colors.text,
        },

        field: {
            marginBottom:
                Spacing.md,
        },

        input: {
            height: 52,
            borderWidth: 1,
            borderColor:
                Colors.border,
            borderRadius:
                Radius.md,
            backgroundColor:
                Colors.white,
            paddingHorizontal: 15,
            fontSize: 14,
            fontFamily:
                Fonts.regular,
            color: Colors.text,
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
            flexDirection:
                "row",
            justifyContent:
                "center",
            marginTop:
                Spacing.xl,
        },

        loginText: {
            fontSize: 13,
            fontFamily:
                Fonts.regular,
            color:
                Colors.textSecondary,
        },

        loginLink: {
            marginLeft: 5,
            fontSize: 13,
            fontFamily:
                Fonts.semiBold,
            color:
                Colors.primary,
        },

        backRow: {
            flexDirection:
                "row",
            alignItems:
                "center",
            alignSelf:
                "flex-start",
            marginBottom:
                Spacing.md,
        },

        backText: {
            marginLeft: 6,
            fontSize: 13,
            fontFamily:
                Fonts.semiBold,
            color:
                Colors.primary,
        },

        emailDisplay: {
            marginTop: 3,
            marginBottom:
                Spacing.lg,
            fontSize: 14,
            fontFamily:
                Fonts.semiBold,
            color:
                Colors.primary,
        },

        otpInput: {
            textAlign:
                "center",
            letterSpacing: 10,
            fontSize: 21,
            fontFamily:
                Fonts.bold,
        },

        otpHelper: {
            marginTop: 8,
            marginBottom:
                Spacing.lg,
            textAlign:
                "center",
            fontSize: 12,
            fontFamily:
                Fonts.regular,
            color:
                Colors.gray500,
        },

        resendContainer: {
            marginTop:
                Spacing.lg,
            alignItems:
                "center",
        },

        resendCountdown: {
            fontSize: 13,
            fontFamily:
                Fonts.medium,
            color:
                Colors.gray500,
        },

        resendText: {
            fontSize: 13,
            fontFamily:
                Fonts.regular,
            color:
                Colors.textSecondary,
        },

        resendLink: {
            marginTop: 4,
            fontSize: 13,
            fontFamily:
                Fonts.semiBold,
            color:
                Colors.primary,
        },

        verifiedEmail: {
            flexDirection:
                "row",
            alignItems:
                "center",
            padding:
                Spacing.md,
            borderRadius:
                Radius.md,
            backgroundColor:
                "#DCFCE7",
            marginBottom:
                Spacing.lg,
            ...Shadows.sm,
        },

        verifiedContent: {
            flex: 1,
            marginLeft:
                Spacing.sm,
        },

        verifiedAddress: {
            fontSize: 13,
            fontFamily:
                Fonts.semiBold,
            color: Colors.text,
        },

        verifiedText: {
            marginTop: 2,
            fontSize: 11,
            fontFamily:
                Fonts.medium,
            color:
                Colors.success,
        },

        dropdown: {
            height: 52,
            flexDirection:
                "row",
            alignItems:
                "center",
            justifyContent:
                "space-between",
            paddingHorizontal: 15,
            borderWidth: 1,
            borderColor:
                Colors.border,
            borderRadius:
                Radius.md,
            backgroundColor:
                Colors.white,
        },

        dropdownText: {
            fontSize: 14,
            fontFamily:
                Fonts.regular,
            color: Colors.text,
        },

        dropdownPlaceholder: {
            color:
                Colors.gray400,
        },

        dropdownMenu: {
            marginTop: 6,
            borderWidth: 1,
            borderColor:
                Colors.border,
            borderRadius:
                Radius.md,
            overflow: "hidden",
            backgroundColor:
                Colors.white,
            ...Shadows.sm,
        },

        dropdownOption: {
            minHeight: 46,
            flexDirection:
                "row",
            alignItems:
                "center",
            justifyContent:
                "space-between",
            paddingHorizontal: 15,
        },

        dropdownOptionBorder: {
            borderBottomWidth: 1,
            borderBottomColor:
                Colors.border,
        },

        dropdownOptionText: {
            fontSize: 14,
            fontFamily:
                Fonts.regular,
            color: Colors.text,
        },

        dropdownOptionSelected: {
            fontFamily:
                Fonts.semiBold,
            color:
                Colors.primary,
        },

        passwordContainer: {
            height: 52,
            flexDirection:
                "row",
            alignItems:
                "center",
            borderWidth: 1,
            borderColor:
                Colors.border,
            borderRadius:
                Radius.md,
            backgroundColor:
                Colors.white,
        },

        passwordInput: {
            flex: 1,
            height: "100%",
            paddingLeft: 15,
            paddingRight: 8,
            fontSize: 14,
            fontFamily:
                Fonts.regular,
            color: Colors.text,
        },

        eyeButton: {
            width: 48,
            height: "100%",
            alignItems:
                "center",
            justifyContent:
                "center",
        },

        passwordRules: {
            marginTop:
                -Spacing.sm,
            marginBottom:
                Spacing.md,
            paddingHorizontal: 2,
            gap: 5,
        },

        passwordRule: {
            flexDirection:
                "row",
            alignItems:
                "center",
        },

        passwordRuleText: {
            marginLeft: 6,
            fontSize: 11,
            fontFamily:
                Fonts.regular,
            color:
                Colors.gray500,
        },

        passwordRuleValid: {
            color:
                Colors.success,
        },

        matchRow: {
            flexDirection:
                "row",
            alignItems:
                "center",
            marginTop:
                -Spacing.sm,
            marginBottom:
                Spacing.sm,
        },

        matchText: {
            marginLeft: 5,
            fontSize: 11,
            fontFamily:
                Fonts.medium,
        },

        createButton: {
            marginTop:
                Spacing.sm,
        },

        accountNote: {
            marginTop:
                Spacing.md,
            paddingHorizontal:
                Spacing.sm,
            textAlign:
                "center",
            fontSize: 11,
            lineHeight: 17,
            fontFamily:
                Fonts.regular,
            color:
                Colors.gray500,
        },
    });