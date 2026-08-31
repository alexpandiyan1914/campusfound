import React, {
    useState,
} from "react";

import {
    Alert,
    StyleSheet,
} from "react-native";

import {
    SafeAreaView,
} from "react-native-safe-area-context";

import {
    KeyboardAwareScrollView,
} from "react-native-keyboard-aware-scroll-view";

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
        useState(
            item.title
        );


    const [
        description,
        setDescription,
    ] =
        useState(
            item.description
        );


    const [category, setCategory] =
        useState(
            item.category
        );


    const [location, setLocation] =
        useState(
            item.location
        );


    const [
        lostFoundDate,
        setLostFoundDate,
    ] =
        useState<Date>(
            new Date(
                item.lostFoundDate
            )
        );


    const [loading, setLoading] =
        useState(false);


    const formatDateForBackend = (
        date: Date
    ) => {

        const year =
            date.getFullYear();

        const month =
            String(
                date.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                date.getDate()
            ).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };


    const handleUpdate = async () => {

        if (
            !title.trim() ||
            !description.trim() ||
            !category.trim() ||
            !location.trim()
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
                    title:
                        title.trim(),

                    description:
                        description.trim(),

                    category:
                        category.trim(),

                    location:
                        location.trim(),

                    lostFoundDate:
                        formatDateForBackend(
                            lostFoundDate
                        ),
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
                "===== UPDATE ITEM ERROR ====="
            );

            console.log(
                "Message:",
                error.message
            );

            console.log(
                "Status:",
                error.response?.status
            );

            console.log(
                "Data:",
                error.response?.data
            );


            Alert.alert(
                "Update Failed",
                error.response?.data?.message ||
                error.message ||
                "Unable to update this item."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <SafeAreaView
            style={
                styles.container
            }
        >

            <KeyboardAwareScrollView

                contentContainerStyle={
                    styles.content
                }

                showsVerticalScrollIndicator={
                    false
                }

                keyboardShouldPersistTaps={
                    "handled"
                }

                enableOnAndroid={
                    true
                }

                enableAutomaticScroll={
                    true
                }

                extraScrollHeight={
                    60
                }

                extraHeight={
                    80
                }

                keyboardOpeningTime={
                    0
                }
            >

                <AdminItemForm

                    title={
                        title
                    }

                    setTitle={
                        setTitle
                    }


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

            </KeyboardAwareScrollView>

        </SafeAreaView>

    );
};


export default AdminEditItemScreen;


const styles =
    StyleSheet.create({

        container: {

            flex: 1,

            backgroundColor:
                Colors.background,

        },


        content: {

            padding:
                Spacing.lg,

            paddingBottom:
                100,

        },

    });