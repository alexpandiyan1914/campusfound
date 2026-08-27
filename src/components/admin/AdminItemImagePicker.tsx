import React from "react";

import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { Ionicons } from "@expo/vector-icons";

import {
    Colors,
    Fonts,
    Radius,
    Shadows,
    Spacing,
} from "../../theme";


interface Props {

    image: ImagePicker.ImagePickerAsset | null;

    onImageSelected:
        (image: ImagePicker.ImagePickerAsset) => void;

    onRemoveImage: () => void;
}


const AdminItemImagePicker = ({
    image,
    onImageSelected,
    onRemoveImage,
}: Props) => {


    // ==========================================
    // CAMERA
    // ==========================================

    const takePhoto = async () => {

        try {

            const permission =
                await ImagePicker
                    .requestCameraPermissionsAsync();


            if (!permission.granted) {

                Alert.alert(
                    "Camera Permission Required",
                    "CampusFound needs camera access to capture an item photo."
                );

                return;
            }


            const result =
                await ImagePicker.launchCameraAsync({

                    mediaTypes: ["images"],

                    allowsEditing: true,

                    aspect: [4, 3],

                    quality: 0.8,

                });


            if (!result.canceled) {

                onImageSelected(
                    result.assets[0]
                );

            }

        } catch (error) {

            console.log(
                "Camera Error:",
                error
            );

            Alert.alert(
                "Camera Error",
                "Unable to open the camera."
            );

        }

    };


    // ==========================================
    // GALLERY
    // ==========================================

    const chooseFromGallery = async () => {

        try {

            const result =
                await ImagePicker
                    .launchImageLibraryAsync({

                        mediaTypes: ["images"],

                        allowsEditing: true,

                        aspect: [4, 3],

                        quality: 0.8,

                    });


            if (!result.canceled) {

                onImageSelected(
                    result.assets[0]
                );

            }

        } catch (error) {

            console.log(
                "Gallery Error:",
                error
            );

            Alert.alert(
                "Gallery Error",
                "Unable to open the photo library."
            );

        }

    };


    return (

        <View style={styles.container}>

            <Text style={styles.label}>
                Item Photo
            </Text>


            {/* NO IMAGE SELECTED */}

            {!image && (

                <View style={styles.emptyContainer}>

                    <View style={styles.placeholderIcon}>

                        <Ionicons
                            name="camera-outline"
                            size={34}
                            color={Colors.primary}
                        />

                    </View>

                    <Text style={styles.emptyTitle}>
                        Add a real item photo
                    </Text>

                    <Text style={styles.emptyDescription}>
                        Take a photo of the item or choose one from your gallery.
                    </Text>


                    <View style={styles.buttonRow}>

                        <TouchableOpacity
                            style={styles.cameraButton}
                            activeOpacity={0.8}
                            onPress={takePhoto}
                        >

                            <Ionicons
                                name="camera-outline"
                                size={20}
                                color={Colors.white}
                            />

                            <Text style={styles.cameraText}>
                                Take Photo
                            </Text>

                        </TouchableOpacity>


                        <TouchableOpacity
                            style={styles.galleryButton}
                            activeOpacity={0.8}
                            onPress={chooseFromGallery}
                        >

                            <Ionicons
                                name="images-outline"
                                size={20}
                                color={Colors.primary}
                            />

                            <Text style={styles.galleryText}>
                                Gallery
                            </Text>

                        </TouchableOpacity>

                    </View>

                </View>

            )}


            {/* IMAGE PREVIEW */}

            {image && (

                <View style={styles.previewContainer}>

                    <Image
                        source={{
                            uri: image.uri,
                        }}
                        style={styles.preview}
                    />


                    <View style={styles.previewActions}>

                        <TouchableOpacity
                            style={styles.changeButton}
                            activeOpacity={0.8}
                            onPress={takePhoto}
                        >

                            <Ionicons
                                name="camera-outline"
                                size={19}
                                color={Colors.primary}
                            />

                            <Text style={styles.changeText}>
                                Retake
                            </Text>

                        </TouchableOpacity>


                        <TouchableOpacity
                            style={styles.changeButton}
                            activeOpacity={0.8}
                            onPress={chooseFromGallery}
                        >

                            <Ionicons
                                name="images-outline"
                                size={19}
                                color={Colors.primary}
                            />

                            <Text style={styles.changeText}>
                                Change
                            </Text>

                        </TouchableOpacity>


                        <TouchableOpacity
                            style={styles.removeButton}
                            activeOpacity={0.8}
                            onPress={onRemoveImage}
                        >

                            <Ionicons
                                name="trash-outline"
                                size={19}
                                color={Colors.danger}
                            />

                        </TouchableOpacity>

                    </View>

                </View>

            )}

        </View>

    );

};


export default AdminItemImagePicker;


const styles = StyleSheet.create({

    container: {

        marginBottom:
            Spacing.lg,

    },

    label: {

        fontSize: 14,

        fontFamily:
            Fonts.semiBold,

        color:
            Colors.text,

        marginBottom: 8,

    },

    emptyContainer: {

        backgroundColor:
            Colors.white,

        borderWidth: 1,

        borderStyle: "dashed",

        borderColor:
            Colors.border,

        borderRadius:
            Radius.lg,

        padding:
            Spacing.xl,

        alignItems:
            "center",

        ...Shadows.sm,

    },

    placeholderIcon: {

        width: 64,

        height: 64,

        borderRadius: 32,

        backgroundColor:
            "#EEF2FF",

        justifyContent:
            "center",

        alignItems:
            "center",

        marginBottom:
            Spacing.md,

    },

    emptyTitle: {

        fontSize: 16,

        fontFamily:
            Fonts.semiBold,

        color:
            Colors.text,

    },

    emptyDescription: {

        marginTop: 5,

        textAlign: "center",

        fontSize: 13,

        lineHeight: 19,

        fontFamily:
            Fonts.regular,

        color:
            Colors.textSecondary,

    },

    buttonRow: {

        flexDirection: "row",

        marginTop:
            Spacing.lg,

        width: "100%",

        gap: 10,

    },

    cameraButton: {

        flex: 1,

        minHeight: 48,

        backgroundColor:
            Colors.primary,

        borderRadius:
            Radius.md,

        flexDirection: "row",

        justifyContent:
            "center",

        alignItems:
            "center",

    },

    cameraText: {

        marginLeft: 7,

        fontFamily:
            Fonts.semiBold,

        fontSize: 14,

        color:
            Colors.white,

    },

    galleryButton: {

        flex: 1,

        minHeight: 48,

        backgroundColor:
            Colors.white,

        borderWidth: 1,

        borderColor:
            Colors.primary,

        borderRadius:
            Radius.md,

        flexDirection: "row",

        justifyContent:
            "center",

        alignItems:
            "center",

    },

    galleryText: {

        marginLeft: 7,

        fontFamily:
            Fonts.semiBold,

        fontSize: 14,

        color:
            Colors.primary,

    },

    previewContainer: {

        backgroundColor:
            Colors.white,

        borderRadius:
            Radius.lg,

        overflow: "hidden",

        ...Shadows.sm,

    },

    preview: {

        width: "100%",

        height: 230,

    },

    previewActions: {

        flexDirection: "row",

        alignItems: "center",

        padding:
            Spacing.sm,

        gap: 8,

    },

    changeButton: {

        flex: 1,

        height: 44,

        borderRadius:
            Radius.md,

        backgroundColor:
            "#EEF2FF",

        flexDirection: "row",

        justifyContent:
            "center",

        alignItems:
            "center",

    },

    changeText: {

        marginLeft: 5,

        fontSize: 13,

        fontFamily:
            Fonts.semiBold,

        color:
            Colors.primary,

    },

    removeButton: {

        width: 44,

        height: 44,

        borderRadius:
            Radius.md,

        backgroundColor:
            "#FEE2E2",

        justifyContent:
            "center",

        alignItems:
            "center",

    },

});