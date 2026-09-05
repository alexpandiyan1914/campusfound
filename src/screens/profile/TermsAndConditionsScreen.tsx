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

const TermsAndConditionsScreen = () => {
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
              Terms & Conditions
            </Text>

            <Text style={styles.subtitle}>
              Effective September 5, 2026
            </Text>
          </View>
        </View>

        <View style={styles.introCard}>
          <Ionicons
            name="document-text-outline"
            size={23}
            color={Colors.primary}
          />

          <Text style={styles.introText}>
            These terms explain the rules and responsibilities for using CampusFound and its Lost & Found services.
          </Text>
        </View>

        <PolicySection
          number="1"
          title="Purpose"
        >
          CampusFound helps students discover and claim belongings reported through the campus Lost & Found system. Items are managed by authorized administrators, while students can browse available items and submit ownership claims.
        </PolicySection>

        <PolicySection
          number="2"
          title="User Accounts"
        >
          Users should provide accurate account information and use their account responsibly. Accounts must not be used to impersonate another person, provide intentionally false information, or misuse CampusFound.
        </PolicySection>

        <PolicySection
          number="3"
          title="Item Information"
        >
          Item information is managed by authorized Lost & Found administrators. CampusFound does not guarantee that every lost item will appear in the application or that all displayed information will always be complete or error-free.
        </PolicySection>

        <PolicySection
          number="4"
          title="Ownership Claims"
        >
          Submit a claim only when you genuinely believe the item belongs to you. Provide useful identifying details that can help the Lost & Found team verify ownership. False, misleading, or fraudulent claims are not permitted.
        </PolicySection>

        <PolicySection
          number="5"
          title="Claim Review"
        >
          Submitting a claim does not confirm ownership. An authorized administrator may review the claim and mark it as Pending, Approved, or Rejected.
        </PolicySection>

        <PolicySection
          number="6"
          title="Physical Verification"
        >
          An approved claim does not automatically mean the item can be collected. You may be required to visit the official Lost & Found office, provide identification, and complete physical verification before the item is handed over.
        </PolicySection>

        <PolicySection
          number="7"
          title="Responsible Use"
        >
          Do not submit false claims, attempt to claim another person's belongings, provide misleading ownership information, interfere with the application, or use CampusFound for abusive, fraudulent, or unauthorized purposes.
        </PolicySection>

        <PolicySection
          number="8"
          title="Service Availability"
        >
          CampusFound may occasionally be unavailable because of maintenance, technical problems, network issues, service limitations, or application updates.
        </PolicySection>

        <View style={styles.betaCard}>
          <View style={styles.betaHeader}>
            <Ionicons
              name="flask-outline"
              size={20}
              color={Colors.primary}
            />

            <Text style={styles.betaTitle}>
              Beta Release
            </Text>
          </View>

          <Text style={styles.betaText}>
            CampusFound 0.9.0-beta is currently being tested. Features may change, bugs may occur, and functionality may be added, modified, or removed before the stable release.
          </Text>
        </View>

        <PolicySection
          number="9"
          title="Changes to These Terms"
        >
          These terms may be updated as CampusFound develops. The effective date or version will be updated when significant changes are made.
        </PolicySection>

        <Text style={styles.version}>
          CampusFound Terms & Conditions · v0.9.0-beta
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

interface PolicySectionProps {
  number: string;
  title: string;
  children: React.ReactNode;
}

const PolicySection = ({
  number,
  title,
  children,
}: PolicySectionProps) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <View style={styles.number}>
        <Text style={styles.numberText}>
          {number}
        </Text>
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

export default TermsAndConditionsScreen;

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
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.text,
  },
  subtitle: {
    marginTop: 3,
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
  introCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primarySoft,
  },
  introText: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: 12,
    lineHeight: 19,
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
  number: {
    width: 27,
    height: 27,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.sm,
    backgroundColor: Colors.primarySoft,
  },
  numberText: {
    fontSize: 11,
    fontFamily: Fonts.bold,
    color: Colors.primary,
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
  betaCard: {
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    backgroundColor: Colors.white,
  },
  betaHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  betaTitle: {
    marginLeft: Spacing.sm,
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: Colors.text,
  },
  betaText: {
    marginTop: Spacing.sm,
    fontSize: 12,
    lineHeight: 19,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
  version: {
    textAlign: "center",
    fontSize: 10,
    fontFamily: Fonts.regular,
    color: Colors.gray500,
  },
});