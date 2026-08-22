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

import PendingClaimCard from "../../components/admin/PendingClaimCard";

import claimService from "../../services/claimService";

import { Claim } from "../../types/claim";

import {
    Colors,
    Fonts,
    Spacing,
} from "../../theme";

import {
    MainStackParamList,
} from "../../navigation/MainNavigator";

type NavigationProp =
    NativeStackNavigationProp<MainStackParamList>;

const AdminPendingClaimsScreen = () => {

    const navigation =
        useNavigation<NavigationProp>();

    const [claims, setClaims] =
        useState<Claim[]>([]);

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


    const loadClaims = async (
        pageNumber = 0,
        refresh = false
    ) => {

        try {

            const response =
                await claimService.getPendingClaims(
                    pageNumber,
                    10
                );

            if (
                refresh ||
                pageNumber === 0
            ) {

                setClaims(
                    response.content
                );

            } else {

                setClaims(prev => [
                    ...prev,
                    ...response.content,
                ]);

            }

            setPage(pageNumber);

            setHasMore(
                !response.last
            );

        } catch (error: any) {

            console.log(
                "Pending Claims Error:",
                error.response?.data ||
                error.message
            );

            if (
                error.response?.status !== 401
            ) {

                Alert.alert(
                    "Error",
                    "Failed to load pending claims."
                );

            }

        } finally {

            setLoading(false);

            setLoadingMore(false);

            setRefreshing(false);

        }

    };


    useFocusEffect(
        useCallback(() => {

            loadClaims(0, true);

        }, [])
    );


    const handleRefresh = () => {

        setRefreshing(true);

        loadClaims(0, true);

    };


    const loadMore = () => {

        if (loadingMore) return;

        if (!hasMore) return;

        setLoadingMore(true);

        loadClaims(page + 1);

    };


    if (loading) {

        return (

            <SafeAreaView
                style={
                    styles.loadingContainer
                }
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

            <FlatList

                data={claims}

                keyExtractor={item =>
                    item.id.toString()
                }

                showsVerticalScrollIndicator={
                    false
                }

                contentContainerStyle={
                    styles.content
                }

                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={
                            handleRefresh
                        }
                        colors={[
                            Colors.primary,
                        ]}
                    />
                }

                ListHeaderComponent={

                    <View
                        style={
                            styles.header
                        }
                    >

                        <Text
                            style={
                                styles.title
                            }
                        >
                            Pending Claims
                        </Text>

                        <Text
                            style={
                                styles.subtitle
                            }
                        >
                            Review student claims
                            before approving or
                            rejecting them.
                        </Text>

                    </View>

                }

                renderItem={({
                    item,
                }) => (

                    <PendingClaimCard

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

                ListEmptyComponent={

                    <View
                        style={
                            styles.empty
                        }
                    >

                        <Text
                            style={
                                styles.emptyTitle
                            }
                        >
                            No Pending Claims
                        </Text>

                        <Text
                            style={
                                styles.emptyText
                            }
                        >
                            There are currently
                            no claims waiting
                            for review.
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
                    0.5
                }

            />

        </SafeAreaView>

    );

};

export default AdminPendingClaimsScreen;


const styles = StyleSheet.create({

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

        padding: Spacing.lg,

        paddingBottom: 120,

    },

    header: {

        marginBottom:
            Spacing.lg,

    },

    title: {

        fontSize: 27,

        fontFamily:
            Fonts.bold,

        color:
            Colors.text,

    },

    subtitle: {

        marginTop: 5,

        fontSize: 14,

        lineHeight: 20,

        fontFamily:
            Fonts.regular,

        color:
            Colors.textSecondary,

    },

    empty: {

        backgroundColor:
            Colors.white,

        borderRadius: 18,

        padding: Spacing.xl,

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

        marginTop: 6,

        fontSize: 13,

        textAlign:
            "center",

        fontFamily:
            Fonts.regular,

        color:
            Colors.gray500,

    },

    footer: {

        paddingVertical: 20,

    },

});