import React from "react";

import {
    Alert,
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
    NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { Ionicons }
    from "@expo/vector-icons";

import {
    AdminStackParamList,
} from "../../navigation/AdminNavigator";

import CachedImage
    from "../../components/common/ChachedImage";

import DetailRow
    from "../../components/item/DetailRow";

import itemService
    from "../../services/itemService";

import { PLACEHOLDER_IMAGE }
    from "../../constants/images";

import {
    Colors,
    Fonts,
    Radius,
    Shadows,
    Spacing,
} from "../../theme";


type Props =
    NativeStackScreenProps<
        AdminStackParamList,
        "AdminItemDetails"
    >;


const AdminItemDetailsScreen = ({
    route,
    navigation,
}: Props) => {

    const { item } =
        route.params;


    const handleDelete = () => {

        Alert.alert(
            "Delete Item",
            `Are you sure you want to delete "${item.title}"?`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },

                {
                    text: "Delete",
                    style: "destructive",

                    onPress:
                        confirmDelete,
                },
            ]
        );

    };


    const confirmDelete =
        async () => {

            try {

                await itemService
                    .deleteItem(
                        item.id
                    );

                Alert.alert(
                    "Item Deleted",
                    "The item has been deleted successfully.",
                    [
                        {
                            text: "OK",

                            onPress: () =>
                                navigation.goBack(),
                        },
                    ]
                );

            } catch (error: any) {

                console.log(
                    "Delete Item Error:",
                    error.response?.data ||
                    error.message
                );

                Alert.alert(
                    "Delete Failed",
                    error.response?.data?.message ||
                    "Unable to delete this item."
                );

            }

        };


    return (

        <SafeAreaView
            style={styles.container}
        >

            <ScrollView
                showsVerticalScrollIndicator={
                    false
                }
            >

                <CachedImage
                    uri={
                        item.imageUrl
                    }
                    placeholder={
                        PLACEHOLDER_IMAGE
                    }
                    style={
                        styles.image
                    }
                />


                <View style={styles.content}>

                    <View style={styles.header}>

                        <Text
                            style={styles.title}
                        >
                            {item.title}
                        </Text>

                        <View
                            style={[
                                styles.status,

                                {
                                    backgroundColor:
                                        item.status ===
                                        "ACTIVE"
                                            ? "#DCFCE7"
                                            : "#F3F4F6",
                                },
                            ]}
                        >

                            <Text
                                style={[
                                    styles.statusText,

                                    {
                                        color:
                                            item.status ===
                                            "ACTIVE"
                                                ? Colors.success
                                                : Colors.gray500,
                                    },
                                ]}
                            >
                                {item.status}
                            </Text>

                        </View>

                    </View>


                    <Text
                        style={styles.description}
                    >
                        {item.description}
                    </Text>


                    <View style={styles.card}>

                        <DetailRow
                            icon="pricetag-outline"
                            text={item.category}
                        />

                        <DetailRow
                            icon="location-outline"
                            text={item.location}
                        />

                        <DetailRow
                            icon="calendar-outline"
                            text={
                                item.lostFoundDate
                            }
                        />

                        <DetailRow
                            icon="person-outline"
                            text={
                                item.reportedBy
                            }
                        />

                    </View>


                    <TouchableOpacity
                        style={
                            styles.editButton
                        }
                        activeOpacity={0.8}
                        onPress={() =>
                            navigation.navigate(
                                "AdminEditItem",
                                { item }
                            )
                        }
                    >

                        <Ionicons
                            name="create-outline"
                            size={21}
                            color={
                                Colors.white
                            }
                        />

                        <Text
                            style={
                                styles.editText
                            }
                        >
                            Edit Item
                        </Text>

                    </TouchableOpacity>


                    <TouchableOpacity
                        style={
                            styles.deleteButton
                        }
                        activeOpacity={0.8}
                        onPress={
                            handleDelete
                        }
                    >

                        <Ionicons
                            name="trash-outline"
                            size={21}
                            color={
                                Colors.danger
                            }
                        />

                        <Text
                            style={
                                styles.deleteText
                            }
                        >
                            Delete Item
                        </Text>

                    </TouchableOpacity>

                </View>

            </ScrollView>

        </SafeAreaView>

    );
};


export default AdminItemDetailsScreen;


const styles = StyleSheet.create({

    container: {

        flex: 1,

        backgroundColor:
            Colors.background,

    },

    image: {

        width: "100%",

        height: 250,

    },

    content: {

        padding:
            Spacing.lg,

    },

    header: {

        flexDirection: "row",

        justifyContent:
            "space-between",

        alignItems:
            "flex-start",

    },

    title: {

        flex: 1,

        fontSize: 26,

        fontFamily:
            Fonts.bold,

        color:
            Colors.text,

        marginRight:
            Spacing.md,

    },

    status: {

        paddingHorizontal: 12,

        paddingVertical: 6,

        borderRadius: 20,

    },

    statusText: {

        fontSize: 11,

        fontFamily:
            Fonts.bold,

    },

    description: {

        marginTop:
            Spacing.md,

        fontSize: 15,

        lineHeight: 23,

        fontFamily:
            Fonts.regular,

        color:
            Colors.textSecondary,

    },

    card: {

        marginTop:
            Spacing.lg,

        padding:
            Spacing.lg,

        backgroundColor:
            Colors.white,

        borderRadius:
            Radius.lg,

        ...Shadows.sm,

    },

    editButton: {

        marginTop:
            Spacing.xl,

        height: 54,

        borderRadius:
            Radius.md,

        backgroundColor:
            Colors.primary,

        flexDirection: "row",

        justifyContent:
            "center",

        alignItems:
            "center",

    },

    editText: {

        marginLeft: 8,

        color:
            Colors.white,

        fontSize: 15,

        fontFamily:
            Fonts.semiBold,

    },

    deleteButton: {

        marginTop:
            Spacing.md,

        height: 54,

        borderRadius:
            Radius.md,

        backgroundColor:
            Colors.white,

        borderWidth: 1,

        borderColor:
            "#FFD7D7",

        flexDirection: "row",

        justifyContent:
            "center",

        alignItems:
            "center",

    },

    deleteText: {

        marginLeft: 8,

        color:
            Colors.danger,

        fontSize: 15,

        fontFamily:
            Fonts.semiBold,

    },

});