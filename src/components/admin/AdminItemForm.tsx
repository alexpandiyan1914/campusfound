import React, {
    useState,
} from "react";

import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import DateTimePicker, {
    DateTimePickerAndroid,
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import {
    Ionicons,
} from "@expo/vector-icons";

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
    setTitle:
        (value: string) => void;

    description: string;
    setDescription:
        (value: string) => void;

    category: string;
    setCategory:
        (value: string) => void;

    location: string;
    setLocation:
        (value: string) => void;

    lostFoundDate: Date;
    setLostFoundDate:
        (date: Date) => void;

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

    buttonTitle,

    loading,

    onSubmit,
}: Props) => {

    const [
        showIOSDatePicker,
        setShowIOSDatePicker,
    ] = useState(false);


    const openAndroidDatePicker =
        () => {

            DateTimePickerAndroid.open({

                value:
                    lostFoundDate,

                mode:
                    "date",

                maximumDate:
                    new Date(),

                onChange: (
                    event,
                    selectedDate
                ) => {

                    if (
                        event.type === "set" &&
                        selectedDate
                    ) {

                        setLostFoundDate(
                            selectedDate
                        );
                    }
                },
            });
        };


    const handleIOSDateChange = (
        event: DateTimePickerEvent,
        selectedDate?: Date
    ) => {

        if (selectedDate) {

            setLostFoundDate(
                selectedDate
            );
        }
    };


    const openDatePicker =
        () => {

            if (
                Platform.OS === "android"
            ) {

                openAndroidDatePicker();

            } else {

                setShowIOSDatePicker(
                    true
                );
            }
        };


    const formattedDate =
        lostFoundDate.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );


    return (

        <View style={styles.form}>


            <FormInput

                label="Title"

                value={title}

                placeholder="Black Leather Wallet"

                onChangeText={
                    setTitle
                }
            />


            <Text
                style={
                    styles.label
                }
            >
                Description
            </Text>


            <TextInput

                style={
                    styles.descriptionInput
                }

                value={
                    description
                }

                onChangeText={
                    setDescription
                }

                placeholder={
                    "Enter item description"
                }

                placeholderTextColor={
                    Colors.gray400
                }

                multiline

                textAlignVertical="top"
            />


            <FormInput

                label="Category"

                value={
                    category
                }

                placeholder="Wallet"

                onChangeText={
                    setCategory
                }
            />


            <FormInput

                label="Location"

                value={
                    location
                }

                placeholder={
                    "Main Library"
                }

                onChangeText={
                    setLocation
                }
            />


            <View
                style={
                    styles.inputSection
                }
            >

                <Text
                    style={
                        styles.label
                    }
                >
                    Lost / Found Date
                </Text>


                <TouchableOpacity

                    style={
                        styles.dateInput
                    }

                    activeOpacity={
                        0.7
                    }

                    onPress={
                        openDatePicker
                    }
                >

                    <Ionicons

                        name={
                            "calendar-outline"
                        }

                        size={21}

                        color={
                            Colors.primary
                        }
                    />


                    <Text
                        style={
                            styles.dateText
                        }
                    >

                        {formattedDate}

                    </Text>


                    <Ionicons

                        name={
                            "chevron-down-outline"
                        }

                        size={18}

                        color={
                            Colors.gray500
                        }
                    />

                </TouchableOpacity>

            </View>


            {
                Platform.OS === "ios" &&
                showIOSDatePicker && (

                    <DateTimePicker

                        value={
                            lostFoundDate
                        }

                        mode="date"

                        maximumDate={
                            new Date()
                        }

                        display="spinner"

                        onChange={
                            handleIOSDateChange
                        }
                    />

                )
            }


            <Text
                style={
                    styles.helper
                }
            >
                Select the date when the item was found.
            </Text>


            <View
                style={
                    styles.buttonContainer
                }
            >

                <PrimaryButton

                    title={
                        buttonTitle
                    }

                    loading={
                        loading
                    }

                    disabled={
                        loading
                    }

                    onPress={
                        onSubmit
                    }
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
}


const FormInput = ({
    label,
    value,
    placeholder,
    onChangeText,
}: FormInputProps) => {

    return (

        <View
            style={
                styles.inputSection
            }
        >

            <Text
                style={
                    styles.label
                }
            >
                {label}
            </Text>


            <TextInput

                style={
                    styles.input
                }

                value={
                    value
                }

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


const styles =
    StyleSheet.create({

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


        dateInput: {

            minHeight: 52,

            borderWidth: 1,

            borderColor:
                Colors.border,

            borderRadius:
                Radius.md,

            paddingHorizontal: 14,

            flexDirection:
                "row",

            alignItems:
                "center",

            gap: 10,

            backgroundColor:
                Colors.white,
        },


        dateText: {

            flex: 1,

            fontSize: 15,

            fontFamily:
                Fonts.regular,

            color:
                Colors.text,
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