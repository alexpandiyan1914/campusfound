import React, {
    useCallback,
    useState,
} from "react";

import {
    ActivityIndicator,
    Alert,
    FlatList,
    RefreshControl,
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
    AdminStackParamList,
} from "../../navigation/AdminNavigator";

import AdminClaimCard
    from "../../components/admin/AdminClaimCard";

import claimService
    from "../../services/claimService";

import { Claim }
    from "../../types/claim";

import {
    Colors,
    Fonts,
    Radius,
    Spacing,
} from "../../theme";


type NavigationProp =
    NativeStackNavigationProp<
        AdminStackParamList
    >;


type ClaimFilter =
    | "PENDING"
    | "ALL";


const AdminClaimsScreen = () => {

    const navigation =
        useNavigation<NavigationProp>();

    const [claims, setClaims] =
        useState<Claim[]>([]);

    const [selectedFilter, setSelectedFilter] =
        useState<ClaimFilter>("PENDING");

    const [page, setPage] =
        useState(0);

    const [hasMore, setHasMore] =
        useState(true);

    const [loading, setLoading] =
        useState(true);

    const [loadingMore, setLoadingMore] =
        useState(false);

    const [refreshing, setRefreshing] =
        useState(false);


    // ==========================================
    // LOAD CLAIMS
    // ==========================================

    const loadClaims = async (
        pageNumber = 0,
        refresh = false,
        filter = selectedFilter
    ) => {

        try {

            let response;

            if (filter === "PENDING") {

                response =
                    await claimService
                        .getPendingClaims(
                            pageNumber,
                            10
                        );

            } else {

                response =
                    await claimService
                        .getAllClaims(
                            pageNumber,
                            10
                        );

            }


            if (
                refresh ||
                pageNumber === 0
            ) {

                setClaims(
                    response.content
                );

            } else {

                setClaims(prev => {

                    const existingIds =
                        new Set(
                            prev.map(
                                claim =>
                                    claim.id
                            )
                        );

                    const newClaims =
                        response.content.filter(
                            claim =>
                                !existingIds.has(
                                    claim.id
                                )
                        );

                    return [
                        ...prev,
                        ...newClaims,
                    ];

                });

            }


            setPage(pageNumber);

            setHasMore(
                !response.last
            );

        } catch (error: any) {

            console.log(
                "Admin Claims Error:",
                error.response?.data ||
                error.message
            );

            if (
                error.response?.status !== 401
            ) {

                Alert.alert(
                    "Error",
                    "Failed to load claims."
                );

            }

        } finally {

            setLoading(false);

            setLoadingMore(false);

            setRefreshing(false);

        }

    };


    // ==========================================
    // SCREEN FOCUS
    // ==========================================

    useFocusEffect(
        useCallback(() => {

            loadClaims(
                0,
                true,
                selectedFilter
            );

        }, [selectedFilter])
    );


    // ==========================================
    // CHANGE FILTER
    // ==========================================

    const handleFilterChange = (
        filter: ClaimFilter
    ) => {

        if (
            filter === selectedFilter
        ) {
            return;
        }

        setSelectedFilter(filter);

        setClaims([]);

        setPage(0);

        setHasMore(true);

        setLoading(true);

    };


    // ==========================================
    // REFRESH
    // ==========================================

    const handleRefresh = () => {

        setRefreshing(true);

        loadClaims(
            0,
            true,
            selectedFilter
        );

    };


    // ==========================================
    // PAGINATION
    // ==========================================

    const loadMore = () => {

        if (loadingMore) return;

        if (!hasMore) return;

        setLoadingMore(true);

        loadClaims(
            page + 1,
            false,
            selectedFilter
        );

    };


    // ==========================================
    // UI
    // ==========================================

    return (

        <SafeAreaView
            style={styles.container}
        >

            <View style={styles.header}>

                <Text style={styles.title}>
                    Claims
                </Text>

                <Text style={styles.subtitle}>
                    Review and manage student claims
                </Text>

            </View>


            {/* FILTER */}

            <View style={styles.filterContainer}>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                        styles.filterButton,

                        selectedFilter ===
                            "PENDING" &&
                        styles.activeFilter,
                    ]}
                    onPress={() =>
                        handleFilterChange(
                            "PENDING"
                        )
                    }
                >

                    <Text
                        style={[
                            styles.filterText,

                            selectedFilter ===
                                "PENDING" &&
                            styles.activeFilterText,
                        ]}
                    >
                        Pending
                    </Text>

                </TouchableOpacity>


                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                        styles.filterButton,

                        selectedFilter ===
                            "ALL" &&
                        styles.activeFilter,
                    ]}
                    onPress={() =>
                        handleFilterChange(
                            "ALL"
                        )
                    }
                >

                    <Text
                        style={[
                            styles.filterText,

                            selectedFilter ===
                                "ALL" &&
                            styles.activeFilterText,
                        ]}
                    >
                        All Claims
                    </Text>

                </TouchableOpacity>

            </View>


            {/* CONTENT */}

            {loading ? (

                <View
                    style={
                        styles.loadingContainer
                    }
                >

                    <ActivityIndicator
                        size="large"
                        color={Colors.primary}
                    />

                </View>

            ) : (

                <FlatList

                    data={claims}

                    keyExtractor={item =>
                        item.id.toString()
                    }

                    renderItem={({
                        item,
                    }) => (

                        <AdminClaimCard
                            claim={item}
                            onPress={() =>
                                navigation.navigate(
                                    "AdminClaimDetails",
                                    {
                                        claimId:
                                            item.id,
                                    }
                                )
                            }
                        />

                    )}

                    showsVerticalScrollIndicator={
                        false
                    }

                    contentContainerStyle={
                        styles.listContent
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

                    ListEmptyComponent={

                        <View
                            style={
                                styles.emptyContainer
                            }
                        >

                            <Text
                                style={
                                    styles.emptyTitle
                                }
                            >

                                {
                                    selectedFilter ===
                                    "PENDING"
                                        ? "No Pending Claims"
                                        : "No Claims Found"
                                }

                            </Text>

                            <Text
                                style={
                                    styles.emptyText
                                }
                            >

                                {
                                    selectedFilter ===
                                    "PENDING"
                                        ? "There are currently no claims waiting for review."
                                        : "There are currently no claims in CampusFound."
                                }

                            </Text>

                        </View>

                    }

                    ListFooterComponent={

                        loadingMore ? (

                            <View
                                style={
                                    styles.footer
                                }
                            >

                                <ActivityIndicator
                                    size="small"
                                    color={
                                        Colors.primary
                                    }
                                />

                            </View>

                        ) : null

                    }

                    onEndReached={
                        loadMore
                    }

                    onEndReachedThreshold={
                        0.4
                    }

                />

            )}

        </SafeAreaView>

    );

};


export default AdminClaimsScreen;


const styles = StyleSheet.create({

    container: {

        flex: 1,

        backgroundColor:
            Colors.background,

    },

    header: {

        paddingHorizontal:
            Spacing.lg,

        paddingTop:
            Spacing.lg,

        marginBottom:
            Spacing.md,

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

    filterContainer: {

        flexDirection:
            "row",

        marginHorizontal:
            Spacing.lg,

        padding: 4,

        backgroundColor:
            Colors.white,

        borderRadius:
            Radius.lg,

        marginBottom:
            Spacing.md,

    },

    filterButton: {

        flex: 1,

        minHeight: 44,

        borderRadius:
            Radius.md,

        justifyContent:
            "center",

        alignItems:
            "center",

    },

    activeFilter: {

        backgroundColor:
            Colors.primary,

    },

    filterText: {

        fontSize: 14,

        fontFamily:
            Fonts.semiBold,

        color:
            Colors.gray500,

    },

    activeFilterText: {

        color:
            Colors.white,

    },

    loadingContainer: {

        flex: 1,

        justifyContent:
            "center",

        alignItems:
            "center",

    },

    listContent: {

        paddingHorizontal:
            Spacing.lg,

        paddingBottom: 120,

    },

    emptyContainer: {

        paddingVertical: 80,

        alignItems:
            "center",

    },

    emptyTitle: {

        fontSize: 17,

        fontFamily:
            Fonts.bold,

        color:
            Colors.text,

    },

    emptyText: {

        maxWidth: 280,

        marginTop: 6,

        textAlign:
            "center",

        fontSize: 13,

        lineHeight: 20,

        fontFamily:
            Fonts.regular,

        color:
            Colors.gray500,

    },

    footer: {

        paddingVertical: 20,

    },

});