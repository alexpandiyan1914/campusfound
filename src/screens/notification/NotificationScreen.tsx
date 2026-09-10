import React, {
  useCallback,
  useState,
} from "react";

import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  useFocusEffect,
} from "@react-navigation/native";

import {
  Ionicons,
} from "@expo/vector-icons";

import notificationService
  from "../../services/notificationService";

import {
  NotificationItem,
  NotificationType,
} from "../../types/notification";

import {
  Colors,
} from "../../theme";

import {
  handleNotificationNavigation,
} from "../../utils/notificationNavigation";

const NotificationScreen = () => {

  const [
    notifications,
    setNotifications,
  ] = useState<NotificationItem[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState(false);


  const loadNotifications =
    useCallback(
      async (
        isRefresh = false
      ) => {

        try {

          if (isRefresh) {
            setRefreshing(true);
          } else {
            setLoading(true);
          }

          setError(false);

          const response =
            await notificationService
              .getMyNotifications(
                0,
                20
              );

          setNotifications(
            response.content
          );

        } catch (err) {

          console.log(
            "Notification loading error:",
            err
          );

          setError(true);

        } finally {

          setLoading(false);

          setRefreshing(false);

        }

      },
      []
    );


  useFocusEffect(
    useCallback(() => {

      loadNotifications();

    }, [loadNotifications])
  );


  const handleRefresh = () => {

    loadNotifications(true);

  };


  const getNotificationIcon = (
    type: NotificationType
  ): keyof typeof Ionicons.glyphMap => {

    switch (type) {

      case "CLAIM_APPROVED":
        return "checkmark-circle";

      case "CLAIM_REJECTED":
        return "close-circle";

      case "NEW_ITEM":
        return "cube";

      case "SYSTEM":
        return "information-circle";

      default:
        return "notifications";

    }

  };


  const getNotificationLabel = (
    type: NotificationType
  ) => {

    switch (type) {

      case "CLAIM_APPROVED":
        return "Claim Update";

      case "CLAIM_REJECTED":
        return "Claim Update";

      case "NEW_ITEM":
        return "New Item";

      case "SYSTEM":
        return "CampusFound";

      default:
        return "Notification";

    }

  };


  const formatDate = (
    value: string
  ) => {

    const date =
      new Date(value);

    const now =
      new Date();

    const difference =
      now.getTime() -
      date.getTime();

    const minutes =
      Math.floor(
        difference /
        (1000 * 60)
      );

    const hours =
      Math.floor(
        difference /
        (1000 * 60 * 60)
      );

    const days =
      Math.floor(
        difference /
        (1000 * 60 * 60 * 24)
      );

    if (minutes < 1) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes}m ago`;
    }

    if (hours < 24) {
      return `${hours}h ago`;
    }

    if (days < 7) {
      return `${days}d ago`;
    }

    return date.toLocaleDateString();
  };


  const renderNotification = ({
    item,
  }: {
    item: NotificationItem;
  }) => {

    const icon =
      getNotificationIcon(
        item.type
      );

    return (
      <Pressable
        style={styles.card}
        onPress={() =>
          handleNotificationNavigation(
            {
              type: item.type,
              claimId: item.claimId,
              itemId: item.itemId,
            }
          )
        }
      >

        <View
          style={
            styles.iconContainer
          }
        >
          <Ionicons
            name={icon}
            size={24}
            color={
              Colors.primary
            }
          />
        </View>

        <View
          style={
            styles.content
          }
        >

          <View
            style={
              styles.topRow
            }
          >

            <Text
              style={
                styles.label
              }
            >
              {
                getNotificationLabel(
                  item.type
                )
              }
            </Text>

            <Text
              style={
                styles.time
              }
            >
              {
                formatDate(
                  item.createdAt
                )
              }
            </Text>

          </View>

          <Text
            style={
              styles.title
            }
          >
            {item.title}
          </Text>

          <Text
            style={
              styles.message
            }
          >
            {item.message}
          </Text>

        </View>

      </Pressable>
    );
  };


  if (loading) {

    return (
      <View
        style={
          styles.center
        }
      >
        <ActivityIndicator
          size="large"
          color={
            Colors.primary
          }
        />

        <Text
          style={
            styles.loadingText
          }
        >
          Loading notifications...
        </Text>
      </View>
    );

  }


  if (
    error &&
    notifications.length === 0
  ) {

    return (
      <View
        style={
          styles.center
        }
      >

        <Ionicons
          name="cloud-offline-outline"
          size={48}
          color="#94A3B8"
        />

        <Text
          style={
            styles.emptyTitle
          }
        >
          Unable to load notifications
        </Text>

        <Text
          style={
            styles.emptyDescription
          }
        >
          Check your connection and try again.
        </Text>

        <Pressable
          style={
            styles.retryButton
          }
          onPress={() =>
            loadNotifications()
          }
        >
          <Text
            style={
              styles.retryText
            }
          >
            Try Again
          </Text>
        </Pressable>

      </View>
    );

  }


  return (
    <View
      style={
        styles.container
      }
    >

      <View
        style={
          styles.header
        }
      >

        <Text
          style={
            styles.headerTitle
          }
        >
          Notifications
        </Text>

        <Text
          style={
            styles.headerSubtitle
          }
        >
          Latest updates from CampusFound
        </Text>

      </View>


      <FlatList
        data={
          notifications
        }
        keyExtractor={(
          item,
          index
        ) =>
          `${item.type}-${item.id}-${item.createdAt}-${index}`
        }
        renderItem={
          renderNotification
        }
        contentContainerStyle={
          notifications.length === 0
            ? styles.emptyList
            : styles.list
        }
        refreshControl={
          <RefreshControl
            refreshing={
              refreshing
            }
            onRefresh={
              handleRefresh
            }
            tintColor={
              Colors.primary
            }
          />
        }
        ListEmptyComponent={
          <View
            style={
              styles.emptyContainer
            }
          >

            <View
              style={
                styles.emptyIcon
              }
            >
              <Ionicons
                name="notifications-outline"
                size={36}
                color={
                  Colors.primary
                }
              />
            </View>

            <Text
              style={
                styles.emptyTitle
              }
            >
              No notifications yet
            </Text>

            <Text
              style={
                styles.emptyDescription
              }
            >
              Claim updates and newly posted items will appear here.
            </Text>

          </View>
        }
      />

    </View>
  );
};


const styles =
  StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor:
        "#F8FAFC",
    },

    header: {
      backgroundColor:
        "#FFFFFF",
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 18,
      borderBottomWidth: 1,
      borderBottomColor:
        "#E2E8F0",
    },

    headerTitle: {
      fontFamily:
        "Inter_700Bold",
      fontSize: 24,
      color: "#0F172A",
    },

    headerSubtitle: {
      fontFamily:
        "Inter_400Regular",
      fontSize: 14,
      color: "#64748B",
      marginTop: 4,
    },

    list: {
      padding: 16,
      paddingBottom: 32,
    },

    card: {
      flexDirection: "row",
      backgroundColor:
        "#FFFFFF",
      padding: 16,
      borderRadius: 14,
      marginBottom: 12,
      borderWidth: 1,
      borderColor:
        "#E2E8F0",
    },

    iconContainer: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor:
        "#EFF6FF",
      alignItems: "center",
      justifyContent:
        "center",
      marginRight: 14,
    },

    content: {
      flex: 1,
    },

    topRow: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
      marginBottom: 4,
    },

    label: {
      fontFamily:
        "Inter_600SemiBold",
      fontSize: 12,
      color:
        Colors.primary,
    },

    time: {
      fontFamily:
        "Inter_400Regular",
      fontSize: 11,
      color: "#94A3B8",
      marginLeft: 8,
    },

    title: {
      fontFamily:
        "Inter_600SemiBold",
      fontSize: 15,
      color: "#0F172A",
      marginBottom: 5,
    },

    message: {
      fontFamily:
        "Inter_400Regular",
      fontSize: 13,
      lineHeight: 19,
      color: "#64748B",
    },

    center: {
      flex: 1,
      alignItems: "center",
      justifyContent:
        "center",
      paddingHorizontal: 32,
      backgroundColor:
        "#F8FAFC",
    },

    loadingText: {
      fontFamily:
        "Inter_400Regular",
      marginTop: 12,
      fontSize: 14,
      color: "#64748B",
    },

    emptyList: {
      flexGrow: 1,
    },

    emptyContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent:
        "center",
      paddingHorizontal: 32,
    },

    emptyIcon: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor:
        "#EFF6FF",
      alignItems: "center",
      justifyContent:
        "center",
      marginBottom: 16,
    },

    emptyTitle: {
      fontFamily:
        "Inter_600SemiBold",
      fontSize: 17,
      color: "#0F172A",
      marginTop: 12,
      textAlign: "center",
    },

    emptyDescription: {
      fontFamily:
        "Inter_400Regular",
      fontSize: 13,
      lineHeight: 19,
      color: "#64748B",
      textAlign: "center",
      marginTop: 6,
    },

    retryButton: {
      marginTop: 20,
      paddingHorizontal: 22,
      paddingVertical: 11,
      borderRadius: 10,
      backgroundColor:
        Colors.primary,
    },

    retryText: {
      fontFamily:
        "Inter_600SemiBold",
      fontSize: 14,
      color: "#FFFFFF",
    },

  });


export default NotificationScreen;