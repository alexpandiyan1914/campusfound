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
        "AdminCreateItem"
    >;


const AdminCreateItemScreen = ({
    navigation,
}: Props) => {

    const [title, setTitle] =
        useState("");

    const [
        description,
        setDescription,
    ] = useState("");

    const [category, setCategory] =
        useState("");

    const [location, setLocation] =
        useState("");

    const [
        lostFoundDate,
        setLostFoundDate,
    ] = useState("");

    const [imageUrl, setImageUrl] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    const handleCreate = async () => {

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

            await itemService.createItem({

                title:
                    title.trim(),

                description:
                    description.trim(),

                category:
                    category.trim(),

                location:
                    location.trim(),

                lostFoundDate:
                    lostFoundDate.trim(),

                imageUrl:
                    imageUrl.trim() ||
                    null,

            });


            Alert.alert(
                "Item Created",
                "The item has been added to CampusFound.",
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
                "Create Item Error:",
                error.response?.data ||
                error.message
            );

            Alert.alert(
                "Creation Failed",
                error.response?.data?.message ||
                "Unable to create the item."
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

                    imageUrl={
                        imageUrl
                    }

                    setImageUrl={
                        setImageUrl
                    }

                    buttonTitle={
                        "Create Item"
                    }

                    loading={
                        loading
                    }

                    onSubmit={
                        handleCreate
                    }

                />

            </ScrollView>

        </SafeAreaView>

    );
};


export default AdminCreateItemScreen;


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