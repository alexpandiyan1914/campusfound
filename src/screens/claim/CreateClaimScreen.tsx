import React, { useState } from "react";

import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import {
    NativeStackScreenProps,
} from "@react-navigation/native-stack";

import {
    MainStackParamList,
} from "../../navigation/MainNavigator";

import PrimaryButton from "../../components/buttons/PrimaryButton";

import claimService from "../../services/claimService";

import useFeedback from "../../hooks/useFeedback";

import {
    Colors,
    Fonts,
    Radius,
    Shadows,
    Spacing,
} from "../../theme";

type Props = NativeStackScreenProps<
    MainStackParamList,
    "CreateClaim"
>;

const CreateClaimScreen = ({ route, navigation }: Props) => {

    const {
        showSuccess,
        showError,
        showWarning,
        showInfo,
        showConfirm,
    } = useFeedback();

    const { item } = route.params;

    const [reason, setReason] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {

        const trimmedReason = reason.trim();

        if (!trimmedReason) {

            showWarning(
                "Reason Required",
                "Please explain why you believe this item belongs to you."
            );

            return;
        }

        if (trimmedReason.length < 10) {

            showWarning(
                "Reason Too Short",
                "Please provide a little more information about your claim."
            );

            return;
        }

        try {

            setLoading(true);

            console.log(
                "Creating claim for item:",
                item.id
            );

            const claim = await claimService.createClaim({
                itemId: item.id,
                reason: trimmedReason,
            });

            console.log(
                "Claim created:",
                claim
            );

            showSuccess(
                "Claim Submitted",
                "Your claim has been submitted successfully and is waiting for admin review."
            );

            navigation.goBack();

        } catch (error: any) {

            console.log(
                "===== CREATE CLAIM ERROR ====="
            );

            console.log(error);

            console.log(
                "Status:",
                error.response?.status
            );

            console.log(
                "Data:",
                error.response?.data
            );

            const message =
                error.response?.data?.message ||
                "Unable to submit your claim. Please try again.";

            showError(
                "Claim Failed",
                message
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <KeyboardAvoidingView
            style={styles.container}
            behavior={
                Platform.OS === "ios"
                    ? "padding"
                    : undefined
            }
        >

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
            >

                <Text style={styles.heading}>
                    Claim This Item
                </Text>

                <Text style={styles.subtitle}>
                    Tell us why you believe this item belongs to you.
                </Text>

                <View style={styles.itemCard}>

                    <Text style={styles.itemLabel}>
                        Item
                    </Text>

                    <Text style={styles.itemTitle}>
                        {item.title}
                    </Text>

                    <Text style={styles.itemCategory}>
                        {item.category}
                    </Text>

                    <Text style={styles.itemLocation}>
                        {item.location}
                    </Text>

                </View>

                <View style={styles.formSection}>

                    <Text style={styles.label}>
                        Why is this your item?
                    </Text>

                    <TextInput
                        value={reason}
                        onChangeText={setReason}
                        placeholder="Explain details that can help the admin verify your claim..."
                        placeholderTextColor={Colors.gray400}
                        multiline
                        textAlignVertical="top"
                        maxLength={500}
                        style={styles.input}
                    />

                    <Text style={styles.counter}>
                        {reason.length}/500
                    </Text>

                </View>

                <PrimaryButton
                    title="Submit Claim"
                    loading={loading}
                    disabled={loading}
                    onPress={handleSubmit}
                />

                <Text style={styles.note}>
                    Your claim will be reviewed by a CampusFound administrator.
                </Text>

            </ScrollView>

        </KeyboardAvoidingView>

    );

};

export default CreateClaimScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    content: {
        padding: Spacing.lg,
        paddingBottom: 50,
    },

    heading: {
        fontSize: 28,
        fontFamily: Fonts.bold,
        color: Colors.text,
        marginBottom: Spacing.sm,
    },

    subtitle: {
        fontSize: 15,
        lineHeight: 22,
        fontFamily: Fonts.regular,
        color: Colors.textSecondary,
        marginBottom: Spacing.lg,
    },

    itemCard: {
        backgroundColor: Colors.white,

        borderRadius: Radius.lg,

        padding: Spacing.lg,

        marginBottom: Spacing.xl,

        ...Shadows.sm,
    },

    itemLabel: {
        fontSize: 12,
        fontFamily: Fonts.medium,
        color: Colors.gray500,
        marginBottom: 6,
    },

    itemTitle: {
        fontSize: 20,
        fontFamily: Fonts.bold,
        color: Colors.text,
        marginBottom: 6,
    },

    itemCategory: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: Colors.primary,
        marginBottom: 4,
    },

    itemLocation: {
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: Colors.textSecondary,
    },

    formSection: {
        marginBottom: Spacing.xl,
    },

    label: {
        fontSize: 16,
        fontFamily: Fonts.semiBold,
        color: Colors.text,
        marginBottom: Spacing.sm,
    },

    input: {
        minHeight: 170,

        backgroundColor: Colors.white,

        borderWidth: 1,
        borderColor: Colors.border,

        borderRadius: Radius.lg,

        padding: Spacing.md,

        fontSize: 15,

        fontFamily: Fonts.regular,

        color: Colors.text,

        ...Shadows.sm,
    },

    counter: {
        textAlign: "right",

        marginTop: 6,

        fontSize: 12,

        color: Colors.gray500,

        fontFamily: Fonts.regular,
    },

    note: {
        textAlign: "center",

        marginTop: Spacing.lg,

        fontSize: 13,

        lineHeight: 20,

        color: Colors.gray500,

        fontFamily: Fonts.regular,
    },

});