import React from "react";

import {
    StyleSheet,
    Text,
    View,
} from "react-native";

import {
    SafeAreaView,
} from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import {
    Colors,
    Fonts,
    Spacing,
} from "../../theme";


const AdminItemsScreen = () => {

    return (

        <SafeAreaView style={styles.container}>

            <View style={styles.header}>

                <Text style={styles.title}>
                    Items
                </Text>

                <Text style={styles.subtitle}>
                    Manage CampusFound items
                </Text>

            </View>


            <View style={styles.placeholder}>

                <Ionicons
                    name="cube-outline"
                    size={54}
                    color={Colors.gray500}
                />

                <Text style={styles.placeholderTitle}>
                    Item Management
                </Text>

                <Text style={styles.placeholderText}>
                    Item management will be added here.
                </Text>

            </View>

        </SafeAreaView>

    );

};


export default AdminItemsScreen;


const styles = StyleSheet.create({

    container: {

        flex: 1,

        backgroundColor:
            Colors.background,

        padding: Spacing.lg,

    },

    header: {

        marginBottom:
            Spacing.xl,

    },

    title: {

        fontSize: 28,

        fontFamily:
            Fonts.bold,

        color:
            Colors.text,

    },

    subtitle: {

        marginTop: 4,

        fontSize: 14,

        fontFamily:
            Fonts.regular,

        color:
            Colors.textSecondary,

    },

    placeholder: {

        flex: 1,

        justifyContent:
            "center",

        alignItems:
            "center",

    },

    placeholderTitle: {

        marginTop:
            Spacing.md,

        fontSize: 18,

        fontFamily:
            Fonts.semiBold,

        color:
            Colors.text,

    },

    placeholderText: {

        marginTop:
            Spacing.sm,

        fontFamily:
            Fonts.regular,

        color:
            Colors.textSecondary,

    },

});