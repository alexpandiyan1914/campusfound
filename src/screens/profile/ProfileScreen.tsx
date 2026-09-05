import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import useAuth from "../../hooks/useAuth";
import useFeedback from "../../hooks/useFeedback";
import { useProfile } from "../../context/ProfileContext";
import { useClaims } from "../../context/ClaimContext";
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

const ProfileScreen = () => {
  const navigation =
    useNavigation<NavigationProp>();

  const { logout } = useAuth();

  const {
    profile,
    loading,
  } = useProfile();

  const {
    claims,
  } = useClaims();

  const {
    showConfirm,
  } = useFeedback();

  const totalClaims =
    claims.length;

  const approvedClaims =
    claims.filter(
      claim =>
        claim.status === "APPROVED"
    ).length;

  const handleLogout = () => {
    showConfirm({
      title: "Logout",
      message:
        "Are you sure you want to logout from CampusFound?",
      confirmText: "Logout",
      cancelText: "Cancel",
      destructive: true,
      onConfirm: async () => {
        await logout();
      },
    });
  };

  if (loading) {
    return (
      <SafeAreaView
        style={styles.loadingContainer}
      >
        <ActivityIndicator
          size="large"
          color={Colors.primary}
        />
      </SafeAreaView>
    );
  }

  if (!profile) {
    return (
      <SafeAreaView
        style={styles.loadingContainer}
      >
        <Ionicons
          name="person-circle-outline"
          size={54}
          color={Colors.gray400}
        />

        <Text style={styles.errorTitle}>
          Profile unavailable
        </Text>

        <Text style={styles.errorText}>
          We couldn't load your profile information.
        </Text>
      </SafeAreaView>
    );
  }

  const initial =
    profile.fullName
      ?.trim()
      .charAt(0)
      .toUpperCase() || "U";

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
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>
            Profile
          </Text>

          <Text style={styles.pageSubtitle}>
            Your CampusFound account
          </Text>
        </View>

        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {initial}
            </Text>
          </View>

          <Text
            style={styles.name}
            numberOfLines={1}
          >
            {profile.fullName}
          </Text>

          <Text
            style={styles.email}
            numberOfLines={1}
          >
            {profile.email}
          </Text>

          <View style={styles.roleBadge}>
            <Ionicons
              name={
                profile.role === "ADMIN"
                  ? "shield-checkmark-outline"
                  : "school-outline"
              }
              size={14}
              color={Colors.primary}
            />

            <Text style={styles.roleText}>
              {profile.role}
            </Text>
          </View>
        </View>

        {profile.role === "STUDENT" && (
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {totalClaims}
              </Text>

              <Text style={styles.statLabel}>
                Claims
              </Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <Text
                style={[
                  styles.statValue,
                  styles.approvedValue,
                ]}
              >
                {approvedClaims}
              </Text>

              <Text style={styles.statLabel}>
                Approved
              </Text>
            </View>
          </View>
        )}

        <Text style={styles.sectionLabel}>
          QUICK ACCESS
        </Text>

        {profile.role === "STUDENT" && (
          <MenuRow
            icon="document-text-outline"
            title="Claim History"
            description="Track your submitted claims"
            onPress={() =>
              navigation.navigate(
                "ClaimHistory"
              )
            }
          />
        )}

        <MenuRow
          icon="settings-outline"
          title="Settings"
          description="Account, support and app information"
          onPress={() =>
            navigation.navigate(
              "Settings"
            )
          }
        />

        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          onPress={handleLogout}
        >
          <Ionicons
            name="log-out-outline"
            size={20}
            color={Colors.danger}
          />

          <Text style={styles.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>

        <Text style={styles.version}>
          CampusFound v0.9.0-beta
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

interface MenuRowProps {
  icon:
    keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  onPress: () => void;
}

const MenuRow = ({
  icon,
  title,
  description,
  onPress,
}: MenuRowProps) => {
  return (
    <TouchableOpacity
      style={styles.menuRow}
      activeOpacity={0.78}
      onPress={onPress}
    >
      <View style={styles.menuIcon}>
        <Ionicons
          name={icon}
          size={21}
          color={Colors.primary}
        />
      </View>

      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>
          {title}
        </Text>

        <Text
          style={styles.menuDescription}
          numberOfLines={1}
        >
          {description}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={19}
        color={Colors.gray400}
      />
    </TouchableOpacity>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  loadingContainer: {
    flex: 1,
    padding: Spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },

  content: {
    padding: Spacing.lg,
    paddingBottom: 110,
  },

  pageHeader: {
    marginBottom: Spacing.lg,
  },

  pageTitle: {
    fontSize: 27,
    fontFamily: Fonts.bold,
    color: Colors.text,
  },

  pageSubtitle: {
    marginTop: 3,
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },

  profileHeader: {
    alignItems: "center",
    paddingVertical: Spacing.xl,
  },

  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    marginBottom: Spacing.md,
  },

  avatarText: {
    fontSize: 34,
    fontFamily: Fonts.bold,
    color: Colors.white,
  },

  name: {
    maxWidth: "100%",
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: Colors.text,
  },

  email: {
    maxWidth: "100%",
    marginTop: 5,
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },

  roleBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.md,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: Radius.pill,
    backgroundColor: Colors.primarySoft,
  },

  roleText: {
    marginLeft: 5,
    fontSize: 11,
    fontFamily: Fonts.semiBold,
    color: Colors.primary,
  },

  statsCard: {
    minHeight: 90,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    backgroundColor: Colors.white,
    ...Shadows.sm,
  },

  statItem: {
    flex: 1,
    alignItems: "center",
  },

  statValue: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.primary,
  },

  approvedValue: {
    color: Colors.success,
  },

  statLabel: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: Colors.textSecondary,
  },

  statDivider: {
    width: 1,
    height: 42,
    backgroundColor: Colors.border,
  },

  sectionLabel: {
    marginBottom: Spacing.sm,
    fontSize: 11,
    letterSpacing: 0.8,
    fontFamily: Fonts.semiBold,
    color: Colors.gray500,
  },

  menuRow: {
    minHeight: 70,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    backgroundColor: Colors.white,
  },

  menuIcon: {
    width: 42,
    height: 42,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primarySoft,
  },

  menuContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },

  menuTitle: {
    fontSize: 15,
    fontFamily: Fonts.semiBold,
    color: Colors.text,
  },

  menuDescription: {
    marginTop: 3,
    fontSize: 11,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },

  logoutButton: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.lg,
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: Radius.lg,
    backgroundColor: Colors.white,
  },

  logoutText: {
    marginLeft: Spacing.sm,
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: Colors.danger,
  },

  version: {
    marginTop: Spacing.xl,
    textAlign: "center",
    fontSize: 11,
    fontFamily: Fonts.regular,
    color: Colors.gray500,
  },

  errorTitle: {
    marginTop: Spacing.md,
    fontSize: 17,
    fontFamily: Fonts.bold,
    color: Colors.text,
  },

  errorText: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
});