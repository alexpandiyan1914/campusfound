import React from "react";
import {
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

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

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

          <View style={styles.headerText}>
            <Text style={styles.title}>
              Privacy Policy
            </Text>

            <Text style={styles.subtitle}>
              Effective September 5, 2026
            </Text>
          </View>
        </View>

        <View style={styles.privacyCard}>
          <View style={styles.privacyIcon}>
            <Ionicons
              name="shield-checkmark-outline"
              size={25}
              color={Colors.primary}
            />
          </View>

          <View style={styles.privacyContent}>
            <Text style={styles.privacyTitle}>
              Your information matters
            </Text>

            <Text style={styles.privacyText}>
              This policy explains what information CampusFound uses and why it is needed to operate the Lost & Found service.
            </Text>
          </View>
        </View>

        <PolicySection
          icon="person-outline"
          title="Information We Use"
        >
          CampusFound may process your name, college email address, phone number, department, year of study, account role, claim information, and details you provide when submitting an ownership claim.
        </PolicySection>

        <PolicySection
          icon="options-outline"
          title="How Information Is Used"
        >
          This information is used to manage accounts, authenticate users, display profile information, submit and review claims, maintain claim history, and support the Lost & Found verification process.
        </PolicySection>

        <PolicySection
          icon="document-text-outline"
          title="Claim Information"
        >
          Ownership details submitted with a claim help authorized administrators evaluate whether an item may belong to you. Provide only information that is necessary for verification.
        </PolicySection>

        <View style={styles.warningCard}>
          <Ionicons
            name="warning-outline"
            size={21}
            color={Colors.warning}
          />

          <View style={styles.warningContent}>
            <Text style={styles.warningTitle}>
              Don't include sensitive information
            </Text>

            <Text style={styles.warningText}>
              Never include passwords, OTPs, banking information, PINs, or other unnecessary confidential information in a claim.
            </Text>
          </View>
        </View>

        <PolicySection
          icon="cube-outline"
          title="Item Information"
        >
          CampusFound displays information about found items so students can identify belongings they may have lost. This can include an item title, description, category, location, date, image, and status.
        </PolicySection>

        <PolicySection
          icon="people-outline"
          title="Access to Information"
        >
          Access depends on the user's role. Students use student functionality, while authorized administrators can access the administrative functionality required to manage items and review ownership claims.
        </PolicySection>

        <PolicySection
          icon="lock-closed-outline"
          title="Authentication & Security"
        >
          CampusFound uses authenticated accounts and access controls for protected functionality. Users should keep their account credentials private. No internet-connected system can guarantee absolute security.
        </PolicySection>

        <PolicySection
          icon="server-outline"
          title="Data Retention"
        >
          Account, item, and claim information may be retained as necessary to operate CampusFound and support the Lost & Found process. Retention practices may be refined as the system develops.
        </PolicySection>

        <PolicySection
          icon="cloud-outline"
          title="Third-Party Services"
        >
          CampusFound may use third-party infrastructure for services such as database hosting, image storage, email delivery, application hosting, and future notification delivery. These services may process technical information required to provide their functionality.
        </PolicySection>

        <PolicySection
          icon="flask-outline"
          title="Beta Testing"
        >
          CampusFound 0.9.0-beta is currently being tested. Features and data-handling processes may be refined as the application is developed and evaluated.
        </PolicySection>

        <PolicySection
          icon="refresh-outline"
          title="Policy Updates"
        >
          This Privacy Policy may be updated when CampusFound features or data-handling practices change. The effective date or version will be updated when significant changes are made.
        </PolicySection>

        <Text style={styles.version}>
          CampusFound Privacy Policy · v0.9.0-beta
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

interface PolicySectionProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  children: React.ReactNode;
}

const PolicySection = ({
  icon,
  title,
  children,
}: PolicySectionProps) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <View style={styles.sectionIcon}>
        <Ionicons
          name={icon}
          size={18}
          color={Colors.primary}
        />
      </View>

      <Text style={styles.sectionTitle}>
        {title}
      </Text>
    </View>

    <Text style={styles.sectionText}>
      {children}
    </Text>
  </View>
);

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: 80,
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
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontFamily: Fonts.bold,
    color: Colors.text,
  },
  subtitle: {
    marginTop: 3,
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
  privacyCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primarySoft,
  },
  privacyIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  privacyContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  privacyTitle: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: Colors.text,
  },
  privacyText: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: Fonts.regular,
    color: Colors.gray700,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  sectionIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.sm,
    backgroundColor: Colors.primarySoft,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 15,
    fontFamily: Fonts.semiBold,
    color: Colors.text,
  },
  sectionText: {
    fontSize: 13,
    lineHeight: 21,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
  warningCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: Spacing.md,
    marginTop: -Spacing.sm,
    marginBottom: Spacing.xl,
    borderRadius: Radius.lg,
    backgroundColor: Colors.warningSoft,
  },
  warningContent: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
  warningTitle: {
    fontSize: 13,
    fontFamily: Fonts.semiBold,
    color: Colors.text,
  },
  warningText: {
    marginTop: 4,
    fontSize: 11,
    lineHeight: 18,
    fontFamily: Fonts.regular,
    color: Colors.gray700,
  },
  version: {
    textAlign: "center",
    fontSize: 10,
    fontFamily: Fonts.regular,
    color: Colors.gray500,
  },
});