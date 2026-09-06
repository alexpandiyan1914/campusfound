import React, {
  useCallback,
  useState,
} from "react";
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
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  useFocusEffect,
} from "@react-navigation/native";

import { useClaims } from "../../context/ClaimContext";
import { ClaimStatus } from "../../types/claim";
import { MainStackParamList } from "../../navigation/MainNavigator";
import {
  Colors,
  Fonts,
  Radius,
  Shadows,
  Spacing,
} from "../../theme";

type Props = NativeStackScreenProps<
  MainStackParamList,
  "ClaimDetails"
>;

const ClaimDetailsScreen = ({
  route,
  navigation,
}: Props) => {
  const { claimId } = route.params;
  const {
    claims,
    refreshClaimById,
  } = useClaims();

  const claim = claims.find(
    item => item.id === claimId
  );

  const [syncing, setSyncing] =
    useState(!claim);

  useFocusEffect(
    useCallback(() => {
      let active = true;

      const refreshClaim = async () => {
        if (!claim) {
          setSyncing(true);
        }

        await refreshClaimById(claimId);

        if (active) {
          setSyncing(false);
        }
      };

      refreshClaim();

      return () => {
        active = false;
      };
    }, [claimId])
  );

  const formatDateTime = (date: string) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getStatusConfig = (
    status: ClaimStatus
  ) => {
    switch (status) {
      case "APPROVED":
        return {
          title: "Claim Approved",
          description:
            "Your claim has been approved. Please visit the Lost & Found desk for physical verification and collection.",
          icon: "checkmark-circle" as const,
          color: "#16A34A",
          background: "#DCFCE7",
        };
      case "REJECTED":
        return {
          title: "Claim Rejected",
          description:
            "Your claim could not be verified for this item.",
          icon: "close-circle" as const,
          color: "#DC2626",
          background: "#FEE2E2",
        };
      default:
        return {
          title: "Under Review",
          description:
            "Your claim is waiting for admin review. This page refreshes when you return to it.",
          icon: "time" as const,
          color: "#D97706",
          background: "#FEF3C7",
        };
    }
  };

  if (!claim && syncing) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={Colors.primary}
          />
          <Text style={styles.loadingText}>
            Refreshing claim details...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!claim) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFound}>
          <Ionicons
            name="document-text-outline"
            size={48}
            color={Colors.gray400}
          />

          <Text style={styles.notFoundTitle}>
            Claim not found
          </Text>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.goBackText}>
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const status =
    getStatusConfig(claim.status);

  const wasReviewed =
    claim.status !== "PENDING";

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
              size={22}
              color={Colors.text}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Claim Details
          </Text>
        </View>

        <View
          style={[
            styles.statusCard,
            { backgroundColor: status.background },
          ]}
        >
          <Ionicons
            name={status.icon}
            size={34}
            color={status.color}
          />

          <View style={styles.statusContent}>
            <Text
              style={[
                styles.statusTitle,
                { color: status.color },
              ]}
            >
              {status.title}
            </Text>

            <Text style={styles.statusDescription}>
              {status.description}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>
          ITEM
        </Text>

        <View style={styles.card}>
          <View style={styles.itemRow}>
            <View style={styles.itemIcon}>
              <Ionicons
                name="cube-outline"
                size={25}
                color={Colors.primary}
              />
            </View>

            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>
                {claim.itemTitle}
              </Text>

              <Text style={styles.claimNumber}>
                Claim #{claim.id}
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionLabel}>
          YOUR CLAIM
        </Text>

        <View style={styles.card}>
          <Text style={styles.detailLabel}>
            Reason for claiming
          </Text>

          <Text style={styles.reason}>
            {claim.reason}
          </Text>

          <View style={styles.divider} />

          <DetailRow
            icon="calendar-outline"
            label="Claimed on"
            value={formatDateTime(
              claim.createdAt
            )}
          />

          {wasReviewed && (
            <>
              <View style={styles.smallDivider} />

              <DetailRow
                icon="checkmark-done-outline"
                label="Reviewed on"
                value={formatDateTime(
                  claim.updatedAt
                )}
              />
            </>
          )}
        </View>

        <View style={styles.helpCard}>
          <Ionicons
            name="information-circle-outline"
            size={22}
            color={Colors.primary}
          />

          <Text style={styles.helpText}>
            Claim ownership is confirmed only after physical verification by the Lost & Found administrator.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

interface DetailRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}

const DetailRow = ({
  icon,
  label,
  value,
}: DetailRowProps) => (
  <View style={styles.detailRow}>
    <View style={styles.detailIcon}>
      <Ionicons
        name={icon}
        size={19}
        color={Colors.primary}
      />
    </View>

    <View style={styles.detailContent}>
      <Text style={styles.detailLabel}>
        {label}
      </Text>

      <Text style={styles.detailValue}>
        {value}
      </Text>
    </View>
  </View>
);

export default ClaimDetailsScreen;

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
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  headerTitle: {
    fontSize: 23,
    fontFamily: Fonts.bold,
    color: Colors.text,
  },
  statusCard: {
    flexDirection: "row",
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    marginBottom: Spacing.xl,
  },
  statusContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  statusTitle: {
    fontSize: 17,
    fontFamily: Fonts.bold,
  },
  statusDescription: {
    marginTop: 5,
    fontSize: 13,
    lineHeight: 20,
    fontFamily: Fonts.regular,
    color: Colors.text,
  },
  sectionLabel: {
    marginBottom: Spacing.sm,
    fontSize: 11,
    letterSpacing: 1,
    fontFamily: Fonts.semiBold,
    color: Colors.gray500,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    ...Shadows.sm,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemIcon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: "#EEF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 17,
    fontFamily: Fonts.semiBold,
    color: Colors.text,
  },
  claimNumber: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.gray500,
  },
  detailLabel: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: Colors.gray500,
  },
  reason: {
    marginTop: 7,
    fontSize: 15,
    lineHeight: 22,
    fontFamily: Fonts.regular,
    color: Colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.lg,
  },
  smallDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#EEF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  detailContent: {
    flex: 1,
  },
  detailValue: {
    marginTop: 3,
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.text,
  },
  helpCard: {
    flexDirection: "row",
    backgroundColor: "#EEF4FF",
    padding: Spacing.md,
    borderRadius: Radius.lg,
  },
  helpText: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: Spacing.sm,
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  notFoundTitle: {
    marginTop: Spacing.md,
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.text,
  },
  goBackText: {
    marginTop: Spacing.md,
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: Colors.primary,
  },
});
