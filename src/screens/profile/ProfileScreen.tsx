import React from "react";

import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileStatCard from "../../components/profile/ProfileStatCard";
import ProfileMenuItem from "../../components/profile/ProfileMenuItem";
import SectionTitle from "../../components/profile/SectionTitle";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/MainNavigator";
import { Alert } from "react-native";
import useAuth from "../../hooks/useAuth";
import { profileMenu } from "../../constants/ProfileMenu";

import {
    Colors,
    Fonts,
    Radius,
    Shadows,
    Spacing,
} from "../../theme";

const ProfileScreen = () => {

    type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

    const navigation = useNavigation<NavigationProp>();

    const { logout } = useAuth();

    const profile = {

        fullName: "Alex Pandiyan",
        email: "alex@student.tce.edu",
        role: "STUDENT" as const,
        lostCount: 12,
        foundCount: 8,
        claimCount: 3,

    };

    const handleMenuPress = (title: string) => {

        switch (title) {

            case "About":
                navigation.navigate("About");
                break;

            default:
                break;
        }

    };

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

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >

                <ProfileHeader
                    fullName={profile.fullName}
                    email={profile.email}
                    role={profile.role}
                />

                <View style={styles.statsRow}>

                    <ProfileStatCard
                        title="Lost"
                        value={profile.lostCount}
                    />

                    <View style={styles.space} />

                    <ProfileStatCard
                        title="Found"
                        value={profile.foundCount}
                    />

                    <View style={styles.space} />

                    <ProfileStatCard
                        title="Claims"
                        value={profile.claimCount}
                    />

                </View>

                <SectionTitle title="Account" />

                {

                    profileMenu.map((item) => (

                        <ProfileMenuItem

                            key={item.id}

                            title={item.title}

                            icon={item.icon}

                            onPress={() => handleMenuPress(item.title)}

                        />

                    ))

                }

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

                <Text style={styles.version}>

                    CampusFound v1.0.0

                </Text>

            </ScrollView>

        </SafeAreaView>

    );

};

export default ProfileScreen;

const styles = StyleSheet.create({

    container: {

        flex: 1,

        backgroundColor: Colors.background,

    },

    content: {

        padding: Spacing.lg,

        paddingBottom: 120,

    },

    statsRow: {

        flexDirection: "row",

        marginBottom: Spacing.lg,

    },

    space: {

        width: 12,

    },

    logoutButton: {

        marginTop: 30,

        backgroundColor: Colors.white,

        borderRadius: Radius.lg,

        paddingVertical: 16,

        flexDirection: "row",

        justifyContent: "center",

        alignItems: "center",

        borderWidth: 1,

        borderColor: "#FFD7D7",

        ...Shadows.sm,

    },

    logoutText: {

        marginLeft: 10,

        fontSize: 16,

        color: Colors.danger,

        fontFamily: Fonts.bold,

    },

    version: {

        marginTop: 28,

        textAlign: "center",

        color: Colors.gray500,

        fontFamily: Fonts.regular,

        fontSize: 13,

    },

});