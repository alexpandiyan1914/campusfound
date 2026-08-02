import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
    Colors,
    Fonts,
    Spacing,
} from "../../theme";

interface Props {
    icon: keyof typeof Ionicons.glyphMap;
    text: string;
}

const DetailRow = ({ icon, text }: Props) => {
    return (
        <View style={styles.container}>

            <Ionicons
                name={icon}
                size={20}
                color={Colors.primary}
            />

            <Text style={styles.text}>
                {text}
            </Text>

        </View>
    );
};

export default DetailRow;

const styles = StyleSheet.create({

    container: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: Spacing.md,
    },

    text: {
        marginLeft: Spacing.md,
        fontSize: 16,
        color: Colors.text,
        fontFamily: Fonts.medium,
        flex: 1,
    },

});