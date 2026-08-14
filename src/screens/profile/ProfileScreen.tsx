import React from "react";

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  Ionicons,
} from "@expo/vector-icons";

import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileStatCard from "../../components/profile/ProfileStatCard";
import ProfileMenuItem from "../../components/profile/ProfileMenuItem";
import SectionTitle from "../../components/profile/SectionTitle";

import useAuth from "../../hooks/useAuth";

import {
  useProfile,
} from "../../context/ProfileContext";

import {
  useClaims,
} from "../../context/ClaimContext";

import {
  profileMenu,
} from "../../constants/ProfileMenu";

import {
  Colors,
  Fonts,
  Radius,
  Shadows,
  Spacing,
} from "../../theme";

const ProfileScreen = () => {

  const navigation =
    useNavigation();

  const { logout } = useAuth();

  const {
    profile,
    loading,
  } = useProfile();

  const {
    claims,
  } = useClaims();

  const claimsCount =
    claims.length;

  const handleLogout = () => {

    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },

        {
          text: "Logout",
          style: "destructive",

          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  const handleMenuPress = (
    title: string
  ) => {

    if (title === "Edit Profile") {

      navigation.navigate(
        "EditProfile" as never
      );

      return;
    }

    if (title === "About") {

      navigation.navigate(
        "About" as never
      );

      return;
    }

    console.log(
      "Menu pressed:",
      title
    );
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

        <Text style={styles.errorText}>
          Unable to load profile.
        </Text>

      </SafeAreaView>
    );
  }

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

        <ProfileHeader
          fullName={profile.fullName}
          email={profile.email}
          role={profile.role}
        />

        <View style={styles.infoCard}>

          <InfoRow
            icon="school-outline"
            label="Department"
            value={
              profile.department ||
              "Not provided"
            }
          />

          <InfoRow
            icon="calendar-outline"
            label="Year"
            value={
              profile.year
                ? `Year ${profile.year}`
                : "Not provided"
            }
          />

          <InfoRow
            icon="call-outline"
            label="Phone"
            value={
              profile.phone ||
              "Not provided"
            }
          />

        </View>

        <SectionTitle
          title="Activity"
        />

        <View style={styles.statsRow}>

          <ProfileStatCard
            title="Claims"
            value={claimsCount}
          />

        </View>

        <SectionTitle
          title="Account"
        />

        {profileMenu.map(item => (

          <ProfileMenuItem
            key={item.id}
            title={item.title}
            icon={item.icon}
            onPress={() =>
              handleMenuPress(
                item.title
              )
            }
          />

        ))}

        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          onPress={handleLogout}
        >

          <Ionicons
            name="log-out-outline"
            size={22}
            color={Colors.danger}
          />

          <Text style={styles.logoutText}>
            Logout
          </Text>

        </TouchableOpacity>

        <Text style={styles.version}>
          CampusFound v1.0.0
        </Text>

      </ScrollView>

    </SafeAreaView>
  );
};

interface InfoRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}

const InfoRow = ({
  icon,
  label,
  value,
}: InfoRowProps) => {

  return (

    <View style={styles.infoRow}>

      <View style={styles.infoIcon}>

        <Ionicons
          name={icon}
          size={20}
          color={Colors.primary}
        />

      </View>

      <View style={styles.infoContent}>

        <Text style={styles.infoLabel}>
          {label}
        </Text>

        <Text style={styles.infoValue}>
          {value}
        </Text>

      </View>

    </View>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },

  content: {
    padding: Spacing.lg,
    paddingBottom: 14,
  },

  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.primary + "12",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.gray500,
    marginBottom: 3,
  },

  infoValue: {
    fontFamily: Fonts.medium,
    fontSize: 15,
    color: Colors.text,
  },

  statsRow: {
    flexDirection: "row",
    marginBottom: Spacing.lg,
  },

  logoutButton: {
    marginTop: 30,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFD7D7",
    ...Shadows.sm,
  },

  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.danger,
    fontFamily: Fonts.bold,
  },

  version: {
    marginTop: 28,
    textAlign: "center",
    color: Colors.gray500,
    fontFamily: Fonts.regular,
    fontSize: 13,
  },

  errorText: {
    fontFamily: Fonts.medium,
    color: Colors.text,
    fontSize: 16,
    marginBottom: 15,
  },

  retryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: Radius.md,
  },

  retryText: {
    color: Colors.white,
    fontFamily: Fonts.bold,
  },

});