import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import PrimaryButton from "../../components/buttons/PrimaryButton";
import useAuth from "../../hooks/useAuth";

import {
    Colors,
    Fonts,
    Spacing,
} from "../../theme";

const ProfileScreen = () => {

    const { logout } = useAuth();

    return (

        <View style={styles.container}>

            <Text style={styles.title}>
                CampusFound
            </Text>

            <Text style={styles.subtitle}>
                Profile Screen
            </Text>

            <PrimaryButton
                title="Logout"
                onPress={logout}
            />

        </View>

    );

};

export default ProfileScreen;

const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        padding:Spacing.lg,
        backgroundColor:Colors.background,
    },

    title:{
        fontSize:28,
        fontFamily:Fonts.bold,
        color:Colors.text,
        marginBottom:8,
    },

    subtitle:{
        color:Colors.textSecondary,
        marginBottom:Spacing.xl,
        fontFamily:Fonts.regular,
    }

});