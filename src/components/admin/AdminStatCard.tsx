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

interface Props {
    title: string;
    value: number;
    icon: keyof typeof Ionicons.glyphMap;
    onPress?: () => void;
}

const AdminStatCard = ({
    title,
    value,
    icon,
    onPress,
}: Props) => {

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.card}
            onPress={onPress}
            disabled={!onPress}
        >

            <View style={styles.iconContainer}>

                <Ionicons
                    name={icon}
                    size={24}
                    color={Colors.primary}
                />

            </View>

            <Text style={styles.value}>
                {value}
            </Text>

            <Text style={styles.title}>
                {title}
            </Text>

        </TouchableOpacity>
    );
};

export default AdminStatCard;


const styles = StyleSheet.create({

    card: {

        flex: 1,

        backgroundColor: Colors.white,

        borderRadius: Radius.lg,

        padding: Spacing.md,

        minHeight: 130,

        ...Shadows.sm,

    },

    iconContainer: {

        width: 46,
        height: 46,

        borderRadius: 23,

        backgroundColor: "#EFF6FF",

        justifyContent: "center",
        alignItems: "center",

        marginBottom: Spacing.sm,

    },

    value: {

        fontSize: 28,

        fontFamily: Fonts.bold,

        color: Colors.text,

    },

    title: {

        marginTop: 2,

        fontSize: 13,

        fontFamily: Fonts.medium,

        color: Colors.gray500,

    },

});