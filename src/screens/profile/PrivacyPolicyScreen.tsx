import React from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import {
  Colors,
  Fonts,
  Radius,
  Spacing,
} from "../../theme";

const PRIVACY_URL =
  "https://github.com/alexpandiyan1914/campusfound/blob/master/PRIVACY.md";

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  const openPrivacyPolicy = async () => {
    await Linking.openURL(PRIVACY_URL);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back"
              size={21}
              color={Colors.text}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Privacy Policy
          </Text>
        </View>

        <View style={styles.iconContainer}>
          <Ionicons
            name="shield-checkmark-outline"
            size={30}
            color={Colors.primary}
          />
        </View>

        <Text style={styles.title}>
          Your Privacy
        </Text>

        <Text style={styles.description}>
          CampusFound uses basic account information such as
          your name, college email, phone number, department
          and year to provide the Lost & Found service.
        </Text>

        <Text style={styles.description}>
          Claim details you submit are used by authorized
          administrators to help verify ownership of an item.
        </Text>

        <View style={styles.notice}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color={Colors.warning}
          />

          <Text style={styles.noticeText}>
            Do not include passwords, OTPs, banking
            information, PINs or other sensitive information
            in your claims.
          </Text>
        </View>

        <Text style={styles.description}>
          CampusFound also uses third-party services for
          database hosting, image storage and email delivery.
          Read the complete policy for more information.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.8}
          onPress={openPrivacyPolicy}
        >
          <Text style={styles.primaryButtonText}>
            Read Full Privacy Policy
          </Text>

          <Ionicons
            name="open-outline"
            size={18}
            color={Colors.white}
          />
        </TouchableOpacity>

        <Text style={styles.footer}>
          Last updated: September 5, 2026
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: Colors.text,
  },
  iconContainer: {
    width: 58,
    height: 58,
    borderRadius: Radius.lg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
    backgroundColor: Colors.primarySoft,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  description: {
    fontSize: 13,
    lineHeight: 21,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  notice: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: Colors.warningSoft,
  },
  noticeText: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: 12,
    lineHeight: 19,
    fontFamily: Fonts.regular,
    color: Colors.gray700,
  },
  primaryButton: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.sm,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
  },
  primaryButtonText: {
    marginRight: Spacing.sm,
    fontSize: 13,
    fontFamily: Fonts.semiBold,
    color: Colors.white,
  },
  footer: {
    marginTop: Spacing.lg,
    textAlign: "center",
    fontSize: 10,
    fontFamily: Fonts.regular,
    color: Colors.gray500,
  },
});