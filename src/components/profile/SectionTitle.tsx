import React from "react";

import {
    Text,
    StyleSheet,
} from "react-native";

import {
    Colors,
    Fonts,
    Spacing,
} from "../../theme";

interface Props {

    title: string;

}

const SectionTitle = ({
    title,
}: Props) => {

    return (

        <Text style={styles.title}>
            {title}
        </Text>

    );

};

export default SectionTitle;

const styles = StyleSheet.create({

    title: {

        fontSize: 18,

        fontFamily: Fonts.bold,

        color: Colors.text,

        marginBottom: Spacing.md,

        marginTop: Spacing.sm,

    },

});