import React from "react";

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import CachedImage from "../common/ChachedImage";

import { Item } from "../../types/item";

import { PLACEHOLDER_IMAGE } from "../../constants/images";

import { formatRelativeTime } from "../../utils/date";

import {
    Colors,
    Fonts,
    Radius,
    Shadows,
    Spacing,
} from "../../theme";

interface Props {
    item: Item;
    onPress: () => void;
}

const AdminItemCard = ({
    item,
    onPress,
}: Props) => {

    const active =
        item.status === "ACTIVE";

    return (

        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={onPress}
        >

            <CachedImage
                uri={item.imageUrl}
                placeholder={PLACEHOLDER_IMAGE}
                style={styles.image}
            />

            <View style={styles.content}>

                <View style={styles.header}>

                    <View style={styles.titleContainer}>

                        <Text
                            style={styles.title}
                            numberOfLines={1}
                        >
                            {item.title}
                        </Text>

                        <Text style={styles.category}>
                            {item.category}
                        </Text>

                    </View>

                    <View
                        style={[
                            styles.statusChip,
                            {
                                backgroundColor:
                                    active
                                        ? "#DCFCE7"
                                        : "#F3F4F6",
                            },
                        ]}
                    >

                        <Text
                            style={[
                                styles.statusText,
                                {
                                    color:
                                        active
                                            ? Colors.success
                                            : Colors.gray500,
                                },
                            ]}
                        >
                            {item.status}
                        </Text>

                    </View>

                </View>

                <View style={styles.infoRow}>

                    <Ionicons
                        name="location-outline"
                        size={17}
                        color={Colors.gray500}
                    />

                    <Text
                        style={styles.infoText}
                        numberOfLines={1}
                    >
                        {item.location}
                    </Text>

                </View>

                <View style={styles.footer}>

                    <Text style={styles.time}>
                        {formatRelativeTime(
                            item.createdAt
                        )}
                    </Text>

                    <View style={styles.viewRow}>

                        <Text style={styles.viewText}>
                            Manage
                        </Text>

                        <Ionicons
                            name="chevron-forward"
                            size={18}
                            color={Colors.primary}
                        />

                    </View>

                </View>

            </View>

        </TouchableOpacity>

    );
};

export default AdminItemCard;


const styles = StyleSheet.create({

    card: {

        backgroundColor:
            Colors.white,

        borderRadius:
            Radius.lg,

        overflow: "hidden",

        marginBottom:
            Spacing.lg,

        ...Shadows.sm,

    },

    image: {

        width: "100%",

        height: 165,

    },

    content: {

        padding:
            Spacing.md,

    },

    header: {

        flexDirection: "row",

        justifyContent:
            "space-between",

        alignItems:
            "flex-start",

    },

    titleContainer: {

        flex: 1,

        marginRight:
            Spacing.sm,

    },

    title: {

        fontSize: 17,

        fontFamily:
            Fonts.bold,

        color:
            Colors.text,

    },

    category: {

        marginTop: 4,

        fontSize: 13,

        fontFamily:
            Fonts.medium,

        color:
            Colors.textSecondary,

    },

    statusChip: {

        paddingHorizontal: 10,

        paddingVertical: 5,

        borderRadius: 20,

    },

    statusText: {

        fontSize: 11,

        fontFamily:
            Fonts.bold,

    },

    infoRow: {

        marginTop:
            Spacing.sm,

        flexDirection: "row",

        alignItems: "center",

    },

    infoText: {

        marginLeft: 6,

        flex: 1,

        fontSize: 13,

        fontFamily:
            Fonts.regular,

        color:
            Colors.gray500,

    },

    footer: {

        marginTop:
            Spacing.md,

        paddingTop:
            Spacing.sm,

        borderTopWidth: 1,

        borderTopColor:
            Colors.border,

        flexDirection: "row",

        justifyContent:
            "space-between",

        alignItems: "center",

    },

    time: {

        fontSize: 12,

        fontFamily:
            Fonts.regular,

        color:
            Colors.gray500,

    },

    viewRow: {

        flexDirection: "row",

        alignItems: "center",

    },

    viewText: {

        fontSize: 13,

        fontFamily:
            Fonts.semiBold,

        color:
            Colors.primary,

    },

});