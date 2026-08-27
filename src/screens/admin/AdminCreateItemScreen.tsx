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

import * as ImagePicker from "expo-image-picker";

import {
    AdminStackParamList,
} from "../../navigation/AdminNavigator";

import AdminItemForm
    from "../../components/admin/AdminItemForm";

import AdminItemImagePicker
    from "../../components/admin/AdminItemImagePicker";

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

    const [description, setDescription] =
        useState("");

    const [category, setCategory] =
        useState("");

    const [location, setLocation] =
        useState("");

    const [lostFoundDate, setLostFoundDate] =
        useState("");

    const [
        selectedImage,
        setSelectedImage,
    ] = useState<
        ImagePicker.ImagePickerAsset | null
    >(null);

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

        if (!selectedImage) {

            Alert.alert(
                "Photo Required",
                "Please take or select a photo of the item."
            );

            return;
        }

        try {

            setLoading(true);

            const createdItem =
                await itemService.createItem(
                    {
                        title: title.trim(),

                        description:
                            description.trim(),

                        category:
                            category.trim(),

                        location:
                            location.trim(),

                        lostFoundDate:
                            lostFoundDate.trim(),
                    },

                    selectedImage
                );

            console.log(
                "Created Item:",
                createdItem
            );

            Alert.alert(
                "Item Created",
                "The item has been added to CampusFound successfully.",
                [
                    {
                        text: "OK",

                        onPress: () => {
                            navigation.goBack();
                        },
                    },
                ]
            );

        } catch (error: any) {

            console.log(
                "===== CREATE ITEM ERROR ====="
            );

            console.log(
                "Message:",
                error.message
            );

            console.log(
                "Code:",
                error.code
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
                "Creation Failed",
                error.response?.data?.message ||
                error.message ||
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
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
            >

                <AdminItemImagePicker
                    image={selectedImage}
                    onImageSelected={
                        setSelectedImage
                    }
                    onRemoveImage={() =>
                        setSelectedImage(null)
                    }
                />

                <AdminItemForm
                    title={title}
                    setTitle={setTitle}

                    description={description}
                    setDescription={setDescription}

                    category={category}
                    setCategory={setCategory}

                    location={location}
                    setLocation={setLocation}

                    lostFoundDate={lostFoundDate}
                    setLostFoundDate={setLostFoundDate}

                    buttonTitle="Create Item"

                    loading={loading}

                    onSubmit={handleCreate}
                />

            </ScrollView>

        </SafeAreaView>

    );
};

export default AdminCreateItemScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    content: {
        padding: Spacing.lg,
        paddingBottom: 60,
    },

});