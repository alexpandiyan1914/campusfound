import React from "react";

import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import {
    SafeAreaView,
} from "react-native-safe-area-context";

import {
    Ionicons,
} from "@expo/vector-icons";

import useAuth
    from "../../hooks/useAuth";

import {
    Colors,
    Fonts,
    Radius,
    Shadows,
    Spacing,
} from "../../theme";


const AdminProfileScreen = () => {

    const { logout } =
        useAuth();


    const handleLogout = () => {

        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },

                {
                    text: "Logout",
                    style: "destructive",

                    onPress: async () => {

                        await logout();

                    },
                },
            ]
        );

    };


    return (

        <SafeAreaView style={styles.container}>

            <View style={styles.header}>

                <Text style={styles.title}>
                    Admin Profile
                </Text>

                <Text style={styles.subtitle}>
                    CampusFound administration
                </Text>

            </View>


            <View style={styles.profileCard}>

                <View style={styles.avatar}>

                    <Ionicons
                        name="shield-checkmark"
                        size={38}
                        color={Colors.primary}
                    />

                </View>

                <Text style={styles.role}>
                    ADMIN
                </Text>

                <Text style={styles.description}>
                    CampusFound Administrator
                </Text>

            </View>


            <TouchableOpacity

                style={styles.logoutButton}

                activeOpacity={0.8}

                onPress={handleLogout}

            >

                <Ionicons
                    name="log-out-outline"
                    size={22}
                    color={Colors.danger}
                />

                <Text style={styles.logoutText}>
                    Logout
                </Text>

            </TouchableOpacity>

        </SafeAreaView>

    );

};


export default AdminProfileScreen;


const styles = StyleSheet.create({

    container: {

        flex: 1,

        padding:
            Spacing.lg,

        backgroundColor:
            Colors.background,

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

        fontFamily:
            Fonts.regular,

        color:
            Colors.textSecondary,

    },

    profileCard: {

        backgroundColor:
            Colors.white,

        borderRadius:
            Radius.lg,

        padding:
            Spacing.xl,

        alignItems:
            "center",

        ...Shadows.sm,

    },

    avatar: {

        width: 76,

        height: 76,

        borderRadius: 38,

        backgroundColor:
            "#EEF2FF",

        justifyContent:
            "center",

        alignItems:
            "center",

        marginBottom:
            Spacing.md,

    },

    role: {

        fontSize: 18,

        fontFamily:
            Fonts.bold,

        color:
            Colors.primary,

    },

    description: {

        marginTop: 5,

        fontSize: 14,

        fontFamily:
            Fonts.regular,

        color:
            Colors.textSecondary,

    },

    logoutButton: {

        marginTop:
            Spacing.xl,

        height: 54,

        backgroundColor:
            Colors.white,

        borderRadius:
            Radius.lg,

        borderWidth: 1,

        borderColor:
            "#FFD7D7",

        flexDirection:
            "row",

        justifyContent:
            "center",

        alignItems:
            "center",

    },

    logoutText: {

        marginLeft: 8,

        fontSize: 15,

        fontFamily:
            Fonts.semiBold,

        color:
            Colors.danger,

    },

});