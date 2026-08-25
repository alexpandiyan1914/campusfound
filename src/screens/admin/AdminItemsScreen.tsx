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

import React, {
    useCallback,
    useState,
} from "react";

import {
    ActivityIndicator,
    Alert,
    FlatList,
    RefreshControl,
    TouchableOpacity,
} from "react-native";

import {
    useFocusEffect,
    useNavigation,
} from "@react-navigation/native";

import {
    NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import AdminItemCard
    from "../../components/admin/AdminItemCard";

import itemService
    from "../../services/itemService";

import { Item }
    from "../../types/item";

import {
    AdminStackParamList,
} from "../../navigation/AdminNavigator";


type NavigationProp = NativeStackNavigationProp<AdminStackParamList>;

const AdminItemsScreen = () => {

    const navigation = useNavigation<NavigationProp>();

    const [items, setItems] = useState<Item[]>([]);

    const [page, setPage] = useState(0);

    const [hasMore, setHasMore] = useState(true);

    const [loading, setLoading] = useState(true);

    const [loadingMore, setLoadingMore] = useState(false);

    const [refreshing, setRefreshing] = useState(false);


    const loadItems = async (
        pageNumber = 0,
        refresh = false
    ) => {

        try {

            const response =
                await itemService.getItems(
                    pageNumber,
                    10
                );

            if (
                refresh ||
                pageNumber === 0
            ) {

                setItems(
                    response.content
                );

            } else {

                setItems(prev => {

                    const ids =
                        new Set(
                            prev.map(
                                item =>
                                    item.id
                            )
                        );

                    const newItems =
                        response.content.filter(
                            item =>
                                !ids.has(
                                    item.id
                                )
                        );

                    return [
                        ...prev,
                        ...newItems,
                    ];

                });

            }

            setPage(pageNumber);

            setHasMore(
                !response.last
            );

        } catch (error: any) {

            Alert.alert(
                "Error",
                "Failed to load items."
            );

        } finally {

            setLoading(false);

            setLoadingMore(false);

            setRefreshing(false);

        }

    };

    useFocusEffect(
        useCallback(() => {

            loadItems(0, true);

        }, [])
    );

    const loadMore = () => {

        if (loadingMore) return;

        if (!hasMore) return;

        setLoadingMore(true);

        loadItems(
            page + 1
        );

    };

    return (

        <SafeAreaView style={styles.container}>

            <View style={styles.header}>

                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate(
                            "AdminCreateItem"
                        )
                    }
                >
                    <Ionicons
                        name="add-circle"
                        size={40}
                        color={Colors.primary}
                    />
                </TouchableOpacity>

                <Text style={styles.title}>
                    Items
                </Text>
                

                <Text style={styles.subtitle}>
                    Manage CampusFound items
                </Text>

            </View>


            <FlatList

                data={items}

                keyExtractor={item =>
                    item.id.toString()
                }

                renderItem={({ item }) => (

                    <AdminItemCard

                        item={item}

                        onPress={() =>
                            navigation.navigate(
                                "AdminItemDetails",
                                { item }
                            )
                        }

                    />

                )}

                refreshControl={

                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {

                            setRefreshing(true);

                            loadItems(
                                0,
                                true
                            );

                        }}
                        colors={[
                            Colors.primary,
                        ]}
                    />

                }

                onEndReached={
                    loadMore
                }

                onEndReachedThreshold={
                    0.4
                }

            />

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