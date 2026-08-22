import React from "react";

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import {
    Colors,
    Fonts,
    Radius,
    Shadows,
    Spacing,
} from "../../theme";

import { Claim } from "../../types/claim";

import { formatRelativeTime } from "../../utils/date";

interface Props {

    claim: Claim;

    onPress: () => void;

}

const PendingClaimCard = ({
    claim,
    onPress,
}: Props) => {

    return (

        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.card}
            onPress={onPress}
        >

            {/* Header */}

            <View style={styles.header}>

                <View style={styles.itemIcon}>

                    <Ionicons
                        name="cube-outline"
                        size={22}
                        color={Colors.primary}
                    />

                </View>

                <View style={styles.headerContent}>

                    <Text
                        style={styles.itemTitle}
                        numberOfLines={1}
                    >
                        {claim.itemTitle}
                    </Text>

                    <Text style={styles.date}>
                        {formatRelativeTime(claim.createdAt)}
                    </Text>

                </View>

                <View style={styles.pendingBadge}>

                    <Text style={styles.pendingText}>
                        PENDING
                    </Text>

                </View>

            </View>


            {/* Claimant */}

            <View style={styles.infoRow}>

                <Ionicons
                    name="person-outline"
                    size={18}
                    color={Colors.gray500}
                />

                <Text
                    style={styles.infoText}
                    numberOfLines={1}
                >
                    {claim.claimedBy}
                </Text>

            </View>


            {/* Email */}

            <View style={styles.infoRow}>

                <Ionicons
                    name="mail-outline"
                    size={18}
                    color={Colors.gray500}
                />

                <Text
                    style={styles.infoText}
                    numberOfLines={1}
                >
                    {claim.claimantEmail}
                </Text>

            </View>


            {/* Reason */}

            <View style={styles.reasonContainer}>

                <Text style={styles.reasonLabel}>
                    Claim Reason
                </Text>

                <Text
                    style={styles.reason}
                    numberOfLines={2}
                >
                    {claim.reason}
                </Text>

            </View>


            {/* Footer */}

            <View style={styles.footer}>

                <Text style={styles.viewText}>
                    View Claim
                </Text>

                <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={Colors.primary}
                />

            </View>

        </TouchableOpacity>

    );
};

export default PendingClaimCard;


const styles = StyleSheet.create({

    card: {

        backgroundColor: Colors.white,

        borderRadius: Radius.lg,

        padding: Spacing.lg,

        marginBottom: Spacing.md,

        ...Shadows.sm,

    },

    header: {

        flexDirection: "row",

        alignItems: "center",

        marginBottom: Spacing.md,

    },

    itemIcon: {

        width: 44,
        height: 44,

        borderRadius: 22,

        backgroundColor: "#EFF6FF",

        justifyContent: "center",
        alignItems: "center",

        marginRight: Spacing.sm,

    },

    headerContent: {

        flex: 1,

        marginRight: Spacing.sm,

    },

    itemTitle: {

        fontSize: 16,

        fontFamily: Fonts.bold,

        color: Colors.text,

    },

    date: {

        marginTop: 3,

        fontSize: 12,

        fontFamily: Fonts.regular,

        color: Colors.gray500,

    },

    pendingBadge: {

        backgroundColor: "#FEF3C7",

        paddingHorizontal: 9,

        paddingVertical: 5,

        borderRadius: Radius.lg,

    },

    pendingText: {

        color: "#B45309",

        fontSize: 10,

        fontFamily: Fonts.bold,

    },

    infoRow: {

        flexDirection: "row",

        alignItems: "center",

        marginTop: 8,

    },

    infoText: {

        flex: 1,

        marginLeft: 10,

        fontSize: 14,

        fontFamily: Fonts.medium,

        color: Colors.textSecondary,

    },

    reasonContainer: {

        marginTop: Spacing.md,

        padding: Spacing.md,

        backgroundColor: Colors.background,

        borderRadius: Radius.md,

    },

    reasonLabel: {

        fontSize: 11,

        fontFamily: Fonts.bold,

        color: Colors.gray500,

        textTransform: "uppercase",

        marginBottom: 5,

    },

    reason: {

        fontSize: 14,

        lineHeight: 20,

        fontFamily: Fonts.regular,

        color: Colors.text,

    },

    footer: {

        flexDirection: "row",

        justifyContent: "flex-end",

        alignItems: "center",

        marginTop: Spacing.md,

    },

    viewText: {

        marginRight: 4,

        color: Colors.primary,

        fontSize: 14,

        fontFamily: Fonts.semiBold,

    },

});