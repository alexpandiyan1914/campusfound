import React, {
    useCallback,
    useState,
} from "react";

import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import {
    SafeAreaView,
} from "react-native-safe-area-context";

import {
    useFocusEffect,
    useNavigation,
} from "@react-navigation/native";

import {
    NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { Ionicons } from "@expo/vector-icons";

import PrimaryButton from "../../components/buttons/PrimaryButton";
import ClaimStatusChip from "../../components/claim/ClaimStatusChip";

import claimService from "../../services/claimService";

import { Claim } from "../../types/claim";

import {
    Colors,
    Fonts,
    Radius,
    Shadows,
    Spacing,
} from "../../theme";

import {
    MainStackParamList,
} from "../../navigation/MainNavigator";


type Props = NativeStackScreenProps<
    MainStackParamList,
    "AdminClaimDetails"
>;


const AdminClaimDetailsScreen = ({
    route,
}: Props) => {

    const { claimId } = route.params;

    const navigation =
        useNavigation();


    const [claim, setClaim] =
        useState<Claim | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [actionLoading, setActionLoading] =
        useState(false);


    // ==========================================
    // LOAD CLAIM
    // ==========================================

    const loadClaim = async () => {

        try {

            const data =
                await claimService.getClaimById(
                    claimId
                );

            setClaim(data);

        } catch (error: any) {

            console.log(
                "Admin Claim Details Error:",
                error.response?.data ||
                error.message
            );

            Alert.alert(
                "Error",
                "Failed to load claim details.",
                [
                    {
                        text: "Go Back",
                        onPress: () =>
                            navigation.goBack(),
                    },
                ]
            );

        } finally {

            setLoading(false);

        }

    };


    useFocusEffect(
        useCallback(() => {

            loadClaim();

        }, [claimId])
    );


    // ==========================================
    // APPROVE CLAIM
    // ==========================================

    const handleApprove = () => {

        if (!claim) return;

        Alert.alert(
            "Approve Claim",
            `Are you sure you want to approve ${claim.claimedBy}'s claim for "${claim.itemTitle}"?`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },

                {
                    text: "Approve",
                    onPress: confirmApprove,
                },
            ]
        );

    };


    const confirmApprove = async () => {

        if (!claim) return;

        try {

            setActionLoading(true);

            const updatedClaim =
                await claimService.approveClaim(
                    claim.id
                );

            setClaim(updatedClaim);

            Alert.alert(
                "Claim Approved",
                "The claim has been approved and the item has been closed."
            );

        } catch (error: any) {

            console.log(
                "Approve Claim Error:",
                error.response?.data ||
                error.message
            );

            Alert.alert(
                "Approval Failed",
                error.response?.data?.message ||
                "Unable to approve this claim."
            );

        } finally {

            setActionLoading(false);

        }

    };


    // ==========================================
    // REJECT CLAIM
    // ==========================================

    const handleReject = () => {

        if (!claim) return;

        Alert.alert(
            "Reject Claim",
            `Are you sure you want to reject ${claim.claimedBy}'s claim?`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },

                {
                    text: "Reject",
                    style: "destructive",
                    onPress: confirmReject,
                },
            ]
        );

    };


    const confirmReject = async () => {

        if (!claim) return;

        try {

            setActionLoading(true);

            const updatedClaim =
                await claimService.rejectClaim(
                    claim.id
                );

            setClaim(updatedClaim);

            Alert.alert(
                "Claim Rejected",
                "The claim has been rejected."
            );

        } catch (error: any) {

            console.log(
                "Reject Claim Error:",
                error.response?.data ||
                error.message
            );

            Alert.alert(
                "Rejection Failed",
                error.response?.data?.message ||
                "Unable to reject this claim."
            );

        } finally {

            setActionLoading(false);

        }

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <SafeAreaView
                style={styles.loadingContainer}
            >

                <ActivityIndicator
                    size="large"
                    color={Colors.primary}
                />

            </SafeAreaView>

        );

    }


    // ==========================================
    // CLAIM NOT FOUND
    // ==========================================

    if (!claim) {

        return (

            <SafeAreaView
                style={styles.loadingContainer}
            >

                <Ionicons
                    name="alert-circle-outline"
                    size={50}
                    color={Colors.danger}
                />

                <Text
                    style={styles.errorTitle}
                >
                    Claim not found
                </Text>

            </SafeAreaView>

        );

    }


    const isPending =
        claim.status === "PENDING";


    // ==========================================
    // UI
    // ==========================================

    return (

        <SafeAreaView
            style={styles.container}
        >

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={
                    styles.content
                }
            >

                {/* Header */}

                <View style={styles.header}>

                    <View>

                        <Text
                            style={styles.headerTitle}
                        >
                            Claim Details
                        </Text>

                        <Text
                            style={styles.headerSubtitle}
                        >
                            Review this student's claim
                        </Text>

                    </View>

                    <ClaimStatusChip
                        status={claim.status}
                    />

                </View>


                {/* Item Information */}

                <View style={styles.card}>

                    <View
                        style={
                            styles.cardHeader
                        }
                    >

                        <View
                            style={
                                styles.iconContainer
                            }
                        >

                            <Ionicons
                                name="cube-outline"
                                size={24}
                                color={
                                    Colors.primary
                                }
                            />

                        </View>

                        <Text
                            style={styles.cardTitle}
                        >
                            Item Information
                        </Text>

                    </View>


                    <View
                        style={styles.divider}
                    />


                    <InfoRow
                        icon="pricetag-outline"
                        label="Item"
                        value={
                            claim.itemTitle
                        }
                    />

                    <InfoRow
                        icon="key-outline"
                        label="Item ID"
                        value={
                            `#${claim.itemId}`
                        }
                    />

                </View>


                {/* Claimant Information */}

                <View style={styles.card}>

                    <View
                        style={
                            styles.cardHeader
                        }
                    >

                        <View
                            style={
                                styles.iconContainer
                            }
                        >

                            <Ionicons
                                name="person-outline"
                                size={24}
                                color={
                                    Colors.primary
                                }
                            />

                        </View>

                        <Text
                            style={styles.cardTitle}
                        >
                            Claimant Information
                        </Text>

                    </View>


                    <View
                        style={styles.divider}
                    />


                    <InfoRow
                        icon="person-outline"
                        label="Name"
                        value={
                            claim.claimedBy
                        }
                    />

                    <InfoRow
                        icon="mail-outline"
                        label="Email"
                        value={
                            claim.claimantEmail
                        }
                    />

                </View>


                {/* Claim Reason */}

                <View style={styles.card}>

                    <View
                        style={
                            styles.cardHeader
                        }
                    >

                        <View
                            style={
                                styles.iconContainer
                            }
                        >

                            <Ionicons
                                name="chatbubble-ellipses-outline"
                                size={24}
                                color={
                                    Colors.primary
                                }
                            />

                        </View>

                        <Text
                            style={styles.cardTitle}
                        >
                            Claim Reason
                        </Text>

                    </View>


                    <View
                        style={styles.divider}
                    />


                    <Text
                        style={styles.reason}
                    >
                        {claim.reason}
                    </Text>

                </View>


                {/* Dates */}

                <View style={styles.card}>

                    <InfoRow
                        icon="calendar-outline"
                        label="Created"
                        value={
                            new Date(
                                claim.createdAt
                            ).toLocaleString()
                        }
                    />

                    <InfoRow
                        icon="refresh-outline"
                        label="Updated"
                        value={
                            new Date(
                                claim.updatedAt
                            ).toLocaleString()
                        }
                    />

                </View>


                {/* Actions */}

                {isPending && (

                    <View
                        style={
                            styles.actionContainer
                        }
                    >

                        <PrimaryButton
                            title="Approve Claim"
                            onPress={
                                handleApprove
                            }
                            loading={
                                actionLoading
                            }
                        />


                        <View
                            style={
                                styles.actionGap
                            }
                        />


                        <PrimaryButton
                            title="Reject Claim"
                            onPress={
                                handleReject
                            }
                            disabled={
                                actionLoading
                            }
                        />

                    </View>

                )}


                {/* Final State */}

                {!isPending && (

                    <View
                        style={[
                            styles.finalState,
                            claim.status ===
                                "APPROVED"
                                ? styles.approvedState
                                : styles.rejectedState,
                        ]}
                    >

                        <Ionicons
                            name={
                                claim.status ===
                                "APPROVED"
                                    ? "checkmark-circle"
                                    : "close-circle"
                            }
                            size={28}
                            color={
                                claim.status ===
                                "APPROVED"
                                    ? Colors.success
                                    : Colors.danger
                            }
                        />

                        <View
                            style={
                                styles.finalContent
                            }
                        >

                            <Text
                                style={
                                    styles.finalTitle
                                }
                            >
                                {claim.status ===
                                "APPROVED"
                                    ? "Claim Approved"
                                    : "Claim Rejected"}
                            </Text>

                            <Text
                                style={
                                    styles.finalText
                                }
                            >
                                {claim.status ===
                                "APPROVED"
                                    ? "This claim has been approved. The associated item is now closed."
                                    : "This claim has been rejected and cannot be reviewed again."}
                            </Text>

                        </View>

                    </View>

                )}

            </ScrollView>

        </SafeAreaView>

    );

};


// ==========================================
// INFO ROW
// ==========================================

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

        <View
            style={styles.infoRow}
        >

            <Ionicons
                name={icon}
                size={19}
                color={Colors.gray500}
            />

            <View
                style={styles.infoContent}
            >

                <Text
                    style={styles.infoLabel}
                >
                    {label}
                </Text>

                <Text
                    style={styles.infoValue}
                >
                    {value}
                </Text>

            </View>

        </View>

    );

};


export default AdminClaimDetailsScreen;


// ==========================================
// STYLES
// ==========================================

const styles = StyleSheet.create({

    container: {

        flex: 1,

        backgroundColor:
            Colors.background,

    },

    loadingContainer: {

        flex: 1,

        justifyContent:
            "center",

        alignItems:
            "center",

        backgroundColor:
            Colors.background,

        padding:
            Spacing.lg,

    },

    content: {

        padding:
            Spacing.lg,

        paddingBottom: 120,

    },

    header: {

        flexDirection:
            "row",

        justifyContent:
            "space-between",

        alignItems:
            "center",

        marginBottom:
            Spacing.lg,

    },

    headerTitle: {

        fontSize: 27,

        fontFamily:
            Fonts.bold,

        color:
            Colors.text,

    },

    headerSubtitle: {

        marginTop: 4,

        fontSize: 13,

        fontFamily:
            Fonts.regular,

        color:
            Colors.textSecondary,

    },

    card: {

        backgroundColor:
            Colors.white,

        borderRadius:
            Radius.lg,

        padding:
            Spacing.lg,

        marginBottom:
            Spacing.md,

        ...Shadows.sm,

    },

    cardHeader: {

        flexDirection:
            "row",

        alignItems:
            "center",

    },

    iconContainer: {

        width: 44,

        height: 44,

        borderRadius: 22,

        backgroundColor:
            "#EFF6FF",

        justifyContent:
            "center",

        alignItems:
            "center",

        marginRight:
            Spacing.sm,

    },

    cardTitle: {

        fontSize: 16,

        fontFamily:
            Fonts.bold,

        color:
            Colors.text,

    },

    divider: {

        height: 1,

        backgroundColor:
            Colors.border,

        marginVertical:
            Spacing.md,

    },

    infoRow: {

        flexDirection:
            "row",

        alignItems:
            "center",

        marginBottom:
            Spacing.md,

    },

    infoContent: {

        flex: 1,

        marginLeft:
            Spacing.sm,

    },

    infoLabel: {

        fontSize: 11,

        fontFamily:
            Fonts.medium,

        color:
            Colors.gray500,

    },

    infoValue: {

        marginTop: 2,

        fontSize: 14,

        fontFamily:
            Fonts.semiBold,

        color:
            Colors.text,

    },

    reason: {

        fontSize: 15,

        lineHeight: 23,

        fontFamily:
            Fonts.regular,

        color:
            Colors.text,

    },

    actionContainer: {

        marginTop:
            Spacing.sm,

    },

    actionGap: {

        height: Spacing.md,

    },

    finalState: {

        flexDirection:
            "row",

        alignItems:
            "flex-start",

        borderRadius:
            Radius.lg,

        padding:
            Spacing.lg,

        marginTop:
            Spacing.sm,

    },

    approvedState: {

        backgroundColor:
            "#DCFCE7",

    },

    rejectedState: {

        backgroundColor:
            "#FEE2E2",

    },

    finalContent: {

        flex: 1,

        marginLeft:
            Spacing.sm,

    },

    finalTitle: {

        fontSize: 16,

        fontFamily:
            Fonts.bold,

        color:
            Colors.text,

    },

    finalText: {

        marginTop: 4,

        fontSize: 13,

        lineHeight: 19,

        fontFamily:
            Fonts.regular,

        color:
            Colors.textSecondary,

    },

    errorTitle: {

        marginTop:
            Spacing.md,

        fontSize: 18,

        fontFamily:
            Fonts.bold,

        color:
            Colors.text,

    },

});