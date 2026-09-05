import React from "react";

import {
    ScrollView,
    View,
    Text,
    Image,
    StyleSheet,
} from "react-native";

import {
    NativeStackScreenProps,
} from "@react-navigation/native-stack";

import {
    MainStackParamList,
} from "../../navigation/MainNavigator";

import DetailRow from "../../components/item/DetailRow";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import CachedImage from "../../components/common/ChachedImage";

import { PLACEHOLDER_IMAGE } from "../../constants/images";
import { formatRelativeTime } from "../../utils/date";

import { useClaims } from "../../context/ClaimContext";
import useFeedback from "../../hooks/useFeedback";

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

    const {
        showSuccess,
        showError,
        showWarning,
        showInfo,
        showConfirm,
    } = useFeedback();

    const { item } = route.params;


    const { getClaimForItem } =
        useClaims();

    const claim =
        getClaimForItem(item.id);


    let buttonTitle = "Claim This Item";

    let buttonColor = Colors.primary;

    let buttonDisabled = false;

    if (claim?.status === "PENDING") {

        buttonTitle = "Claim Pending";

        buttonColor = "#D97706";

        buttonDisabled = true;

    } else if (
        claim?.status === "APPROVED"
    ) {

        buttonTitle = "Claim Approved";

        buttonColor = Colors.success;

        buttonDisabled = true;

    } else if (
        claim?.status === "REJECTED"
    ) {

        buttonTitle = "Claim Rejected";

        buttonColor = Colors.danger;

        buttonDisabled = true;
    }


    if (item.status === "CLOSED") {

        buttonTitle = "Item Closed";

        buttonColor = Colors.gray500;

        buttonDisabled = true;
    }

    const handleClaimPress = () => {

        if (buttonDisabled) {
            return;
        }

        navigation.navigate(
            "CreateClaim",
            { item }
        );
    };

    return (

        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >

            <CachedImage
                uri={item.imageUrl}
                placeholder={PLACEHOLDER_IMAGE}
                style={styles.image}
            />

            <View style={styles.content}>

                <View style={styles.headerRow}>

                    <View
                        style={[
                            styles.badge,
                            {
                                backgroundColor:
                                    item.status === "ACTIVE"
                                        ? "#DCFCE7"
                                        : "#FEE2E2",
                            },
                        ]}
                    >

                        <Text
                            style={[
                                styles.badgeText,
                                {
                                    color:
                                        item.status === "ACTIVE"
                                            ? Colors.success
                                            : Colors.danger,
                                },
                            ]}
                        >
                            {item.status}
                        </Text>

                    </View>

                    <Text style={styles.time}>
                        {formatRelativeTime(
                            item.createdAt
                        )}
                    </Text>

                </View>

                <Text style={styles.title}>
                    {item.title}
                </Text>

                <Text style={styles.description}>
                    {item.description}
                </Text>

                <View style={styles.section}>

                    <DetailRow
                        icon="location-outline"
                        text={item.location}
                    />

                    <DetailRow
                        icon="calendar-outline"
                        text={item.lostFoundDate}
                    />

                    <DetailRow
                        icon="person-outline"
                        text={item.reportedBy}
                    />

                    <DetailRow
                        icon="pricetag-outline"
                        text={item.category}
                    />

                    <DetailRow
                        icon="checkmark-circle-outline"
                        text={item.status}
                    />

                </View>

                <View
                    style={[
                        styles.claimButtonWrapper,
                        {
                            backgroundColor: buttonColor,
                        },
                    ]}
                >

                    <PrimaryButton
                        title={buttonTitle}
                        onPress={handleClaimPress}
                        disabled={buttonDisabled}
                    />

                </View>

            </View>

        </ScrollView>
    );
};

export default ItemDetailsScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    image: {
        width: "100%",
        height: 280,
    },

    content: {
        padding: Spacing.lg,
    },

    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: Spacing.md,
    },

    badge: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
    },

    badgeText: {
        fontFamily: Fonts.bold,
        fontSize: 12,
    },

    time: {
        color: Colors.gray500,
        fontFamily: Fonts.medium,
    },

    title: {
        fontSize: 28,
        fontFamily: Fonts.bold,
        color: Colors.text,
        marginBottom: Spacing.sm,
    },

    description: {
        color: Colors.textSecondary,
        fontSize: 16,
        lineHeight: 24,
        fontFamily: Fonts.regular,
        marginBottom: Spacing.lg,
    },

    section: {
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        padding: Spacing.lg,
        marginBottom: Spacing.xl,
        ...Shadows.sm,
    },

    claimButtonWrapper: {
        borderRadius: Radius.md,
    },

});