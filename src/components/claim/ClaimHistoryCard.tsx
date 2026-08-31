import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Claim, ClaimStatus } from "../../types/claim";
import { Colors, Fonts, Radius, Shadows, Spacing } from "../../theme";

interface Props {
    claim: Claim;
    onPress: () => void;
}

const ClaimHistoryCard = ({ claim, onPress }: Props) => {
    const getStatusConfig = (status: ClaimStatus) => {
        switch (status) {
            case "APPROVED":
                return {
                    label: "Approved",
                    icon: "checkmark-circle" as const,
                    color: "#16A34A",
                    background: "#DCFCE7",
                };
            case "REJECTED":
                return {
                    label: "Rejected",
                    icon: "close-circle" as const,
                    color: "#DC2626",
                    background: "#FEE2E2",
                };
            default:
                return {
                    label: "Pending",
                    icon: "time" as const,
                    color: "#D97706",
                    background: "#FEF3C7",
                };
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const status = getStatusConfig(claim.status);

    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={onPress}
        >
            <View style={styles.topRow}>
                <View style={styles.itemIcon}>
                    <Ionicons
                        name="cube-outline"
                        size={23}
                        color={Colors.primary}
                    />
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.itemTitle} numberOfLines={2}>
                        {claim.itemTitle}
                    </Text>

                    <Text style={styles.claimId}>
                        Claim #{claim.id}
                    </Text>
                </View>

                <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={Colors.gray400}
                />
            </View>

            <View style={styles.divider} />

            <View style={styles.bottomRow}>
                <View style={styles.dateContainer}>
                    <Ionicons
                        name="calendar-outline"
                        size={16}
                        color={Colors.gray500}
                    />

                    <Text style={styles.dateText}>
                        Claimed {formatDate(claim.createdAt)}
                    </Text>
                </View>

                <View
                    style={[
                        styles.statusBadge,
                        { backgroundColor: status.background },
                    ]}
                >
                    <Ionicons
                        name={status.icon}
                        size={15}
                        color={status.color}
                    />

                    <Text
                        style={[
                            styles.statusText,
                            { color: status.color },
                        ]}
                    >
                        {status.label}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ClaimHistoryCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        padding: Spacing.md,
        marginBottom: Spacing.md,
        ...Shadows.sm,
    },
    topRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    itemIcon: {
        width: 46,
        height: 46,
        borderRadius: 14,
        backgroundColor: "#EEF4FF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: Spacing.md,
    },
    titleContainer: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
        fontFamily: Fonts.semiBold,
        color: Colors.text,
    },
    claimId: {
        marginTop: 4,
        fontSize: 12,
        fontFamily: Fonts.regular,
        color: Colors.gray500,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginVertical: Spacing.md,
    },
    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    dateContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    dateText: {
        marginLeft: 6,
        fontSize: 12,
        fontFamily: Fonts.regular,
        color: Colors.gray500,
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
    },
    statusText: {
        marginLeft: 4,
        fontSize: 11,
        fontFamily: Fonts.semiBold,
    },
});