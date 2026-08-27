import React, {
    useState,
} from "react";

import {
    Alert,
    ScrollView,
    StyleSheet,
} from "react-native";

import {
    SafeAreaView,
} from "react-native-safe-area-context";

import {
    NativeStackScreenProps,
} from "@react-navigation/native-stack";

import {
    AdminStackParamList,
} from "../../navigation/AdminNavigator";

import AdminItemForm
    from "../../components/admin/AdminItemForm";

import itemService
    from "../../services/itemService";

import {
    Colors,
    Spacing,
} from "../../theme";


type Props =
    NativeStackScreenProps<
        AdminStackParamList,
        "AdminEditItem"
    >;


const AdminEditItemScreen = ({
    route,
    navigation,
}: Props) => {

    const { item } =
        route.params;


    const [title, setTitle] =
        useState(item.title);

    const [
        description,
        setDescription,
    ] =
        useState(
            item.description
        );

    const [category, setCategory] =
        useState(item.category);

    const [location, setLocation] =
        useState(item.location);

    const [
        lostFoundDate,
        setLostFoundDate,
    ] =
        useState(
            item.lostFoundDate
        );

    const [imageUrl, setImageUrl] =
        useState(
            item.imageUrl || ""
        );

    const [loading, setLoading] =
        useState(false);


    const handleUpdate = async () => {

        if (
            !title.trim() ||
            !description.trim() ||
            !category.trim() ||
            !location.trim() ||
            !lostFoundDate.trim()
        ) {

            Alert.alert(
                "Missing Information",
                "Please fill in all required fields."
            );

            return;
        }


        try {

            setLoading(true);

            await itemService.updateItem(
                item.id,
                {
                    title: title.trim(),
                    description: description.trim(),
                    category: category.trim(),
                    location: location.trim(),
                    lostFoundDate: lostFoundDate.trim(),
                }
            );


            Alert.alert(
                "Item Updated",
                "The item has been updated successfully.",
                [
                    {
                        text: "OK",

                        onPress: () =>
                            navigation.pop(2),
                    },
                ]
            );

        } catch (error: any) {

            console.log(
                "Update Item Error:",
                error.response?.data ||
                error.message
            );

            Alert.alert(
                "Update Failed",
                error.response?.data?.message ||
                "Unable to update this item."
            );

        } finally {

            setLoading(false);

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

                contentContainerStyle={
                    styles.content
                }

                keyboardShouldPersistTaps={
                    "handled"
                }
            >

                <AdminItemForm

                    title={title}

                    setTitle={setTitle}

                    description={
                        description
                    }

                    setDescription={
                        setDescription
                    }

                    category={
                        category
                    }

                    setCategory={
                        setCategory
                    }

                    location={
                        location
                    }

                    setLocation={
                        setLocation
                    }

                    lostFoundDate={
                        lostFoundDate
                    }

                    setLostFoundDate={
                        setLostFoundDate
                    }


                    buttonTitle={
                        "Save Changes"
                    }

                    loading={
                        loading
                    }

                    onSubmit={
                        handleUpdate
                    }

                />

            </ScrollView>

        </SafeAreaView>

    );
};


export default AdminEditItemScreen;


const styles = StyleSheet.create({

    container: {

        flex: 1,

        backgroundColor:
            Colors.background,

    },

    content: {

        padding:
            Spacing.lg,

        paddingBottom: 60,

    },

});