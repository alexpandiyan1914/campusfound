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
  Shadows,
  Spacing,
} from "../../theme";

const AboutScreen = () => {
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
            <Text style={styles.headerTitle}>
              CampusFound Beta
            </Text>

            <Text style={styles.headerSubtitle}>
              About this release
            </Text>
          </View>
        </View>

        <View style={styles.hero}>
          <View style={styles.logoContainer}>
            <Ionicons
              name="search"
              size={38}
              color={Colors.white}
            />
          </View>

          <Text style={styles.appName}>
            CampusFound
          </Text>

          <View style={styles.betaBadge}>
            <View style={styles.betaDot} />

            <Text style={styles.betaText}>
              BETA
            </Text>
          </View>

          <Text style={styles.tagline}>
            A simple campus Lost & Found system designed to help students discover and safely claim found belongings.
          </Text>
        </View>

        <View style={styles.betaNotice}>
          <View style={styles.noticeIcon}>
            <Ionicons
              name="flask-outline"
              size={22}
              color={Colors.primary}
            />
          </View>

          <View style={styles.noticeContent}>
            <Text style={styles.noticeTitle}>
              You're using a beta version
            </Text>

            <Text style={styles.noticeText}>
              CampusFound is currently being tested and improved before a wider release. Some features may change as we collect feedback and continue development.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          WHAT CAMPUSFOUND DOES
        </Text>

        <View style={styles.card}>
          <FeatureRow
            icon="cube-outline"
            title="Browse found items"
            description="View items posted by authorized Lost & Found administrators."
          />

          <Divider />

          <FeatureRow
            icon="search-outline"
            title="Find your belongings"
            description="Search and filter available items to find something you may have lost."
          />

          <Divider />

          <FeatureRow
            icon="shield-checkmark-outline"
            title="Submit ownership claims"
            description="Provide identifying details so the Lost & Found team can verify your claim."
          />

          <Divider />

          <FeatureRow
            icon="time-outline"
            title="Track claim status"
            description="Follow your claim as it moves through pending, approved or rejected states."
          />
        </View>

        <Text style={styles.sectionTitle}>
          CLAIM VERIFICATION
        </Text>

        <View style={styles.verificationCard}>
          <Ionicons
            name="information-circle-outline"
            size={22}
            color={Colors.primary}
          />

          <View style={styles.verificationContent}>
            <Text style={styles.verificationTitle}>
              Approval is not final collection
            </Text>

            <Text style={styles.verificationText}>
              If your claim is approved, you must visit the official Lost & Found office for physical verification. The item will be handed over only after the administrator confirms your identity and ownership.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          BETA STATUS
        </Text>

        <View style={styles.card}>
          <StatusRow
            icon="checkmark-circle-outline"
            label="Core Lost & Found flow"
            value="Available"
          />

          <Divider />

          <StatusRow
            icon="checkmark-circle-outline"
            label="Claims & verification"
            value="Available"
          />

          <Divider />

          <StatusRow
            icon="construct-outline"
            label="Push notifications"
            value="In development"
          />

          <Divider />

          <StatusRow
            icon="sparkles-outline"
            label="UI improvements"
            value="Ongoing"
          />
        </View>

        <Text style={styles.sectionTitle}>
          VERSION
        </Text>

        <View style={styles.versionCard}>
          <View style={styles.versionLeft}>
            <View style={styles.versionIcon}>
              <Ionicons
                name="information-outline"
                size={20}
                color={Colors.primary}
              />
            </View>

            <View>
              <Text style={styles.versionTitle}>
                CampusFound
              </Text>

              <Text style={styles.versionSubtitle}>
                Beta release
              </Text>
            </View>
          </View>

          <Text style={styles.versionValue}>
            0.9.0-beta
          </Text>
        </View>

        <View style={styles.developerSection}>
          <Text style={styles.developedBy}>
            Developed for Thiagarajar College of Engineering
          </Text>

          <Text style={styles.footer}>
            © 2026 CampusFound
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

interface FeatureRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}

const FeatureRow = ({
  icon,
  title,
  description,
}: FeatureRowProps) => {
  return (
    <View style={styles.featureRow}>
      <View style={styles.featureIcon}>
        <Ionicons
          name={icon}
          size={20}
          color={Colors.primary}
        />
      </View>

      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>
          {title}
        </Text>

        <Text style={styles.featureDescription}>
          {description}
        </Text>
      </View>
    </View>
  );
};

interface StatusRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}

const StatusRow = ({
  icon,
  label,
  value,
}: StatusRowProps) => {
  return (
    <View style={styles.statusRow}>
      <Ionicons
        name={icon}
        size={19}
        color={Colors.primary}
      />

      <Text style={styles.statusLabel}>
        {label}
      </Text>

      <Text style={styles.statusValue}>
        {value}
      </Text>
    </View>
  );
};

const Divider = () => {
  return <View style={styles.divider} />;
};

export default AboutScreen;

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

  headerTitle: {
    fontSize: 25,
    fontFamily: Fonts.bold,
    color: Colors.text,
  },

  headerSubtitle: {
    marginTop: 3,
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },

  hero: {
    alignItems: "center",
    paddingVertical: Spacing.lg,
    marginBottom: Spacing.lg,
  },

  logoContainer: {
    width: 76,
    height: 76,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    ...Shadows.sm,
  },

  appName: {
    marginTop: Spacing.md,
    fontSize: 26,
    fontFamily: Fonts.bold,
    color: Colors.text,
  },

  betaBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.sm,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radius.pill,
    backgroundColor: Colors.primarySoft,
  },

  betaDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
    backgroundColor: Colors.primary,
  },

  betaText: {
    fontSize: 10,
    letterSpacing: 1,
    fontFamily: Fonts.bold,
    color: Colors.primary,
  },

  tagline: {
    maxWidth: 330,
    marginTop: Spacing.md,
    textAlign: "center",
    fontSize: 13,
    lineHeight: 20,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },

  betaNotice: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primarySoft,
  },

  noticeIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },

  noticeContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },

  noticeTitle: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: Colors.text,
  },

  noticeText: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: Fonts.regular,
    color: Colors.gray700,
  },

  sectionTitle: {
    marginBottom: Spacing.sm,
    fontSize: 11,
    letterSpacing: 0.8,
    fontFamily: Fonts.semiBold,
    color: Colors.gray500,
  },

  card: {
    marginBottom: Spacing.xl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    backgroundColor: Colors.white,
    ...Shadows.sm,
  },

  featureRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: Spacing.md,
  },

  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primarySoft,
  },

  featureContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },

  featureTitle: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: Colors.text,
  },

  featureDescription: {
    marginTop: 3,
    fontSize: 11,
    lineHeight: 17,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },

  divider: {
    height: 1,
    marginLeft: 72,
    backgroundColor: Colors.gray100,
  },

  verificationCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primarySoft,
  },

  verificationContent: {
    flex: 1,
    marginLeft: Spacing.sm,
  },

  verificationTitle: {
    fontSize: 13,
    fontFamily: Fonts.semiBold,
    color: Colors.text,
  },

  verificationText: {
    marginTop: 4,
    fontSize: 11,
    lineHeight: 18,
    fontFamily: Fonts.regular,
    color: Colors.gray700,
  },

  statusRow: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
  },

  statusLabel: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: 13,
    fontFamily: Fonts.medium,
    color: Colors.text,
  },

  statusValue: {
    fontSize: 11,
    fontFamily: Fonts.medium,
    color: Colors.textSecondary,
  },

  versionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    backgroundColor: Colors.white,
    ...Shadows.sm,
  },

  versionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  versionIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
    backgroundColor: Colors.primarySoft,
  },

  versionTitle: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: Colors.text,
  },

  versionSubtitle: {
    marginTop: 3,
    fontSize: 11,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },

  versionValue: {
    fontSize: 12,
    fontFamily: Fonts.semiBold,
    color: Colors.primary,
  },

  developerSection: {
    alignItems: "center",
    paddingTop: Spacing.sm,
  },

  developedBy: {
    maxWidth: 300,
    textAlign: "center",
    fontSize: 11,
    lineHeight: 17,
    fontFamily: Fonts.regular,
    color: Colors.gray500,
  },

  footer: {
    marginTop: Spacing.sm,
    fontSize: 10,
    fontFamily: Fonts.regular,
    color: Colors.gray400,
  },
});