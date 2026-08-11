import React, {
    useCallback,
    useState,
} from "react";

import {
    ScrollView,
    View,
    Text,
    Image,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from "react-native";

import {
    NativeStackScreenProps,
} from "@react-navigation/native-stack";

import {
    useFocusEffect,
} from "@react-navigation/native";

import { MainStackParamList } from "../../navigation/MainNavigator";

import DetailRow from "../../components/item/DetailRow";
import PrimaryButton from "../../components/buttons/PrimaryButton";

import { PLACEHOLDER_IMAGE } from "../../constants/images";
import { formatRelativeTime } from "../../utils/date";

import claimService from "../../services/claimService";
import { ClaimStatus } from "../../types/claim";

import {
    Colors,
    Fonts,
    Radius,
    Shadows,
    Spacing,
} from "../../theme";


type Props = NativeStackScreenProps<
    MainStackParamList,
    "ItemDetails"
>;


const ItemDetailsScreen = ({
    route,
    navigation,
}: Props) => {

    const { item } = route.params;

    const [claimStatus, setClaimStatus] =
        useState<ClaimStatus | null>(null);

    const [checkingClaim, setCheckingClaim] =
        useState(true);

    const checkExistingClaim = async () => {

        try {

            setCheckingClaim(true);

            const response =
                await claimService.getMyClaims(0, 100);

            const existingClaim =
                response.content.find(
                    claim =>
                        claim.itemId === item.id
                );

            if (existingClaim) {

                setClaimStatus(
                    existingClaim.status
                );

            } else {

                setClaimStatus(null);

            }

        } catch (error: any) {

            console.log(
                "Check Claim Error:",
                error.response?.data ||
                error.message
            );

            setClaimStatus(null);

        } finally {

            setCheckingClaim(false);

        }

    };

    useFocusEffect(
        useCallback(() => {

            checkExistingClaim();

        }, [item.id])
    );


    const getClaimButton = () => {

        if (item.status === "CLOSED") {

            return {
                title: "Item Closed",
                backgroundColor: Colors.gray500,
                disabled: true,
            };

        }


        if (claimStatus === "PENDING") {

            return {
                title: "Your Claim • Pending",
                backgroundColor: "#F59E0B",
                disabled: true,
            };

        }


        if (claimStatus === "APPROVED") {

            return {
                title: "Your Claim • Approved",
                backgroundColor: Colors.success,
                disabled: true,
            };

        }


        if (claimStatus === "REJECTED") {

            return {
                title: "Your Claim • Rejected",
                backgroundColor: Colors.danger,
                disabled: true,
            };

        }


        return {
            title: "Claim This Item",
            backgroundColor: Colors.primary,
            disabled: false,
        };

    };


    const claimButton = getClaimButton();


    const handleClaimPress = () => {

        if (claimStatus) {

            Alert.alert(
                "Claim Already Submitted",
                "You have already submitted a claim for this item."
            );

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

            <Image
                source={{
                    uri:
                        item.imageUrl ||
                        PLACEHOLDER_IMAGE,
                }}
                style={styles.image}
            />


            <View style={styles.content}>

                {/* STATUS + TIME */}

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


                {/* TITLE */}

                <Text style={styles.title}>
                    {item.title}
                </Text>


                {/* DESCRIPTION */}

                <Text style={styles.description}>
                    {item.description}
                </Text>


                {/* DETAILS */}

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


                {/* CLAIM BUTTON */}

                {checkingClaim ? (

                    <View style={styles.checkingContainer}>

                        <ActivityIndicator
                            size="small"
                            color={Colors.primary}
                        />

                        <Text style={styles.checkingText}>
                            Checking claim status...
                        </Text>

                    </View>

                ) : (

                    <View
                        style={[
                            styles.claimButtonWrapper,
                            {
                                opacity:
                                    claimButton.disabled
                                        ? 0.75
                                        : 1,
                            },
                        ]}
                    >

                        <PrimaryButton
                            title={claimButton.title}
                            onPress={handleClaimPress}
                            disabled={claimButton.disabled}
                            backgroundColor={claimButton.backgroundColor}
                        />

                    </View>

                )}

            </View>

        </ScrollView>

    );

};


export default ItemDetailsScreen;


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor:
            Colors.background,
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

        justifyContent:
            "space-between",

        alignItems: "center",

        marginBottom:
            Spacing.md,
    },

    badge: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
    },

    badgeText: {

        fontFamily:
            Fonts.bold,

        fontSize: 12,
    },

    time: {
        color:
            Colors.gray500,

        fontFamily:
            Fonts.medium,
    },

    title: {
        fontSize: 28,

        fontFamily:
            Fonts.bold,

        color:
            Colors.text,

        marginBottom:
            Spacing.sm,
    },

    description: {
        color:
            Colors.textSecondary,

        fontSize: 16,
        lineHeight: 24,

        fontFamily:
            Fonts.regular,

        marginBottom:
            Spacing.lg,
    },

    section: {
        backgroundColor:
            Colors.white,

        borderRadius:
            Radius.lg,

        padding:
            Spacing.lg,

        marginBottom:
            Spacing.xl,

        ...Shadows.sm,
    },

    checkingContainer: {
        height: 56,
        borderRadius:
            Radius.md,
        backgroundColor:
            Colors.white,
        justifyContent:
            "center",
        alignItems:
            "center",
        flexDirection:
            "row",
        gap: 10,
    },

    checkingText: {
        fontFamily:
            Fonts.medium,
        fontSize: 14,
        color:
            Colors.gray500,
    },

    claimButtonWrapper: {
        borderRadius:
            Radius.md,

        overflow: "hidden",
    },
});