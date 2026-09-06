import React, {
    useCallback,
    useState,
} from "react";

import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import {
    Ionicons,
} from "@expo/vector-icons";

import {
    NativeStackScreenProps,
} from "@react-navigation/native-stack";

import {
    useFocusEffect,
} from "@react-navigation/native";

import {
    MainStackParamList,
} from "../../navigation/MainNavigator";

import CachedImage
    from "../../components/common/ChachedImage";

import {
    PLACEHOLDER_IMAGE,
} from "../../constants/images";

import {
    formatRelativeTime,
} from "../../utils/date";

import {
    useClaims,
} from "../../context/ClaimContext";

import itemService
    from "../../services/itemService";

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
        "ItemDetails"
    >;

const ItemDetailsScreen = ({
    route,
    navigation,
}: Props) => {
    const { item: initialItem } = route.params;

    const [item, setItem] =
        useState(initialItem);

    const {
        getClaimForItem,
        refreshClaims,
    } = useClaims();

    const claim =
        getClaimForItem(item.id);

    const isActive =
        item.status === "ACTIVE";

    useFocusEffect(
        useCallback(() => {
            let active = true;

            const refreshScreen = async () => {
                try {
                    const [latestItem] =
                        await Promise.all([
                            itemService.getItemById(
                                initialItem.id
                            ),
                            refreshClaims(),
                        ]);

                    if (active) {
                        setItem(latestItem);
                    }
                } catch (error: any) {
                    console.log(
                        "Item Details Refresh Error:",
                        error.response?.data ||
                        error.message
                    );
                }
            };

            refreshScreen();

            return () => {
                active = false;
            };
        }, [initialItem.id])
    );

    const formatDate = (
        value: string
    ) => {
        if (!value) {
            return "Not specified";
        }

        const date =
            new Date(value);

        if (
            Number.isNaN(
                date.getTime()
            )
        ) {
            return value;
        }

        return date.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
            }
        );
    };

    const handleClaimPress = () => {
        if (!isActive || claim) {
            return;
        }

        navigation.navigate(
            "CreateClaim",
            { item }
        );
    };

    const handleViewClaim = () => {
        if (!claim) {
            return;
        }

        navigation.navigate(
            "ClaimDetails",
            {
                claimId: claim.id,
            }
        );
    };

    const renderClaimState = () => {
        if (!claim) {
            if (!isActive) {
                return (
                    <View
                        style={[
                            styles.stateCard,
                            styles.closedStateCard,
                        ]}
                    >
                        <View style={styles.stateHeader}>
                            <View
                                style={[
                                    styles.stateIcon,
                                    styles.closedStateIcon,
                                ]}
                            >
                                <Ionicons
                                    name="lock-closed-outline"
                                    size={22}
                                    color={Colors.gray600}
                                />
                            </View>

                            <View style={styles.stateHeaderText}>
                                <Text style={styles.stateTitle}>
                                    Item no longer available
                                </Text>

                                <Text style={styles.stateDescription}>
                                    An ownership claim for this item has already been approved. This item is no longer accepting new claims.
                                </Text>
                            </View>
                        </View>
                    </View>
                );
            }

            return (
                <View style={styles.claimSection}>
                    <View style={styles.claimHeadingRow}>
                        <View>
                            <Text style={styles.sectionTitle}>
                                Is this your item?
                            </Text>

                            <Text style={styles.sectionSubtitle}>
                                Submit an ownership claim for admin verification.
                            </Text>
                        </View>

                        <View style={styles.helpIcon}>
                            <Ionicons
                                name="shield-checkmark-outline"
                                size={21}
                                color={Colors.primary}
                            />
                        </View>
                    </View>

                    <View style={styles.processCard}>
                        <Text style={styles.processTitle}>
                            How claiming works
                        </Text>

                        <ProcessStep
                            number="1"
                            title="Submit your claim"
                            description="Provide details that can help prove the item belongs to you."
                            isLast={false}
                        />

                        <ProcessStep
                            number="2"
                            title="Admin reviews it"
                            description="The official Lost & Found team verifies your ownership details."
                            isLast={false}
                        />

                        <ProcessStep
                            number="3"
                            title="Receive the decision"
                            description="After review, CampusFound will update you whether your claim is approved or rejected."
                            isLast={false}
                        />

                        <ProcessStep
                            number="4"
                            title="Physical verification"
                            description="If approved, visit the official Lost & Found office with your college ID for final physical verification and collection."
                            isLast
                        />
                    </View>

                    <View style={styles.importantCard}>
                        <Ionicons
                            name="information-circle"
                            size={22}
                            color={Colors.primary}
                        />

                        <Text style={styles.importantText}>
                            Approval in the app does not directly hand over the item. The Lost & Found staff will perform final physical verification before returning it.
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.claimButton}
                        activeOpacity={0.82}
                        onPress={handleClaimPress}
                    >
                        <View>
                            <Text style={styles.claimButtonTitle}>
                                Claim This Item
                            </Text>

                            <Text style={styles.claimButtonSubtitle}>
                                Start ownership verification
                            </Text>
                        </View>

                        <View style={styles.buttonArrow}>
                            <Ionicons
                                name="arrow-forward"
                                size={20}
                                color={Colors.primary}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }

        if (claim.status === "PENDING") {
            return (
                <View
                    style={[
                        styles.stateCard,
                        styles.pendingStateCard,
                    ]}
                >
                    <View style={styles.stateHeader}>
                        <View
                            style={[
                                styles.stateIcon,
                                styles.pendingStateIcon,
                            ]}
                        >
                            <Ionicons
                                name="time-outline"
                                size={23}
                                color={Colors.warning}
                            />
                        </View>

                        <View style={styles.stateHeaderText}>
                            <Text style={styles.stateTitle}>
                                Claim under review
                            </Text>

                            <Text style={styles.stateDescription}>
                                Your ownership claim has been submitted successfully.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.reviewTimeline}>
                        <MiniStep
                            icon="checkmark-circle"
                            title="Claim submitted"
                            completed
                        />

                        <View style={styles.timelineLine} />

                        <MiniStep
                            icon="search-outline"
                            title="Admin reviewing"
                            active
                        />

                        <View style={styles.timelineLine} />

                        <MiniStep
                            icon="notifications-outline"
                            title="Decision update"
                        />
                    </View>

                    <View style={styles.stateInfoBox}>
                        <Ionicons
                            name="notifications-outline"
                            size={19}
                            color={Colors.warning}
                        />

                        <Text style={styles.stateInfoText}>
                            Once the Lost & Found admin completes the review, you will receive the claim decision in CampusFound.
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        activeOpacity={0.75}
                        onPress={handleViewClaim}
                    >
                        <Text style={styles.secondaryButtonText}>
                            View My Claim
                        </Text>

                        <Ionicons
                            name="chevron-forward"
                            size={18}
                            color={Colors.primary}
                        />
                    </TouchableOpacity>
                </View>
            );
        }

        if (claim.status === "APPROVED") {
            return (
                <View
                    style={[
                        styles.stateCard,
                        styles.approvedStateCard,
                    ]}
                >
                    <View style={styles.stateHeader}>
                        <View
                            style={[
                                styles.stateIcon,
                                styles.approvedStateIcon,
                            ]}
                        >
                            <Ionicons
                                name="checkmark-circle"
                                size={24}
                                color={Colors.success}
                            />
                        </View>

                        <View style={styles.stateHeaderText}>
                            <Text style={styles.stateTitle}>
                                Your claim was approved!
                            </Text>

                            <Text style={styles.stateDescription}>
                                The Lost & Found team has verified your submitted claim.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.collectionCard}>
                        <View style={styles.collectionHeader}>
                            <Ionicons
                                name="business-outline"
                                size={21}
                                color={Colors.success}
                            />

                            <Text style={styles.collectionTitle}>
                                What should I do now?
                            </Text>
                        </View>

                        <Text style={styles.collectionText}>
                            Visit the official Lost & Found office and show your college ID to the staff.
                        </Text>

                        <View style={styles.collectionPoint}>
                            <Ionicons
                                name="card-outline"
                                size={18}
                                color={Colors.gray600}
                            />

                            <Text style={styles.collectionPointText}>
                                Carry your valid college ID card
                            </Text>
                        </View>

                        <View style={styles.collectionPoint}>
                            <Ionicons
                                name="shield-checkmark-outline"
                                size={18}
                                color={Colors.gray600}
                            />

                            <Text style={styles.collectionPointText}>
                                Staff will perform final physical verification
                            </Text>
                        </View>

                        <View style={styles.collectionPoint}>
                            <Ionicons
                                name="cube-outline"
                                size={18}
                                color={Colors.gray600}
                            />

                            <Text style={styles.collectionPointText}>
                                The item will be handed over only after successful verification
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        activeOpacity={0.75}
                        onPress={handleViewClaim}
                    >
                        <Text style={styles.secondaryButtonText}>
                            View Claim Details
                        </Text>

                        <Ionicons
                            name="chevron-forward"
                            size={18}
                            color={Colors.primary}
                        />
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <View
                style={[
                    styles.stateCard,
                    styles.rejectedStateCard,
                ]}
            >
                <View style={styles.stateHeader}>
                    <View
                        style={[
                            styles.stateIcon,
                            styles.rejectedStateIcon,
                        ]}
                    >
                        <Ionicons
                            name="close-circle-outline"
                            size={24}
                            color={Colors.danger}
                        />
                    </View>

                    <View style={styles.stateHeaderText}>
                        <Text style={styles.stateTitle}>
                            Claim could not be verified
                        </Text>

                        <Text style={styles.stateDescription}>
                            The Lost & Found team could not confirm ownership from the details provided.
                        </Text>
                    </View>
                </View>

                <View style={styles.rejectedInfo}>
                    <Ionicons
                        name="information-circle-outline"
                        size={20}
                        color={Colors.danger}
                    />

                    <Text style={styles.rejectedInfoText}>
                        If you believe this decision needs clarification, contact the official Lost & Found office directly.
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.secondaryButton}
                    activeOpacity={0.75}
                    onPress={handleViewClaim}
                >
                    <Text style={styles.secondaryButtonText}>
                        View Claim Details
                    </Text>

                    <Ionicons
                        name="chevron-forward"
                        size={18}
                        color={Colors.primary}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.imageContainer}>
                <CachedImage
                    uri={item.imageUrl}
                    placeholder={PLACEHOLDER_IMAGE}
                    style={styles.image}
                />

                <View
                    style={[
                        styles.availabilityBadge,
                        isActive
                            ? styles.activeBadge
                            : styles.closedBadge,
                    ]}
                >
                    <View
                        style={[
                            styles.statusDot,
                            {
                                backgroundColor:
                                    isActive
                                        ? Colors.success
                                        : Colors.gray500,
                            },
                        ]}
                    />

                    <Text
                        style={[
                            styles.availabilityText,
                            {
                                color:
                                    isActive
                                        ? Colors.success
                                        : Colors.gray600,
                            },
                        ]}
                    >
                        {isActive
                            ? "Available"
                            : "Closed"}
                    </Text>
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.metaRow}>
                    <View style={styles.categoryBadge}>
                        <Ionicons
                            name="pricetag-outline"
                            size={13}
                            color={Colors.primary}
                        />

                        <Text style={styles.categoryText}>
                            {item.category}
                        </Text>
                    </View>

                    <Text style={styles.time}>
                        {formatRelativeTime(item.createdAt)}
                    </Text>
                </View>

                <Text style={styles.title}>
                    {item.title}
                </Text>

                <View style={styles.locationRow}>
                    <Ionicons
                        name="location-outline"
                        size={18}
                        color={Colors.primary}
                    />

                    <Text style={styles.locationText}>
                        {item.location}
                    </Text>
                </View>

                <View style={styles.divider} />

                <Text style={styles.sectionTitle}>
                    About this item
                </Text>

                <Text style={styles.description}>
                    {item.description}
                </Text>

                <View style={styles.detailsCard}>
                    <InfoRow
                        icon="location-outline"
                        label="Found at"
                        value={item.location}
                    />

                    <View style={styles.rowDivider} />

                    <InfoRow
                        icon="calendar-outline"
                        label="Found date"
                        value={formatDate(
                            item.lostFoundDate
                        )}
                    />

                    <View style={styles.rowDivider} />

                    <InfoRow
                        icon="person-outline"
                        label="Reported by"
                        value={item.reportedBy}
                    />

                    <View style={styles.rowDivider} />

                    <InfoRow
                        icon="pricetag-outline"
                        label="Category"
                        value={item.category}
                    />
                </View>

                {renderClaimState()}
            </View>
        </ScrollView>
    );
};

interface InfoRowProps {
    icon:
        keyof typeof Ionicons.glyphMap;
    label: string;
    value: string;
}

const InfoRow = ({
    icon,
    label,
    value,
}: InfoRowProps) => {
    return (
        <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
                <Ionicons
                    name={icon}
                    size={19}
                    color={Colors.primary}
                />
            </View>

            <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>
                    {label}
                </Text>

                <Text style={styles.infoValue}>
                    {value}
                </Text>
            </View>
        </View>
    );
};

interface ProcessStepProps {
    number: string;
    title: string;
    description: string;
    isLast: boolean;
}

const ProcessStep = ({
    number,
    title,
    description,
    isLast,
}: ProcessStepProps) => {
    return (
        <View style={styles.processStep}>
            <View style={styles.processIndicator}>
                <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>
                        {number}
                    </Text>
                </View>

                {!isLast && (
                    <View style={styles.stepLine} />
                )}
            </View>

            <View style={styles.processContent}>
                <Text style={styles.processStepTitle}>
                    {title}
                </Text>

                <Text style={styles.processStepDescription}>
                    {description}
                </Text>
            </View>
        </View>
    );
};

interface MiniStepProps {
    icon:
        keyof typeof Ionicons.glyphMap;
    title: string;
    completed?: boolean;
    active?: boolean;
}

const MiniStep = ({
    icon,
    title,
    completed = false,
    active = false,
}: MiniStepProps) => {
    const highlighted =
        completed || active;

    return (
        <View style={styles.miniStep}>
            <View
                style={[
                    styles.miniStepIcon,
                    highlighted &&
                        styles.miniStepIconHighlighted,
                ]}
            >
                <Ionicons
                    name={icon}
                    size={17}
                    color={
                        highlighted
                            ? Colors.primary
                            : Colors.gray400
                    }
                />
            </View>

            <Text
                style={[
                    styles.miniStepText,
                    highlighted &&
                        styles.miniStepTextHighlighted,
                ]}
            >
                {title}
            </Text>
        </View>
    );
};

export default ItemDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    scrollContent: {
        paddingBottom: 100,
    },

    imageContainer: {
        position: "relative",
        backgroundColor: Colors.gray100,
    },

    image: {
        width: "100%",
        height: 285,
    },

    availabilityBadge: {
        position: "absolute",
        right: Spacing.md,
        bottom: Spacing.md,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: Radius.pill,
        borderWidth: 1,
    },

    activeBadge: {
        backgroundColor: Colors.successSoft,
        borderColor: "#BBF7D0",
    },

    closedBadge: {
        backgroundColor: Colors.gray100,
        borderColor: Colors.gray200,
    },

    statusDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        marginRight: 6,
    },

    availabilityText: {
        fontSize: 12,
        fontFamily: Fonts.semiBold,
    },

    content: {
        padding: Spacing.lg,
    },

    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: Spacing.md,
    },

    categoryBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: Radius.pill,
        backgroundColor: Colors.primarySoft,
    },

    categoryText: {
        marginLeft: 5,
        fontSize: 12,
        color: Colors.primary,
        fontFamily: Fonts.semiBold,
    },

    time: {
        fontSize: 12,
        color: Colors.gray500,
        fontFamily: Fonts.regular,
    },

    title: {
        fontSize: 27,
        lineHeight: 34,
        fontFamily: Fonts.bold,
        color: Colors.text,
    },

    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: Spacing.sm,
    },

    locationText: {
        flex: 1,
        marginLeft: 6,
        fontSize: 14,
        lineHeight: 20,
        color: Colors.textSecondary,
        fontFamily: Fonts.medium,
    },

    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginVertical: Spacing.lg,
    },

    sectionTitle: {
        fontSize: 18,
        fontFamily: Fonts.bold,
        color: Colors.text,
    },

    sectionSubtitle: {
        marginTop: 4,
        maxWidth: 280,
        fontSize: 13,
        lineHeight: 19,
        fontFamily: Fonts.regular,
        color: Colors.textSecondary,
    },

    description: {
        marginTop: Spacing.sm,
        fontSize: 15,
        lineHeight: 23,
        fontFamily: Fonts.regular,
        color: Colors.textSecondary,
    },

    detailsCard: {
        marginTop: Spacing.lg,
        paddingHorizontal: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: Radius.lg,
        backgroundColor: Colors.white,
        ...Shadows.sm,
    },

    infoRow: {
        minHeight: 72,
        flexDirection: "row",
        alignItems: "center",
    },

    infoIcon: {
        width: 38,
        height: 38,
        borderRadius: Radius.md,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primarySoft,
    },

    infoContent: {
        flex: 1,
        marginLeft: Spacing.md,
    },

    infoLabel: {
        fontSize: 11,
        fontFamily: Fonts.medium,
        color: Colors.gray500,
    },

    infoValue: {
        marginTop: 3,
        fontSize: 14,
        lineHeight: 19,
        fontFamily: Fonts.semiBold,
        color: Colors.text,
    },

    rowDivider: {
        height: 1,
        marginLeft: 54,
        backgroundColor: Colors.gray100,
    },

    claimSection: {
        marginTop: Spacing.xl,
    },

    claimHeadingRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },

    helpIcon: {
        width: 42,
        height: 42,
        borderRadius: Radius.md,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primarySoft,
    },

    processCard: {
        marginTop: Spacing.lg,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: Radius.lg,
        backgroundColor: Colors.white,
    },

    processTitle: {
        marginBottom: Spacing.md,
        fontSize: 15,
        fontFamily: Fonts.semiBold,
        color: Colors.text,
    },

    processStep: {
        flexDirection: "row",
    },

    processIndicator: {
        width: 36,
        alignItems: "center",
    },

    stepNumber: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primarySoft,
        borderWidth: 1,
        borderColor: Colors.primaryLight,
    },

    stepNumberText: {
        fontSize: 12,
        fontFamily: Fonts.bold,
        color: Colors.primary,
    },

    stepLine: {
        flex: 1,
        width: 2,
        minHeight: 40,
        backgroundColor: Colors.primaryLight,
    },

    processContent: {
        flex: 1,
        paddingLeft: Spacing.sm,
        paddingBottom: Spacing.lg,
    },

    processStepTitle: {
        fontSize: 14,
        lineHeight: 20,
        fontFamily: Fonts.semiBold,
        color: Colors.text,
    },

    processStepDescription: {
        marginTop: 3,
        fontSize: 12,
        lineHeight: 18,
        fontFamily: Fonts.regular,
        color: Colors.textSecondary,
    },

    importantCard: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: Spacing.md,
        padding: Spacing.md,
        borderRadius: Radius.md,
        backgroundColor: Colors.primarySoft,
    },

    importantText: {
        flex: 1,
        marginLeft: Spacing.sm,
        fontSize: 12,
        lineHeight: 19,
        fontFamily: Fonts.medium,
        color: Colors.gray700,
    },

    claimButton: {
        minHeight: 64,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: Spacing.md,
        paddingHorizontal: Spacing.md,
        borderRadius: Radius.lg,
        backgroundColor: Colors.primary,
        ...Shadows.sm,
    },

    claimButtonTitle: {
        fontSize: 15,
        fontFamily: Fonts.semiBold,
        color: Colors.white,
    },

    claimButtonSubtitle: {
        marginTop: 3,
        fontSize: 11,
        fontFamily: Fonts.regular,
        color: Colors.primaryLight,
    },

    buttonArrow: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.white,
    },

    stateCard: {
        marginTop: Spacing.xl,
        padding: Spacing.md,
        borderWidth: 1,
        borderRadius: Radius.lg,
        ...Shadows.sm,
    },

    pendingStateCard: {
        borderColor: "#FDE68A",
        backgroundColor: "#FFFBEB",
    },

    approvedStateCard: {
        borderColor: "#BBF7D0",
        backgroundColor: "#F0FDF4",
    },

    rejectedStateCard: {
        borderColor: "#FECACA",
        backgroundColor: "#FEF2F2",
    },

    closedStateCard: {
        borderColor: Colors.gray200,
        backgroundColor: Colors.gray50,
    },

    stateHeader: {
        flexDirection: "row",
        alignItems: "flex-start",
    },

    stateIcon: {
        width: 44,
        height: 44,
        borderRadius: Radius.md,
        alignItems: "center",
        justifyContent: "center",
    },

    pendingStateIcon: {
        backgroundColor: Colors.warningSoft,
    },

    approvedStateIcon: {
        backgroundColor: Colors.successSoft,
    },

    rejectedStateIcon: {
        backgroundColor: Colors.dangerSoft,
    },

    closedStateIcon: {
        backgroundColor: Colors.gray100,
    },

    stateHeaderText: {
        flex: 1,
        marginLeft: Spacing.md,
    },

    stateTitle: {
        fontSize: 16,
        lineHeight: 22,
        fontFamily: Fonts.bold,
        color: Colors.text,
    },

    stateDescription: {
        marginTop: 4,
        fontSize: 13,
        lineHeight: 19,
        fontFamily: Fonts.regular,
        color: Colors.textSecondary,
    },

    reviewTimeline: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: Spacing.lg,
    },

    miniStep: {
        width: 72,
        alignItems: "center",
    },

    miniStepIcon: {
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.border,
    },

    miniStepIconHighlighted: {
        backgroundColor: Colors.primarySoft,
        borderColor: Colors.primaryLight,
    },

    miniStepText: {
        marginTop: 6,
        fontSize: 10,
        lineHeight: 14,
        textAlign: "center",
        fontFamily: Fonts.medium,
        color: Colors.gray400,
    },

    miniStepTextHighlighted: {
        color: Colors.gray700,
    },

    timelineLine: {
        flex: 1,
        height: 2,
        marginTop: 16,
        backgroundColor: Colors.border,
    },

    stateInfoBox: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: Spacing.lg,
        padding: Spacing.md,
        borderRadius: Radius.md,
        backgroundColor: Colors.white,
    },

    stateInfoText: {
        flex: 1,
        marginLeft: Spacing.sm,
        fontSize: 12,
        lineHeight: 18,
        fontFamily: Fonts.regular,
        color: Colors.gray700,
    },

    collectionCard: {
        marginTop: Spacing.lg,
        padding: Spacing.md,
        borderRadius: Radius.md,
        backgroundColor: Colors.white,
    },

    collectionHeader: {
        flexDirection: "row",
        alignItems: "center",
    },

    collectionTitle: {
        marginLeft: Spacing.sm,
        fontSize: 14,
        fontFamily: Fonts.semiBold,
        color: Colors.text,
    },

    collectionText: {
        marginTop: Spacing.sm,
        fontSize: 13,
        lineHeight: 20,
        fontFamily: Fonts.regular,
        color: Colors.textSecondary,
    },

    collectionPoint: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: Spacing.md,
    },

    collectionPointText: {
        flex: 1,
        marginLeft: Spacing.sm,
        fontSize: 12,
        lineHeight: 18,
        fontFamily: Fonts.medium,
        color: Colors.gray700,
    },

    rejectedInfo: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: Spacing.lg,
        padding: Spacing.md,
        borderRadius: Radius.md,
        backgroundColor: Colors.white,
    },

    rejectedInfoText: {
        flex: 1,
        marginLeft: Spacing.sm,
        fontSize: 12,
        lineHeight: 18,
        fontFamily: Fonts.regular,
        color: Colors.gray700,
    },

    secondaryButton: {
        minHeight: 48,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: Spacing.md,
        paddingHorizontal: Spacing.md,
        borderRadius: Radius.md,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.border,
    },

    secondaryButtonText: {
        fontSize: 13,
        fontFamily: Fonts.semiBold,
        color: Colors.primary,
    },
});