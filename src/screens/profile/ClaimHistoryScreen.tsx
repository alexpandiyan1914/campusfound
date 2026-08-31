import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
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

import ClaimHistoryCard from "../../components/claim/ClaimHistoryCard";
import { useClaims } from "../../context/ClaimContext";
import { ClaimStatus } from "../../types/claim";
import { MainStackParamList } from "../../navigation/MainNavigator";
import { Colors, Fonts, Radius, Spacing } from "../../theme";

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

type FilterType = "ALL" | ClaimStatus;

const filters: {
  label: string;
  value: FilterType;
}[] = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
];

const ClaimHistoryScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const {
    claims,
    loading,
    refreshing,
    refreshClaims,
  } = useClaims();

  const [filter, setFilter] =
    useState<FilterType>("ALL");

  const filteredClaims = useMemo(() => {
    const sorted = [...claims].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );

    if (filter === "ALL") {
      return sorted;
    }

    return sorted.filter(
      claim => claim.status === filter
    );
  }, [claims, filter]);

  const getEmptyContent = () => {
    switch (filter) {
      case "PENDING":
        return {
          icon: "time-outline" as const,
          title: "No Pending Claims",
          message:
            "You don't have any claims waiting for review.",
        };
      case "APPROVED":
        return {
          icon: "checkmark-circle-outline" as const,
          title: "No Approved Claims",
          message:
            "You don't have any approved claims yet.",
        };
      case "REJECTED":
        return {
          icon: "close-circle-outline" as const,
          title: "No Rejected Claims",
          message:
            "You don't have any rejected claims.",
        };
      default:
        return {
          icon: "document-text-outline" as const,
          title: "No Claims Yet",
          message:
            "Items you claim will appear here so you can track their status.",
        };
    }
  };

  const emptyContent = getEmptyContent();

  if (loading && claims.length === 0) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={Colors.primary}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredClaims}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          filteredClaims.length === 0 &&
            styles.emptyListContent,
        ]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshClaims}
            colors={[Colors.primary]}
          />
        }
        ListHeaderComponent={
          <>
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

              <View style={styles.headerText}>
                <Text style={styles.title}>
                  Claim History
                </Text>

                <Text style={styles.subtitle}>
                  Track the items you've claimed
                </Text>
              </View>
            </View>

            <View style={styles.filterContainer}>
              {filters.map(item => {
                const active =
                  filter === item.value;

                return (
                  <TouchableOpacity
                    key={item.value}
                    style={[
                      styles.filterButton,
                      active &&
                        styles.activeFilterButton,
                    ]}
                    activeOpacity={0.8}
                    onPress={() =>
                      setFilter(item.value)
                    }
                  >
                    <Text
                      style={[
                        styles.filterText,
                        active &&
                          styles.activeFilterText,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {claims.length > 0 && (
              <Text style={styles.resultText}>
                {filteredClaims.length}{" "}
                {filteredClaims.length === 1
                  ? "claim"
                  : "claims"}
              </Text>
            )}
          </>
        }
        renderItem={({ item }) => (
          <ClaimHistoryCard
            claim={item}
            onPress={() =>
              navigation.navigate(
                "ClaimDetails",
                { claimId: item.id }
              )
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <Ionicons
                name={emptyContent.icon}
                size={34}
                color={Colors.primary}
              />
            </View>

            <Text style={styles.emptyTitle}>
              {emptyContent.title}
            </Text>

            <Text style={styles.emptyText}>
              {emptyContent.message}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default ClaimHistoryScreen;

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
    paddingBottom: 120,
  },
  emptyListContent: {
    flexGrow: 1,
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
  filterContainer: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: 4,
    marginBottom: Spacing.md,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: Radius.md,
  },
  activeFilterButton: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: Colors.gray500,
  },
  activeFilterText: {
    color: Colors.white,
    fontFamily: Fonts.semiBold,
  },
  resultText: {
    marginBottom: Spacing.md,
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: Colors.gray500,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 70,
  },
  emptyIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#EEF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.text,
  },
  emptyText: {
    maxWidth: 280,
    marginTop: 7,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
});