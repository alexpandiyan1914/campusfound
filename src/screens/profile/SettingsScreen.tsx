import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  MainStackParamList,
} from "../../navigation/MainNavigator";

import {
  Colors,
  Fonts,
  Radius,
  Shadows,
  Spacing,
} from "../../theme";

type NavigationProp =
  NativeStackNavigationProp<
    MainStackParamList
  >;

const SettingsScreen = () => {

  const navigation =
    useNavigation<NavigationProp>();

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
              size={22}
              color={Colors.text}
            />

          </TouchableOpacity>

          <View style={styles.headerText}>

            <Text style={styles.title}>
              Settings
            </Text>

            <Text style={styles.subtitle}>
              Manage your CampusFound account
            </Text>

          </View>

        </View>

        <Text style={styles.sectionTitle}>
          Security
        </Text>

        <TouchableOpacity
          style={styles.settingItem}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate(
              "ChangePassword"
            )
          }
        >

          <View style={styles.settingLeft}>

            <View style={styles.iconContainer}>

              <Ionicons
                name="lock-closed-outline"
                size={22}
                color={Colors.primary}
              />

            </View>

            <View style={styles.settingTextContainer}>

              <Text style={styles.settingTitle}>
                Change Password
              </Text>

              <Text style={styles.settingDescription}>
                Update your account password securely
              </Text>

            </View>

          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={Colors.gray400}
          />

        </TouchableOpacity>

        <Text style={styles.sectionTitle}>
          Notifications
        </Text>

        <View style={styles.comingSoonCard}>

          <View style={styles.comingSoonIcon}>

            <Ionicons
              name="notifications-outline"
              size={24}
              color={Colors.primary}
            />

          </View>

          <View style={styles.comingSoonContent}>

            <Text style={styles.comingSoonTitle}>
              Notification Preferences
            </Text>

            <Text style={styles.comingSoonText}>
              Notification controls will be available when push notifications are added.
            </Text>

          </View>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor:
      Colors.background,
  },

  content: {
    padding:
      Spacing.lg,
    paddingBottom: 80,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom:
      Spacing.xl,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor:
      Colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginRight:
      Spacing.md,
    ...Shadows.sm,
  },

  headerText: {
    flex: 1,
  },

  title: {
    fontSize: 25,
    fontFamily:
      Fonts.bold,
    color:
      Colors.text,
  },

  subtitle: {
    marginTop: 3,
    fontSize: 13,
    fontFamily:
      Fonts.regular,
    color:
      Colors.textSecondary,
  },

  sectionTitle: {
    marginBottom:
      Spacing.sm,
    marginTop:
      Spacing.md,
    fontSize: 12,
    letterSpacing: 0.8,
    fontFamily:
      Fonts.semiBold,
    color:
      Colors.gray500,
    textTransform: "uppercase",
  },

  settingItem: {
    backgroundColor:
      Colors.white,
    borderRadius:
      Radius.lg,
    padding:
      Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...Shadows.sm,
  },

  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor:
      "#EEF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight:
      Spacing.md,
  },

  settingTextContainer: {
    flex: 1,
  },

  settingTitle: {
    fontSize: 15,
    fontFamily:
      Fonts.semiBold,
    color:
      Colors.text,
  },

  settingDescription: {
    marginTop: 3,
    fontSize: 12,
    lineHeight: 18,
    fontFamily:
      Fonts.regular,
    color:
      Colors.textSecondary,
  },

  comingSoonCard: {
    flexDirection: "row",
    backgroundColor:
      Colors.white,
    borderRadius:
      Radius.lg,
    padding:
      Spacing.md,
    alignItems: "center",
    opacity: 0.75,
  },

  comingSoonIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor:
      "#EEF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight:
      Spacing.md,
  },

  comingSoonContent: {
    flex: 1,
  },

  comingSoonTitle: {
    fontSize: 15,
    fontFamily:
      Fonts.semiBold,
    color:
      Colors.text,
  },

  comingSoonText: {
    marginTop: 3,
    fontSize: 12,
    lineHeight: 18,
    fontFamily:
      Fonts.regular,
    color:
      Colors.textSecondary,
  },

});