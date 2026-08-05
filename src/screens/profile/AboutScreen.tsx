import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";

import {
    Ionicons,
} from "@expo/vector-icons";

import * as Linking from "expo-linking";

import {
    Colors,
    Fonts,
    Radius,
    Shadows,
    Spacing,
} from "../../theme";

const AboutScreen = () => {

    const openLink = (url: string) => {
        Linking.openURL(url);
    };

    return (

        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
        >

            <View style={styles.logoContainer}>

                <Ionicons
                    name="school"
                    size={70}
                    color={Colors.primary}
                />

                <Text style={styles.title}>
                    CampusFound
                </Text>

                <Text style={styles.version}>
                    Version 1.0.0
                </Text>

                <Text style={styles.tagline}>
                    Helping students reconnect with
                    their lost belongings.
                </Text>

            </View>

            <View style={styles.card}>

                <Text style={styles.heading}>
                    About
                </Text>

                <Text style={styles.description}>
                    CampusFound is a mobile application developed
                    to simplify the Lost & Found process inside
                    Thiagarajar College of Engineering.

                    {"\n\n"}

                    Students can easily report lost belongings,
                    browse found items, and claim their valuables
                    through a simple and secure platform.
                </Text>

            </View>

            <View style={styles.card}>

                <Text style={styles.heading}>
                    Quick Links
                </Text>

                <LinkItem
                    icon="mail-outline"
                    title="Email Support"
                    onPress={() =>
                        openLink("mailto:alexpandiyan@student.tce.edu")
                    }
                />

                <LinkItem
                    icon="shield-checkmark-outline"
                    title="Privacy Policy"
                    onPress={() =>
                        openLink("https://github.com/alexpandiyan1914")
                    }
                />

                <LinkItem
                    icon="document-text-outline"
                    title="Terms & Conditions"
                    onPress={() =>
                        openLink("https://github.com/alexpandiyan1914")
                    }
                />

                <LinkItem
                    icon="logo-github"
                    title="GitHub Repository"
                    onPress={() =>
                        openLink("https://github.com/alexpandiyan1914")
                    }
                />

            </View>

            <View style={styles.card}>

                <Text style={styles.heading}>
                    Developed By
                </Text>

                <Text style={styles.developer}>
                    Alex Pandiyan
                </Text>

                <Text style={styles.college}>
                    Thiagarajar College of Engineering
                </Text>

            </View>

            <Text style={styles.footer}>
                © 2026 CampusFound
            </Text>

        </ScrollView>

    );

};

interface LinkItemProps {

    icon: keyof typeof Ionicons.glyphMap;

    title: string;

    onPress: () => void;

}

const LinkItem = ({
    icon,
    title,
    onPress,
}: LinkItemProps) => (

    <TouchableOpacity
        style={styles.linkRow}
        onPress={onPress}
    >

        <Ionicons
            name={icon}
            size={22}
            color={Colors.primary}
        />

        <Text style={styles.linkText}>
            {title}
        </Text>

        <Ionicons
            name="chevron-forward"
            size={20}
            color={Colors.gray400}
        />

    </TouchableOpacity>

);

export default AboutScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    content: {
        padding: Spacing.lg,
    },

    logoContainer: {
        alignItems: "center",
        marginBottom: Spacing.xl,
    },

    title: {
        marginTop: 12,
        fontSize: 28,
        fontFamily: Fonts.bold,
        color: Colors.text,
    },

    version: {
        marginTop: 5,
        color: Colors.gray500,
        fontFamily: Fonts.medium,
    },

    tagline: {
        marginTop: 12,
        textAlign: "center",
        color: Colors.textSecondary,
        fontFamily: Fonts.regular,
        lineHeight: 24,
    },

    card: {
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        padding: Spacing.lg,
        marginBottom: Spacing.lg,
        ...Shadows.sm,
    },

    heading: {
        fontSize: 18,
        fontFamily: Fonts.bold,
        color: Colors.text,
        marginBottom: Spacing.md,
    },

    description: {
        color: Colors.textSecondary,
        lineHeight: 24,
        fontFamily: Fonts.regular,
    },

    linkRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
    },

    linkText: {
        flex: 1,
        marginLeft: 15,
        fontSize: 16,
        color: Colors.text,
        fontFamily: Fonts.medium,
    },

    developer: {
        fontSize: 18,
        fontFamily: Fonts.bold,
        color: Colors.text,
    },

    college: {
        marginTop: 6,
        color: Colors.textSecondary,
        fontFamily: Fonts.regular,
    },

    footer: {
        textAlign: "center",
        marginTop: 10,
        marginBottom: 30,
        color: Colors.gray500,
        fontFamily: Fonts.regular,
    },

});