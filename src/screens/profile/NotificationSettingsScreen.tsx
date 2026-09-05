import React, {
  useState,
} from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
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

const NotificationSettingsScreen = () => {
  const navigation =
    useNavigation();

  const [
    claimUpdates,
    setClaimUpdates,
  ] = useState(true);

  const [
    newItemAlerts,
    setNewItemAlerts,
  ] = useState(true);

  const [
    importantUpdates,
    setImportantUpdates,
  ] = useState(true);

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
              Notifications
            </Text>

            <Text style={styles.subtitle}>
              Choose the updates you'd like to receive
            </Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Ionicons
            name="notifications-outline"
            size={22}
            color={Colors.primary}
          />

          <Text style={styles.infoText}>
            These preferences are currently part of the beta UI. They will be connected to real push notifications in the notification phase.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          CLAIMS
        </Text>

        <View style={styles.card}>
          <NotificationRow
            icon="shield-checkmark-outline"
            title="Claim Updates"
            description="Approval and rejection updates for your claims"
            value={claimUpdates}
            onValueChange={
              setClaimUpdates
            }
          />
        </View>

        <Text style={styles.sectionTitle}>
          ITEMS
        </Text>

        <View style={styles.card}>
          <NotificationRow
            icon="cube-outline"
            title="New Item Alerts"
            description="Get notified when new items are posted"
            value={newItemAlerts}
            onValueChange={
              setNewItemAlerts
            }
          />
        </View>

        <Text style={styles.sectionTitle}>
          CAMPUSFOUND
        </Text>

        <View style={styles.card}>
          <NotificationRow
            icon="megaphone-outline"
            title="Important Updates"
            description="Important service and beta announcements"
            value={importantUpdates}
            onValueChange={
              setImportantUpdates
            }
          />
        </View>

        <View style={styles.bottomNote}>
          <Ionicons
            name="information-circle-outline"
            size={18}
            color={Colors.gray500}
          />

          <Text style={styles.bottomNoteText}>
            Changing these switches currently affects only this screen and is not yet saved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

interface NotificationRowProps {
  icon:
    keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  value: boolean;
  onValueChange: (
    value: boolean
  ) => void;
}

const NotificationRow = ({
  icon,
  title,
  description,
  value,
  onValueChange,
}: NotificationRowProps) => {
  return (
    <View style={styles.notificationRow}>
      <View style={styles.iconContainer}>
        <Ionicons
          name={icon}
          size={20}
          color={Colors.primary}
        />
      </View>

      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>
          {title}
        </Text>

        <Text
          style={styles.notificationDescription}
        >
          {description}
        </Text>
      </View>

      <Switch
        value={value}
        onValueChange={
          onValueChange
        }
      />
    </View>
  );
};

export default NotificationSettingsScreen;

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
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primarySoft,
  },

  infoText: {
    flex: 1,
    marginLeft: Spacing.sm,
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
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    backgroundColor: Colors.white,
    ...Shadows.sm,
  },

  notificationRow: {
    minHeight: 84,
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primarySoft,
  },

  notificationContent: {
    flex: 1,
    marginHorizontal: Spacing.md,
  },

  notificationTitle: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: Colors.text,
  },

  notificationDescription: {
    marginTop: 3,
    fontSize: 11,
    lineHeight: 16,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },

  bottomNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: Spacing.sm,
  },

  bottomNoteText: {
    flex: 1,
    marginLeft: 7,
    fontSize: 11,
    lineHeight: 17,
    fontFamily: Fonts.regular,
    color: Colors.gray500,
  },
});