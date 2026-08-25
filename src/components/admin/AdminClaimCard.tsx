import React from "react";

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { Claim } from "../../types/claim";

import ClaimStatusChip
    from "../claim/ClaimStatusChip";

import { formatRelativeTime }
    from "../../utils/date";

import {
    Colors,
    Fonts,
    Radius,
    Shadows,
    Spacing,
} from "../../theme";

interface Props {
    claim: Claim;
    onPress: () => void;
}

const AdminClaimCard = ({
    claim,
    onPress,
}: Props) => {

    return (

        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={onPress}
        >

            <View style={styles.header}>

                <View style={styles.iconContainer}>

                    <Ionicons
                        name="document-text-outline"
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

                    <Text style={styles.time}>
                        {formatRelativeTime(
                            claim.createdAt
                        )}
                    </Text>

                </View>

                <ClaimStatusChip
                    status={claim.status}
                />

            </View>


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


            <View style={styles.footer}>

                <Text style={styles.viewText}>
                    View Details
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

export default AdminClaimCard;


const styles = StyleSheet.create({

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

    header: {

        flexDirection: "row",

        alignItems: "center",

        marginBottom:
            Spacing.md,

    },

    iconContainer: {

        width: 44,

        height: 44,

        borderRadius: 22,

        backgroundColor:
            "#EEF2FF",

        justifyContent: "center",

        alignItems: "center",

        marginRight:
            Spacing.sm,

    },

    headerContent: {

        flex: 1,

        marginRight:
            Spacing.sm,

    },

    itemTitle: {

        fontSize: 16,

        fontFamily:
            Fonts.bold,

        color:
            Colors.text,

    },

    time: {

        marginTop: 3,

        fontSize: 12,

        fontFamily:
            Fonts.regular,

        color:
            Colors.gray500,

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

        fontFamily:
            Fonts.medium,

        color:
            Colors.textSecondary,

    },

    reasonContainer: {

        marginTop:
            Spacing.md,

        padding:
            Spacing.md,

        backgroundColor:
            Colors.background,

        borderRadius:
            Radius.md,

    },

    reasonLabel: {

        fontSize: 11,

        fontFamily:
            Fonts.bold,

        color:
            Colors.gray500,

        textTransform:
            "uppercase",

        marginBottom: 5,

    },

    reason: {

        fontSize: 14,

        lineHeight: 20,

        fontFamily:
            Fonts.regular,

        color:
            Colors.text,

    },

    footer: {

        flexDirection: "row",

        justifyContent:
            "flex-end",

        alignItems: "center",

        marginTop:
            Spacing.md,

    },

    viewText: {

        marginRight: 4,

        color:
            Colors.primary,

        fontSize: 14,

        fontFamily:
            Fonts.semiBold,

    },

});