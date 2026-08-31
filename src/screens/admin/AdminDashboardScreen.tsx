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
    TouchableOpacity,
    View,
} from "react-native";

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

import {
    Ionicons,
} from "@expo/vector-icons";

import PendingClaimCard
    from "../../components/admin/PendingClaimCard";

import claimService
    from "../../services/claimService";

import {
    Claim,
} from "../../types/claim";

import {
    Colors,
    Fonts,
    Radius,
    Shadows,
    Spacing,
} from "../../theme";

import {
    AdminStackParamList,
} from "../../navigation/AdminNavigator";


type NavigationProp =
    NativeStackNavigationProp<
        AdminStackParamList
    >;


const AdminDashboardScreen = () => {

    const navigation =
        useNavigation<NavigationProp>();


    const [
        pendingClaims,
        setPendingClaims,
    ] = useState<Claim[]>([]);


    const [
        pendingCount,
        setPendingCount,
    ] = useState(0);


    const [
        loading,
        setLoading,
    ] = useState(true);


    const [
        refreshing,
        setRefreshing,
    ] = useState(false);


    // ==========================================
    // LOAD DASHBOARD
    // ==========================================

    const loadDashboard =
        async () => {

            try {

                const response =
                    await claimService
                        .getPendingClaims(
                            0,
                            5
                        );


                // Newest claim first
                const sortedClaims = [
                    ...response.content,
                ].sort(
                    (a, b) =>
                        new Date(
                            b.createdAt
                        ).getTime() -
                        new Date(
                            a.createdAt
                        ).getTime()
                );


                setPendingClaims(
                    sortedClaims
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
                    error.response?.status
                    !== 401
                ) {

                    Alert.alert(
                        "Error",
                        "Unable to load the admin dashboard."
                    );

                }

            } finally {

                setLoading(false);

                setRefreshing(false);

            }

        };


    // Refresh when dashboard gains focus
    useFocusEffect(

        useCallback(() => {

            loadDashboard();

        }, [])

    );


    const handleRefresh = () => {

        setRefreshing(true);

        loadDashboard();

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <SafeAreaView
                style={
                    styles.loadingContainer
                }
            >

                <ActivityIndicator
                    size="large"
                    color={
                        Colors.primary
                    }
                />

            </SafeAreaView>

        );

    }


    // ==========================================
    // UI
    // ==========================================

    return (

        <SafeAreaView
            style={styles.container}
        >

            <ScrollView

                showsVerticalScrollIndicator={
                    false
                }

                contentContainerStyle={
                    styles.content
                }

                refreshControl={

                    <RefreshControl
                        refreshing={
                            refreshing
                        }
                        onRefresh={
                            handleRefresh
                        }
                        colors={[
                            Colors.primary,
                        ]}
                    />

                }

            >

                {/* HEADER */}

                <View
                    style={
                        styles.header
                    }
                >

                    <View>

                        <Text
                            style={
                                styles.greeting
                            }
                        >
                            Admin Dashboard
                        </Text>

                        <Text
                            style={
                                styles.subtitle
                            }
                        >
                            Manage items and review claims
                        </Text>

                    </View>


                    <View
                        style={
                            styles.adminBadge
                        }
                    >

                        <Ionicons
                            name="shield-checkmark"
                            size={15}
                            color={
                                Colors.primary
                            }
                        />

                        <Text
                            style={
                                styles.adminBadgeText
                            }
                        >
                            Admin
                        </Text>

                    </View>

                </View>


                {/* POST NEW ITEM */}

                <TouchableOpacity

                    activeOpacity={0.85}

                    style={
                        styles.createItemCard
                    }

                    onPress={() =>
                        navigation.navigate(
                            "AdminCreateItem"
                        )
                    }

                >

                    <View
                        style={
                            styles.createIconContainer
                        }
                    >

                        <Ionicons
                            name="camera-outline"
                            size={27}
                            color={
                                Colors.white
                            }
                        />

                    </View>


                    <View
                        style={
                            styles.createTextContainer
                        }
                    >

                        <Text
                            style={
                                styles.createTitle
                            }
                        >
                            Post New Item
                        </Text>

                        <Text
                            style={
                                styles.createSubtitle
                            }
                        >
                            Add a newly found item to CampusFound
                        </Text>

                    </View>


                    <Ionicons
                        name="chevron-forward"
                        size={22}
                        color={
                            Colors.white
                        }
                    />

                </TouchableOpacity>


                {/* PENDING SUMMARY */}

                <TouchableOpacity

                    activeOpacity={0.85}

                    style={
                        styles.pendingSummary
                    }

                    onPress={() =>
                        navigation.navigate(
                            "AdminPendingClaims"
                        )
                    }

                >

                    <View
                        style={
                            styles.pendingIcon
                        }
                    >

                        <Ionicons
                            name="time-outline"
                            size={24}
                            color={
                                "#D97706"
                            }
                        />

                    </View>


                    <View
                        style={
                            styles.pendingContent
                        }
                    >

                        <Text
                            style={
                                styles.pendingNumber
                            }
                        >
                            {pendingCount}
                        </Text>

                        <Text
                            style={
                                styles.pendingLabel
                            }
                        >
                            Pending Claims
                        </Text>

                        <Text
                            style={
                                styles.pendingDescription
                            }
                        >
                            Require your attention
                        </Text>

                    </View>


                    <Ionicons
                        name="chevron-forward"
                        size={21}
                        color={
                            Colors.gray500
                        }
                    />

                </TouchableOpacity>


                {/* RECENT CLAIMS HEADER */}

                <View
                    style={
                        styles.sectionHeader
                    }
                >

                    <View>

                        <Text
                            style={
                                styles.sectionTitle
                            }
                        >
                            Recent Claims
                        </Text>

                        <Text
                            style={
                                styles.sectionSubtitle
                            }
                        >
                            Latest pending claims first
                        </Text>

                    </View>


                    {pendingCount > 0 && (

                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate(
                                    "AdminPendingClaims"
                                )
                            }
                        >

                            <Text
                                style={
                                    styles.viewAll
                                }
                            >
                                View All
                            </Text>

                        </TouchableOpacity>

                    )}

                </View>


                {/* RECENT CLAIMS */}

                {pendingClaims.length === 0 ? (

                    <View
                        style={
                            styles.emptyContainer
                        }
                    >

                        <View
                            style={
                                styles.emptyIcon
                            }
                        >

                            <Ionicons
                                name="checkmark"
                                size={30}
                                color={
                                    Colors.success
                                }
                            />

                        </View>


                        <Text
                            style={
                                styles.emptyTitle
                            }
                        >
                            All caught up!
                        </Text>


                        <Text
                            style={
                                styles.emptySubtitle
                            }
                        >
                            There are no pending claims to review.
                        </Text>

                    </View>

                ) : (

                    pendingClaims.map(
                        claim => (

                            <PendingClaimCard

                                key={
                                    claim.id
                                }

                                claim={
                                    claim
                                }

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

            </ScrollView>

        </SafeAreaView>

    );

};


export default AdminDashboardScreen;


const styles =
    StyleSheet.create({

        container: {

            flex: 1,

            backgroundColor:
                Colors.background,

        },


        loadingContainer: {

            flex: 1,

            justifyContent:
                "center",

            alignItems:
                "center",

            backgroundColor:
                Colors.background,

        },


        content: {

            padding:
                Spacing.lg,

            paddingBottom:
                120,

        },


        // ======================================
        // HEADER
        // ======================================

        header: {

            flexDirection:
                "row",

            justifyContent:
                "space-between",

            alignItems:
                "center",

            marginBottom:
                Spacing.lg,

        },


        greeting: {

            fontSize: 26,

            fontFamily:
                Fonts.bold,

            color:
                Colors.text,

        },


        subtitle: {

            marginTop: 4,

            fontSize: 13,

            fontFamily:
                Fonts.regular,

            color:
                Colors.textSecondary,

        },


        adminBadge: {

            flexDirection:
                "row",

            alignItems:
                "center",

            backgroundColor:
                "#EFF6FF",

            paddingHorizontal:
                10,

            paddingVertical:
                7,

            borderRadius:
                20,

        },


        adminBadgeText: {

            marginLeft: 5,

            fontSize: 12,

            fontFamily:
                Fonts.semiBold,

            color:
                Colors.primary,

        },


        // ======================================
        // POST ITEM
        // ======================================

        createItemCard: {

            flexDirection:
                "row",

            alignItems:
                "center",

            padding:
                Spacing.lg,

            backgroundColor:
                Colors.primary,

            borderRadius:
                Radius.lg,

            marginBottom:
                Spacing.lg,

            ...Shadows.sm,

        },


        createIconContainer: {

            width: 48,

            height: 48,

            borderRadius: 14,

            alignItems:
                "center",

            justifyContent:
                "center",

            backgroundColor:
                "rgba(255,255,255,0.18)",

        },


        createTextContainer: {

            flex: 1,

            marginLeft:
                Spacing.md,

        },


        createTitle: {

            fontSize: 17,

            fontFamily:
                Fonts.bold,

            color:
                Colors.white,

        },


        createSubtitle: {

            marginTop: 3,

            fontSize: 11,

            lineHeight: 16,

            fontFamily:
                Fonts.regular,

            color:
                "rgba(255,255,255,0.82)",

        },


        // ======================================
        // PENDING SUMMARY
        // ======================================

        pendingSummary: {

            flexDirection:
                "row",

            alignItems:
                "center",

            padding:
                Spacing.lg,

            backgroundColor:
                Colors.white,

            borderRadius:
                Radius.lg,

            marginBottom:
                Spacing.xl,

            ...Shadows.sm,

        },


        pendingIcon: {

            width: 48,

            height: 48,

            borderRadius: 14,

            alignItems:
                "center",

            justifyContent:
                "center",

            backgroundColor:
                "#FEF3C7",

        },


        pendingContent: {

            flex: 1,

            marginLeft:
                Spacing.md,

        },


        pendingNumber: {

            fontSize: 24,

            fontFamily:
                Fonts.bold,

            color:
                Colors.text,

        },


        pendingLabel: {

            marginTop: 1,

            fontSize: 14,

            fontFamily:
                Fonts.semiBold,

            color:
                Colors.text,

        },


        pendingDescription: {

            marginTop: 2,

            fontSize: 11,

            fontFamily:
                Fonts.regular,

            color:
                Colors.gray500,

        },


        // ======================================
        // RECENT CLAIMS
        // ======================================

        sectionHeader: {

            flexDirection:
                "row",

            justifyContent:
                "space-between",

            alignItems:
                "center",

            marginBottom:
                Spacing.md,

        },


        sectionTitle: {

            fontSize: 20,

            fontFamily:
                Fonts.bold,

            color:
                Colors.text,

        },


        sectionSubtitle: {

            marginTop: 3,

            fontSize: 12,

            fontFamily:
                Fonts.regular,

            color:
                Colors.gray500,

        },


        viewAll: {

            fontSize: 13,

            fontFamily:
                Fonts.semiBold,

            color:
                Colors.primary,

        },


        // ======================================
        // EMPTY STATE
        // ======================================

        emptyContainer: {

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


        emptyIcon: {

            width: 58,

            height: 58,

            borderRadius: 29,

            backgroundColor:
                "#DCFCE7",

            justifyContent:
                "center",

            alignItems:
                "center",

            marginBottom:
                Spacing.md,

        },


        emptyTitle: {

            fontSize: 17,

            fontFamily:
                Fonts.bold,

            color:
                Colors.text,

        },


        emptySubtitle: {

            marginTop: 5,

            fontSize: 13,

            textAlign:
                "center",

            fontFamily:
                Fonts.regular,

            color:
                Colors.gray500,

        },

    });