import React from "react";

import {
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import PrimaryButton
    from "../buttons/PrimaryButton";

import {
    Colors,
    Fonts,
    Radius,
    Shadows,
    Spacing,
} from "../../theme";

interface Props {

    title: string;
    setTitle: (value: string) => void;

    description: string;
    setDescription: (value: string) => void;

    category: string;
    setCategory: (value: string) => void;

    location: string;
    setLocation: (value: string) => void;

    lostFoundDate: string;
    setLostFoundDate: (value: string) => void;

    imageUrl: string;
    setImageUrl: (value: string) => void;

    buttonTitle: string;

    loading: boolean;

    onSubmit: () => void;
}

const AdminItemForm = ({
    title,
    setTitle,

    description,
    setDescription,

    category,
    setCategory,

    location,
    setLocation,

    lostFoundDate,
    setLostFoundDate,

    imageUrl,
    setImageUrl,

    buttonTitle,

    loading,

    onSubmit,
}: Props) => {

    return (

        <View style={styles.form}>

            <FormInput
                label="Title"
                value={title}
                placeholder="Black Leather Wallet"
                onChangeText={setTitle}
            />

            <Text style={styles.label}>
                Description
            </Text>

            <TextInput
                style={styles.descriptionInput}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter item description"
                placeholderTextColor={
                    Colors.gray400
                }
                multiline
                textAlignVertical="top"
            />

            <FormInput
                label="Category"
                value={category}
                placeholder="Wallet"
                onChangeText={setCategory}
            />

            <FormInput
                label="Location"
                value={location}
                placeholder="Main Library"
                onChangeText={setLocation}
            />

            <FormInput
                label="Lost / Found Date"
                value={lostFoundDate}
                placeholder="2026-08-25"
                onChangeText={
                    setLostFoundDate
                }
            />

            <Text style={styles.helper}>
                Use YYYY-MM-DD format.
            </Text>

            <FormInput
                label="Image URL"
                value={imageUrl}
                placeholder="https://..."
                onChangeText={setImageUrl}
                optional
            />

            <View style={styles.buttonContainer}>

                <PrimaryButton
                    title={buttonTitle}
                    loading={loading}
                    disabled={loading}
                    onPress={onSubmit}
                />

            </View>

        </View>

    );
};


interface FormInputProps {

    label: string;

    value: string;

    placeholder: string;

    onChangeText:
        (value: string) => void;

    optional?: boolean;
}


const FormInput = ({
    label,
    value,
    placeholder,
    onChangeText,
    optional = false,
}: FormInputProps) => {

    return (

        <View style={styles.inputSection}>

            <Text style={styles.label}>

                {label}

                {optional && (
                    <Text style={styles.optional}>
                        {" "}Optional
                    </Text>
                )}

            </Text>

            <TextInput
                style={styles.input}
                value={value}
                onChangeText={
                    onChangeText
                }
                placeholder={
                    placeholder
                }
                placeholderTextColor={
                    Colors.gray400
                }
            />

        </View>

    );
};


export default AdminItemForm;


const styles = StyleSheet.create({

    form: {

        backgroundColor:
            Colors.white,

        borderRadius:
            Radius.lg,

        padding:
            Spacing.lg,

        ...Shadows.sm,

    },

    inputSection: {

        marginBottom:
            Spacing.md,

    },

    label: {

        marginBottom: 7,

        fontSize: 14,

        fontFamily:
            Fonts.semiBold,

        color:
            Colors.text,

    },

    optional: {

        fontSize: 11,

        fontFamily:
            Fonts.regular,

        color:
            Colors.gray500,

    },

    input: {

        minHeight: 52,

        borderWidth: 1,

        borderColor:
            Colors.border,

        borderRadius:
            Radius.md,

        paddingHorizontal: 14,

        fontSize: 15,

        fontFamily:
            Fonts.regular,

        color:
            Colors.text,

        backgroundColor:
            Colors.white,

    },

    descriptionInput: {

        minHeight: 120,

        borderWidth: 1,

        borderColor:
            Colors.border,

        borderRadius:
            Radius.md,

        padding:
            Spacing.md,

        fontSize: 15,

        fontFamily:
            Fonts.regular,

        color:
            Colors.text,

        marginBottom:
            Spacing.md,

    },

    helper: {

        marginTop:
            -Spacing.sm,

        marginBottom:
            Spacing.md,

        fontSize: 11,

        fontFamily:
            Fonts.regular,

        color:
            Colors.gray500,

    },

    buttonContainer: {

        marginTop:
            Spacing.md,

    },

});