import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Linking from "expo-linking";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import useFeedback from "../../hooks/useFeedback";
import { MainStackParamList } from "../../navigation/MainNavigator";
import {
  Colors,
  Fonts,
  Radius,
  Shadows,
  Spacing,
} from "../../theme";

type NavigationProp =
  NativeStackNavigationProp<MainStackParamList>;

const SettingsScreen = () => {
  const navigation =
    useNavigation<NavigationProp>();

  const {
    showInfo,
    showError
  } = useFeedback();

  const handleReportIssue = async () => {
    const url =
      "https://github.com/alexpandiyan1914/campusfound/issues";

    try {
      await Linking.openURL(url);
    } catch {
      showError(
        "Unable to Open GitHub",
        "Please try again later."
      );
    }
  };

  const handleFeedback = () => {
    showInfo(
      "Send Feedback",
      "Beta feedback will be connected before the CampusFound release."
    );
  };

  return (
    <SafeAreaView
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.content
        }
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() =>
              navigation.goBack()
            }
          >
            <Ionicons
              name="arrow-back"
              size={21}
              color={Colors.text}
            />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.title}>
              Settings
            </Text>

            <Text style={styles.subtitle}>
              Manage your CampusFound experience
            </Text>
          </View>
        </View>

        <SettingsSection
          title="ACCOUNT"
        >
          <SettingsRow
            icon="person-outline"
            title="Edit Profile"
            description="Update your name and phone number"
            onPress={() =>
              navigation.navigate(
                "EditProfile"
              )
            }
          />

          <RowDivider />

          <SettingsRow
            icon="lock-closed-outline"
            title="Change Password"
            description="Update your account password"
            onPress={() =>
              navigation.navigate(
                "ChangePassword"
              )
            }
          />

          <RowDivider />

          <SettingsRow
            icon="notifications-outline"
            title="Notifications"
            description="Manage claim and item alerts"
            onPress={() =>
              navigation.navigate(
                "NotificationSettings"
              )
            }
          />
        </SettingsSection>

        <SettingsSection
          title="SUPPORT"
        >
          <SettingsRow
            icon="bug-outline"
            title="Report an Issue"
            description="Tell us if something isn't working"
            onPress={handleReportIssue}
          />

          <RowDivider />

          <SettingsRow
            icon="bulb-outline"
            title="Send Feedback"
            description="Help us improve CampusFound"
            onPress={handleFeedback}
          />
        </SettingsSection>

        <SettingsSection
          title="ABOUT"
        >
          <SettingsRow
            icon="flask-outline"
            title="CampusFound Beta"
            description="About this beta release"
            onPress={() =>
              navigation.navigate(
                "About"
              )
            }
          />

          <RowDivider />

          <SettingsRow
            icon="document-text-outline"
            title="Terms & Conditions"
            onPress={() =>
              navigation.navigate(
                "TermsAndConditions"
              )
            }
          />

          <RowDivider />

          <SettingsRow
            icon="shield-checkmark-outline"
            title="Privacy Policy"
            onPress={() =>
              navigation.navigate(
                "PrivacyPolicy"
              )
            }
          />

          <RowDivider />

          <SettingsRow
            icon="code-slash-outline"
            title="Open Source Licenses"
            onPress={() =>
              navigation.navigate(
                "OpenSourceLicenses"
              )
            }
          />

          <RowDivider />

          <SettingsRow
            icon="information-circle-outline"
            title="Version"
            trailingText="0.9.0-beta"
          />
        </SettingsSection>

        <Text style={styles.footer}>
          CampusFound · Beta Release
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

const SettingsSection = ({
  title,
  children,
}: SettingsSectionProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      <View style={styles.sectionCard}>
        {children}
      </View>
    </View>
  );
};

interface SettingsRowProps {
  icon:
  keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
  onPress?: () => void;
  trailingText?: string;
}

const SettingsRow = ({
  icon,
  title,
  description,
  onPress,
  trailingText,
}: SettingsRowProps) => {
  const content = (
    <>
      <View style={styles.settingIcon}>
        <Ionicons
          name={icon}
          size={20}
          color={Colors.primary}
        />
      </View>

      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>
          {title}
        </Text>

        {description ? (
          <Text
            style={
              styles.settingDescription
            }
          >
            {description}
          </Text>
        ) : null}
      </View>

      {trailingText ? (
        <Text style={styles.trailingText}>
          {trailingText}
        </Text>
      ) : onPress ? (
        <Ionicons
          name="chevron-forward"
          size={18}
          color={Colors.gray400}
        />
      ) : null}
    </>
  );

  if (!onPress) {
    return (
      <View style={styles.settingRow}>
        {content}
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={styles.settingRow}
      activeOpacity={0.75}
      onPress={onPress}
    >
      {content}
    </TouchableOpacity>
  );
};

const RowDivider = () => {
  return (
    <View style={styles.divider} />
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    padding: Spacing.lg,
    paddingBottom: 90,
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
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },

  section: {
    marginBottom: Spacing.lg,
  },

  sectionTitle: {
    marginBottom: Spacing.sm,
    marginLeft: 2,
    fontSize: 11,
    letterSpacing: 0.8,
    fontFamily: Fonts.semiBold,
    color: Colors.gray500,
  },

  sectionCard: {
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    backgroundColor: Colors.white,
    ...Shadows.sm,
  },

  settingRow: {
    minHeight: 70,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: 11,
  },

  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primarySoft,
  },

  settingContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },

  settingTitle: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: Colors.text,
  },

  settingDescription: {
    marginTop: 3,
    fontSize: 11,
    lineHeight: 16,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },

  trailingText: {
    marginLeft: Spacing.sm,
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: Colors.gray500,
  },

  divider: {
    height: 1,
    marginLeft: 72,
    backgroundColor: Colors.gray100,
  },

  footer: {
    marginTop: Spacing.sm,
    textAlign: "center",
    fontSize: 11,
    fontFamily: Fonts.regular,
    color: Colors.gray500,
  },
});