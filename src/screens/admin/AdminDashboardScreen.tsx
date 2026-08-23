import React, {
    useCallback,
    useState,
} from "react";

import {
    ActivityIndicator,
    Alert,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import {
    TouchableOpacity,
} from "react-native";

import useAuth from "../../hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";

import {
    SafeAreaView,
} from "react-native-safe-area-context";

import {
    useFocusEffect,
    useNavigation,
} from "@react-navigation/native";

import {
    NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import AdminStatCard from "../../components/admin/AdminStatCard";
import PendingClaimCard from "../../components/admin/PendingClaimCard";

import claimService from "../../services/claimService";

import { Claim } from "../../types/claim";

import {
    Colors,
    Fonts,
    Spacing,
} from "../../theme";

import { AdminStackParamList } from "../../navigation/AdminNavigator";

type NavigationProp = NativeStackNavigationProp<AdminStackParamList>;

const AdminDashboardScreen = () => {

    const navigation = useNavigation<NavigationProp>();

    const [pendingClaims, setPendingClaims] =
        useState<Claim[]>([]);

    const [pendingCount, setPendingCount] =
        useState(0);

    const [loading, setLoading] =
        useState(true);

    const [refreshing, setRefreshing] =
        useState(false);

    const { logout } = useAuth();

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


    const loadDashboard = async () => {

        try {

            const response =
                await claimService.getPendingClaims(
                    0,
                    5
                );

            setPendingClaims(
                response.content
            );

            setPendingCount(
                response.totalElements
            );

        } catch (error: any) {

            console.log(
                "Admin Dashboard Error:",
                error.response?.data ||
                error.message
            );

            if (
                error.response?.status !== 401
            ) {

                Alert.alert(
                    "Error",
                    "Failed to load admin dashboard."
                );

            }

        } finally {

            setLoading(false);

            setRefreshing(false);

        }

    };


    useFocusEffect(
        useCallback(() => {

            loadDashboard();

        }, [])
    );


    const handleRefresh = () => {

        setRefreshing(true);

        loadDashboard();

    };


    if (loading) {

        return (

            <SafeAreaView
                style={styles.loadingContainer}
            >

                <ActivityIndicator
                    size="large"
                    color={Colors.primary}
                />

            </SafeAreaView>

        );

    }


    return (

        <SafeAreaView
            style={styles.container}
        >

            <ScrollView

                showsVerticalScrollIndicator={false}

                contentContainerStyle={
                    styles.content
                }

                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[
                            Colors.primary,
                        ]}
                    />
                }

            >

                {/* Header */}

                <View style={styles.header}>

                    <Text style={styles.greeting}>
                        Admin Dashboard
                    </Text>

                    <Text style={styles.subtitle}>
                        Manage CampusFound claims
                    </Text>

                </View>


                {/* Statistics */}

                <View style={styles.statsRow}>

                    <AdminStatCard
                        title="Pending Claims"
                        value={pendingCount}
                        icon="time-outline"
                        onPress={() =>
                            navigation.navigate(
                                "AdminPendingClaims"
                            )
                        }
                    />

                    <View style={styles.gap} />

                    <AdminStatCard
                        title="All Claims"
                        value={0}
                        icon="documents-outline"
                    />

                </View>


                {/* Pending Section */}

                <View style={styles.sectionHeader}>

                    <View>

                        <Text
                            style={styles.sectionTitle}
                        >
                            Pending Claims
                        </Text>

                        <Text
                            style={styles.sectionSubtitle}
                        >
                            Claims waiting for review
                        </Text>

                    </View>

                    <Text
                        style={styles.viewAll}
                        onPress={() =>
                            navigation.navigate(
                                "AdminPendingClaims"
                            )
                        }
                    >
                        View All
                    </Text>

                </View>


                {/* Claims */}

                {pendingClaims.length === 0 ? (

                    <View
                        style={styles.emptyContainer}
                    >

                        <View
                            style={
                                styles.emptyIcon
                            }
                        >

                            <Text
                                style={
                                    styles.emptyIconText
                                }
                            >
                                ✓
                            </Text>

                        </View>

                        <Text
                            style={styles.emptyTitle}
                        >
                            All caught up!
                        </Text>

                        <Text
                            style={
                                styles.emptySubtitle
                            }
                        >
                            There are no pending
                            claims to review.
                        </Text>

                    </View>

                ) : (

                    pendingClaims.map(
                        claim => (

                            <PendingClaimCard
                                key={claim.id}
                                claim={claim}
                                onPress={() =>
                                    navigation.navigate(
                                        "AdminClaimDetails",
                                        {
                                            claimId:
                                                claim.id,
                                        }
                                    )
                                }
                            />

                        )
                    )

                )}

                <TouchableOpacity
                    style={styles.logoutButton}
                    activeOpacity={0.8}
                    onPress={handleLogout}
                >
                    <Ionicons
                        name="log-out-outline"
                        size={21}
                        color={Colors.danger}
                    />

                    <Text style={styles.logoutText}>
                        Logout
                    </Text>
                </TouchableOpacity>

            </ScrollView>

        </SafeAreaView>

    );

};

export default AdminDashboardScreen;


const styles = StyleSheet.create({

    container: {

        flex: 1,

        backgroundColor:
            Colors.background,

    },

    loadingContainer: {

        flex: 1,

        justifyContent: "center",

        alignItems: "center",

        backgroundColor:
            Colors.background,

    },

    content: {

        padding: Spacing.lg,

        paddingBottom: 120,

    },

    header: {

        marginBottom:
            Spacing.lg,

    },

    greeting: {

        fontSize: 27,

        fontFamily: Fonts.bold,

        color: Colors.text,

    },

    subtitle: {

        marginTop: 5,

        fontSize: 14,

        fontFamily: Fonts.regular,

        color:
            Colors.textSecondary,

    },

    statsRow: {

        flexDirection: "row",

        marginBottom:
            Spacing.xl,

    },

    gap: {

        width: Spacing.md,

    },

    sectionHeader: {

        flexDirection: "row",

        justifyContent:
            "space-between",

        alignItems:
            "center",

        marginBottom:
            Spacing.md,

    },

    sectionTitle: {

        fontSize: 20,

        fontFamily: Fonts.bold,

        color: Colors.text,

    },

    sectionSubtitle: {

        marginTop: 3,

        fontSize: 12,

        fontFamily: Fonts.regular,

        color:
            Colors.gray500,

    },

    viewAll: {

        fontSize: 13,

        fontFamily: Fonts.semiBold,

        color: Colors.primary,

    },

    emptyContainer: {

        backgroundColor:
            Colors.white,

        borderRadius: 18,

        padding: Spacing.xl,

        alignItems: "center",

    },

    emptyIcon: {

        width: 58,

        height: 58,

        borderRadius: 29,

        backgroundColor: "#DCFCE7",

        justifyContent:
            "center",

        alignItems:
            "center",

        marginBottom:
            Spacing.md,

    },

    emptyIconText: {

        fontSize: 28,

        color: Colors.success,

        fontFamily: Fonts.bold,

    },

    emptyTitle: {

        fontSize: 17,

        fontFamily: Fonts.bold,

        color: Colors.text,

    },

    emptySubtitle: {

        marginTop: 5,

        fontSize: 13,

        textAlign: "center",

        fontFamily: Fonts.regular,

        color:
            Colors.gray500,

    },

    logoutButton: {
        marginTop: Spacing.xl,
        marginBottom: Spacing.lg,

        height: 52,

        backgroundColor: Colors.white,

        borderRadius: 14,

        borderWidth: 1,
        borderColor: "#FFD7D7",

        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    logoutText: {
        marginLeft: 8,

        fontSize: 15,

        fontFamily: Fonts.semiBold,

        color: Colors.danger,
    },

});