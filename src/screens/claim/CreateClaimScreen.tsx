import React, {
    useState,
} from "react";

import {
    ActivityIndicator,
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
    Ionicons,
} from "@expo/vector-icons";

import {
    NativeStackScreenProps,
} from "@react-navigation/native-stack";

import {
    MainStackParamList,
} from "../../navigation/MainNavigator";

import {
    useClaims,
} from "../../context/ClaimContext";

import useFeedback
    from "../../hooks/useFeedback";

import getErrorMessage
    from "../../utils/getErrorMessage";

import CachedImage
    from "../../components/common/ChachedImage";

import {
    PLACEHOLDER_IMAGE,
} from "../../constants/images";

import {
    Colors,
    Fonts,
    Radius,
    Shadows,
    Spacing,
} from "../../theme";

type Props =
    NativeStackScreenProps<
        MainStackParamList,
        "CreateClaim"
    >;

const CreateClaimScreen = ({
    route,
    navigation,
}: Props) => {
    const { item } = route.params;

    const {
        createClaim,
    } = useClaims();

    const {
        showSuccess,
        showError,
        showWarning,
    } = useFeedback();

    const [reason, setReason] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const trimmedReason =
        reason.trim();

    const wordCount =
        trimmedReason
            .split(/\s+/)
            .filter(Boolean)
            .length;

    const canSubmit =
        trimmedReason.length >= 15 &&
        trimmedReason.length <= 500 &&
        wordCount >= 3 &&
        !loading;

    const validateReason = () => {
        const trimmedReason = reason.trim();
        const words = trimmedReason
            .split(/\s+/)
            .filter(Boolean);

        if (!trimmedReason) {
            showWarning(
                "Claim Details Required",
                "Please explain how you can identify this item."
            );
            return false;
        }

        if (trimmedReason.length < 15) {
            showWarning(
                "More Details Needed",
                "Please provide at least 15 characters about the item."
            );
            return false;
        }

        if (words.length < 3) {
            showWarning(
                "More Details Needed",
                "Please provide a more meaningful ownership description."
            );
            return false;
        }

        if (trimmedReason.length > 500) {
            showWarning(
                "Claim Too Long",
                "Claim details cannot exceed 500 characters."
            );
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {

        if (!validateReason()) {
            return;
        }
        
        try {
            setLoading(true);

            const newClaim =
                await createClaim({
                    itemId: item.id,
                    reason: trimmedReason,
                });

            showSuccess(
                "Claim Submitted",
                "Your claim has been sent to the Lost & Found team for verification."
            );

            navigation.replace(
                "ClaimDetails",
                {
                    claimId:
                        newClaim.id,
                }
            );
        } catch (error: any) {
            console.log(
                "Create Claim Error:",
                error.response?.data ||
                error.message
            );

            showError(
                "Claim Failed",
                getErrorMessage(
                    error,
                    "We couldn't submit your claim. Please try again."
                )
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView
            style={styles.container}
            edges={[
                "left",
                "right",
                "bottom",
            ]}
        >
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={
                    Platform.OS === "ios"
                        ? "padding"
                        : undefined
                }
            >
                <ScrollView
                    contentContainerStyle={
                        styles.scrollContent
                    }
                    showsVerticalScrollIndicator={
                        false
                    }
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.intro}>
                        <View style={styles.introIcon}>
                            <Ionicons
                                name="shield-checkmark-outline"
                                size={24}
                                color={Colors.primary}
                            />
                        </View>

                        <Text style={styles.title}>
                            Verify your ownership
                        </Text>

                        <Text style={styles.subtitle}>
                            Help the Lost & Found team confirm that this item belongs to you.
                        </Text>
                    </View>

                    <View style={styles.itemCard}>
                        <CachedImage
                            uri={item.imageUrl}
                            placeholder={
                                PLACEHOLDER_IMAGE
                            }
                            style={styles.itemImage}
                        />

                        <View style={styles.itemContent}>
                            <View
                                style={
                                    styles.categoryBadge
                                }
                            >
                                <Text
                                    style={
                                        styles.categoryText
                                    }
                                >
                                    {item.category}
                                </Text>
                            </View>

                            <Text
                                style={styles.itemTitle}
                                numberOfLines={2}
                            >
                                {item.title}
                            </Text>

                            <View
                                style={
                                    styles.itemLocation
                                }
                            >
                                <Ionicons
                                    name="location-outline"
                                    size={16}
                                    color={
                                        Colors.gray500
                                    }
                                />

                                <Text
                                    style={
                                        styles.locationText
                                    }
                                    numberOfLines={1}
                                >
                                    {item.location}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            What should I provide?
                        </Text>

                        <Text
                            style={
                                styles.sectionDescription
                            }
                        >
                            Describe something that can help distinguish you as the real owner.
                        </Text>

                        <View
                            style={
                                styles.exampleContainer
                            }
                        >
                            <ExampleRow
                                icon="finger-print-outline"
                                text="A unique mark, scratch, sticker or identifying feature"
                            />

                            <ExampleRow
                                icon="cube-outline"
                                text="Something that was inside the item"
                            />

                            <ExampleRow
                                icon="location-outline"
                                text="Where or approximately when you lost it"
                            />

                            <ExampleRow
                                icon="information-circle-outline"
                                text="Another detail that only the actual owner is likely to know"
                                last
                            />
                        </View>
                    </View>

                    <View style={styles.formSection}>
                        <View style={styles.labelRow}>
                            <Text style={styles.inputLabel}>
                                Ownership details
                            </Text>

                            <Text style={styles.required}>
                                Required
                            </Text>
                        </View>

                        <TextInput
                            style={styles.input}
                            value={reason}
                            onChangeText={
                                setReason
                            }
                            placeholder="Example: I lost this wallet near the library yesterday. It has a small scratch on the back and contains..."
                            placeholderTextColor={
                                Colors.gray400
                            }
                            multiline
                            maxLength={500}
                            textAlignVertical="top"
                            editable={!loading}
                        />

                        <View style={styles.inputFooter}>
                            <View
                                style={
                                    styles.privacyHint
                                }
                            >
                                <Ionicons
                                    name="lock-closed-outline"
                                    size={14}
                                    color={
                                        Colors.gray500
                                    }
                                />

                                <Text
                                    style={
                                        styles.privacyText
                                    }
                                >
                                    Provide only details needed for ownership verification.
                                </Text>
                            </View>

                            <Text
                                style={
                                    styles.characterCount
                                }
                            >
                                {trimmedReason.length}/500 characters
                            </Text>
                        </View>
                    </View>

                    <View style={styles.warningCard}>
                        <View style={styles.warningIcon}>
                            <Ionicons
                                name="warning-outline"
                                size={20}
                                color={Colors.warning}
                            />
                        </View>

                        <View style={styles.warningContent}>
                            <Text style={styles.warningTitle}>
                                Keep sensitive information private
                            </Text>

                            <Text style={styles.warningText}>
                                Don't include passwords, PINs, OTPs, banking details or other unnecessary sensitive information.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.nextSection}>
                        <Text style={styles.sectionTitle}>
                            What happens after I submit?
                        </Text>

                        <View style={styles.timeline}>
                            <TimelineStep
                                icon="paper-plane-outline"
                                title="Claim submitted"
                                description="Your ownership details are securely sent to the Lost & Found team."
                                first
                            />

                            <TimelineStep
                                icon="search-outline"
                                title="Admin verification"
                                description="An authorized Lost & Found admin reviews the information you provided."
                            />

                            <TimelineStep
                                icon="notifications-outline"
                                title="Review decision"
                                description="CampusFound will show whether your claim has been approved or rejected after admin review."
                            />

                            <TimelineStep
                                icon="business-outline"
                                title="Visit the Lost & Found office"
                                description="If approved, visit the official Lost & Found office for physical verification."
                            />

                            <TimelineStep
                                icon="card-outline"
                                title="Verify and collect"
                                description="Carry your college ID. The item will be handed over only after final verification."
                                last
                            />
                        </View>
                    </View>

                    <View style={styles.approvalNotice}>
                        <Ionicons
                            name="shield-checkmark"
                            size={22}
                            color={Colors.primary}
                        />

                        <View style={styles.approvalTextContainer}>
                            <Text
                                style={
                                    styles.approvalTitle
                                }
                            >
                                App approval is not final collection
                            </Text>

                            <Text
                                style={
                                    styles.approvalText
                                }
                            >
                                An approved claim means you can proceed to the Lost & Found office. Staff may still verify your identity and ownership before handing over the item.
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.submitButton,
                            !canSubmit &&
                            styles.submitButtonDisabled,
                        ]}
                        activeOpacity={0.82}
                        disabled={!canSubmit}
                        onPress={handleSubmit}
                    >
                        {loading ? (
                            <ActivityIndicator
                                size="small"
                                color={Colors.white}
                            />
                        ) : (
                            <>
                                <View>
                                    <Text
                                        style={
                                            styles.submitTitle
                                        }
                                    >
                                        Submit Claim
                                    </Text>

                                    <Text
                                        style={
                                            styles.submitSubtitle
                                        }
                                    >
                                        Send for ownership verification
                                    </Text>
                                </View>

                                <View
                                    style={
                                        styles.submitArrow
                                    }
                                >
                                    <Ionicons
                                        name="arrow-forward"
                                        size={19}
                                        color={
                                            canSubmit
                                                ? Colors.primary
                                                : Colors.gray400
                                        }
                                    />
                                </View>
                            </>
                        )}
                    </TouchableOpacity>

                    <Text style={styles.footerNote}>
                        Please submit only genuine ownership claims. False claims may be rejected by the Lost & Found team.
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

interface ExampleRowProps {
    icon:
    keyof typeof Ionicons.glyphMap;
    text: string;
    last?: boolean;
}

const ExampleRow = ({
    icon,
    text,
    last = false,
}: ExampleRowProps) => {
    return (
        <View
            style={[
                styles.exampleRow,
                last &&
                styles.exampleRowLast,
            ]}
        >
            <View style={styles.exampleIcon}>
                <Ionicons
                    name={icon}
                    size={18}
                    color={Colors.primary}
                />
            </View>

            <Text style={styles.exampleText}>
                {text}
            </Text>
        </View>
    );
};

interface TimelineStepProps {
    icon:
    keyof typeof Ionicons.glyphMap;
    title: string;
    description: string;
    first?: boolean;
    last?: boolean;
}

const TimelineStep = ({
    icon,
    title,
    description,
    first = false,
    last = false,
}: TimelineStepProps) => {
    return (
        <View style={styles.timelineStep}>
            <View
                style={
                    styles.timelineIndicator
                }
            >
                {!first ? (
                    <View
                        style={
                            styles.timelineTopLine
                        }
                    />
                ) : (
                    <View
                        style={
                            styles.timelineLinePlaceholder
                        }
                    />
                )}

                <View
                    style={
                        styles.timelineIcon
                    }
                >
                    <Ionicons
                        name={icon}
                        size={17}
                        color={Colors.primary}
                    />
                </View>

                {!last ? (
                    <View
                        style={
                            styles.timelineBottomLine
                        }
                    />
                ) : (
                    <View
                        style={
                            styles.timelineLinePlaceholder
                        }
                    />
                )}
            </View>

            <View
                style={
                    styles.timelineContent
                }
            >
                <Text
                    style={
                        styles.timelineTitle
                    }
                >
                    {title}
                </Text>

                <Text
                    style={
                        styles.timelineDescription
                    }
                >
                    {description}
                </Text>
            </View>
        </View>
    );
};

export default CreateClaimScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    flex: {
        flex: 1,
    },

    scrollContent: {
        padding: Spacing.lg,
        paddingBottom: 60,
    },

    intro: {
        alignItems: "center",
        paddingHorizontal: Spacing.sm,
        marginBottom: Spacing.lg,
    },

    introIcon: {
        width: 52,
        height: 52,
        borderRadius: Radius.lg,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primarySoft,
        marginBottom: Spacing.md,
    },

    title: {
        fontSize: 25,
        lineHeight: 31,
        textAlign: "center",
        fontFamily: Fonts.bold,
        color: Colors.text,
    },

    subtitle: {
        marginTop: Spacing.sm,
        maxWidth: 330,
        textAlign: "center",
        fontSize: 14,
        lineHeight: 21,
        fontFamily: Fonts.regular,
        color: Colors.textSecondary,
    },

    itemCard: {
        flexDirection: "row",
        padding: Spacing.sm,
        borderRadius: Radius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
        backgroundColor: Colors.white,
        ...Shadows.sm,
    },

    itemImage: {
        width: 88,
        height: 88,
        borderRadius: Radius.md,
        backgroundColor: Colors.gray100,
    },

    itemContent: {
        flex: 1,
        justifyContent: "center",
        marginLeft: Spacing.md,
    },

    categoryBadge: {
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: Radius.pill,
        backgroundColor: Colors.primarySoft,
    },

    categoryText: {
        fontSize: 10,
        fontFamily: Fonts.semiBold,
        color: Colors.primary,
    },

    itemTitle: {
        marginTop: 7,
        fontSize: 15,
        lineHeight: 20,
        fontFamily: Fonts.semiBold,
        color: Colors.text,
    },

    itemLocation: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },

    locationText: {
        flex: 1,
        marginLeft: 4,
        fontSize: 12,
        fontFamily: Fonts.regular,
        color: Colors.gray500,
    },

    section: {
        marginTop: Spacing.xl,
    },

    sectionTitle: {
        fontSize: 18,
        fontFamily: Fonts.bold,
        color: Colors.text,
    },

    sectionDescription: {
        marginTop: 5,
        fontSize: 13,
        lineHeight: 19,
        fontFamily: Fonts.regular,
        color: Colors.textSecondary,
    },

    exampleContainer: {
        marginTop: Spacing.md,
        paddingHorizontal: Spacing.md,
        borderRadius: Radius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
        backgroundColor: Colors.white,
    },

    exampleRow: {
        minHeight: 60,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray100,
    },

    exampleRowLast: {
        borderBottomWidth: 0,
    },

    exampleIcon: {
        width: 34,
        height: 34,
        borderRadius: Radius.md,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primarySoft,
    },

    exampleText: {
        flex: 1,
        marginLeft: Spacing.md,
        fontSize: 12,
        lineHeight: 18,
        fontFamily: Fonts.medium,
        color: Colors.gray700,
    },

    formSection: {
        marginTop: Spacing.xl,
    },

    labelRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: Spacing.sm,
    },

    inputLabel: {
        fontSize: 15,
        fontFamily: Fonts.semiBold,
        color: Colors.text,
    },

    required: {
        fontSize: 11,
        fontFamily: Fonts.medium,
        color: Colors.primary,
    },

    input: {
        minHeight: 150,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.borderStrong,
        borderRadius: Radius.lg,
        backgroundColor: Colors.white,
        fontSize: 14,
        lineHeight: 21,
        fontFamily: Fonts.regular,
        color: Colors.text,
    },

    inputFooter: {
        marginTop: Spacing.sm,
    },

    privacyHint: {
        flexDirection: "row",
        alignItems: "flex-start",
    },

    privacyText: {
        flex: 1,
        marginLeft: 5,
        fontSize: 11,
        lineHeight: 16,
        fontFamily: Fonts.regular,
        color: Colors.gray500,
    },

    characterCount: {
        marginTop: 5,
        textAlign: "right",
        fontSize: 10,
        fontFamily: Fonts.regular,
        color: Colors.gray400,
    },

    warningCard: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: Spacing.lg,
        padding: Spacing.md,
        borderRadius: Radius.lg,
        backgroundColor: Colors.warningSoft,
    },

    warningIcon: {
        width: 36,
        height: 36,
        borderRadius: Radius.md,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.white,
    },

    warningContent: {
        flex: 1,
        marginLeft: Spacing.md,
    },

    warningTitle: {
        fontSize: 13,
        fontFamily: Fonts.semiBold,
        color: Colors.text,
    },

    warningText: {
        marginTop: 4,
        fontSize: 11,
        lineHeight: 17,
        fontFamily: Fonts.regular,
        color: Colors.gray700,
    },

    nextSection: {
        marginTop: Spacing.xl,
    },

    timeline: {
        marginTop: Spacing.md,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: Radius.lg,
        backgroundColor: Colors.white,
    },

    timelineStep: {
        flexDirection: "row",
        minHeight: 82,
    },

    timelineIndicator: {
        width: 40,
        alignItems: "center",
    },

    timelineTopLine: {
        width: 2,
        height: 10,
        backgroundColor: Colors.primaryLight,
    },

    timelineBottomLine: {
        flex: 1,
        width: 2,
        backgroundColor: Colors.primaryLight,
    },

    timelineLinePlaceholder: {
        width: 2,
        height: 10,
    },

    timelineIcon: {
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: Colors.primaryLight,
        backgroundColor: Colors.primarySoft,
    },

    timelineContent: {
        flex: 1,
        paddingLeft: Spacing.sm,
        paddingBottom: Spacing.md,
    },

    timelineTitle: {
        fontSize: 14,
        lineHeight: 20,
        fontFamily: Fonts.semiBold,
        color: Colors.text,
    },

    timelineDescription: {
        marginTop: 3,
        fontSize: 12,
        lineHeight: 18,
        fontFamily: Fonts.regular,
        color: Colors.textSecondary,
    },

    approvalNotice: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: Spacing.lg,
        padding: Spacing.md,
        borderRadius: Radius.lg,
        backgroundColor: Colors.primarySoft,
    },

    approvalTextContainer: {
        flex: 1,
        marginLeft: Spacing.sm,
    },

    approvalTitle: {
        fontSize: 13,
        fontFamily: Fonts.semiBold,
        color: Colors.text,
    },

    approvalText: {
        marginTop: 4,
        fontSize: 11,
        lineHeight: 18,
        fontFamily: Fonts.regular,
        color: Colors.gray700,
    },

    submitButton: {
        minHeight: 64,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: Spacing.xl,
        paddingHorizontal: Spacing.md,
        borderRadius: Radius.lg,
        backgroundColor: Colors.primary,
        ...Shadows.sm,
    },

    submitButtonDisabled: {
        backgroundColor: Colors.disabled,
    },

    submitTitle: {
        fontSize: 15,
        fontFamily: Fonts.semiBold,
        color: Colors.white,
    },

    submitSubtitle: {
        marginTop: 3,
        fontSize: 11,
        fontFamily: Fonts.regular,
        color: Colors.primaryLight,
    },

    submitArrow: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.white,
    },

    footerNote: {
        marginTop: Spacing.md,
        paddingHorizontal: Spacing.sm,
        textAlign: "center",
        fontSize: 10,
        lineHeight: 16,
        fontFamily: Fonts.regular,
        color: Colors.gray500,
    },
});