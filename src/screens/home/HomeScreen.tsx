import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import useFeedback from "../../hooks/useFeedback";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import WelcomeHeader from "../../components/home/WelcomeHeader";
import SearchShortcut from "../../components/home/SearchShortcut";
import CategoryCard from "../../components/home/CategoryCard";
import SectionHeader from "../../components/home/SectionHeader";
import ItemCard from "../../components/home/ItemCard";

import {
  MainStackParamList,
} from "../../navigation/MainNavigator";

import {
  HOME_CATEGORIES,
} from "../../constants/Categories";

import itemService from "../../services/itemService";

import {
  Item,
} from "../../types/item";

import {
  Colors,
  Spacing,
} from "../../theme";

type NavigationProp =
  NativeStackNavigationProp<
    MainStackParamList
  >;

const HomeScreen = () => {
  const {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm,
  } = useFeedback();

  const navigation =
    useNavigation<NavigationProp>();

  const [items, setItems] =
    useState<Item[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [page, setPage] =
    useState(0);

  const [hasMore, setHasMore] =
    useState(true);

  const [loadingMore, setLoadingMore] =
    useState(false);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const loadingMoreRef =
    useRef(false);

  const loadItems = async (
    pageNumber = 0,
    refresh = false
  ) => {
    try {
      console.log(
        "Fetching Page:",
        pageNumber
      );

      const response =
        await itemService.getItems(
          pageNumber,
          10
        );

      console.log(
        "Page",
        pageNumber,
        response.content.map(
          item => item.id
        )
      );

      console.log(
        "Current Items",
        items.map(
          item => item.id
        )
      );

      if (refresh) {
        setItems(
          response.content
        );
      } else {
        if (
          pageNumber === 0 ||
          refresh
        ) {
          setItems(
            response.content
          );
        } else {
          setItems(prev => {
            const existingIds =
              new Set(
                prev.map(
                  item => item.id
                )
              );

            const newItems =
              response.content.filter(
                item =>
                  !existingIds.has(
                    item.id
                  )
              );

            return [
              ...prev,
              ...newItems,
            ];
          });
        }
      }

      setPage(pageNumber);
      setHasMore(
        !response.last
      );
    } catch (error: any) {
      console.log(error);

      if (
        error.response?.status !==
        401
      ) {
        Alert.alert(
          "Error",
          "Failed to load items."
        );
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
      loadingMoreRef.current =
        false;
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadItems(0, true);
  }, []);

  const onRefresh =
    useCallback(() => {
      setRefreshing(true);

      if (
        selectedCategory === "All"
      ) {
        setPage(0);
        setHasMore(true);

        loadItems(
          0,
          true
        );
      } else {
        filterCategory(
          selectedCategory
        );

        setRefreshing(false);
      }
    }, [selectedCategory]);

  const loadMore = () => {
    if (
      selectedCategory !== "All"
    ) {
      return;
    }

    if (
      loadingMoreRef.current
    ) {
      return;
    }

    if (!hasMore) {
      return;
    }

    loadingMoreRef.current =
      true;

    setLoadingMore(true);

    loadItems(page + 1);
  };

  const filterCategory =
    async (
      category: string
    ) => {
      try {
        setSelectedCategory(
          category
        );

        if (
          category === "All"
        ) {
          setPage(0);
          setHasMore(true);

          loadItems(
            0,
            true
          );

          return;
        }

        const response =
          await itemService
            .getItemsByCategory(
              category
            );

        setItems(response);
      } catch {
        showError(
          "Error",
          "Failed to filter items."
        );
      }
    };

  if (loading) {
    return (
      <SafeAreaView
        style={
          styles.loadingContainer
        }
      >
        <ActivityIndicator
          size="large"
          color={Colors.primary}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <FlatList
        data={items}
        keyExtractor={item =>
          item.id.toString()
        }
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.content
        }
        renderItem={({ item }) => (
          <ItemCard
            item={item}
            onPress={() =>
              navigation.navigate(
                "ItemDetails",
                { item }
              )
            }
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={
              refreshing
            }
            onRefresh={onRefresh}
            colors={[
              Colors.primary,
            ]}
          />
        }
        ListHeaderComponent={
          <>
            <WelcomeHeader />

            <SearchShortcut />

            <FlatList
              horizontal
              data={
                HOME_CATEGORIES
              }
              keyExtractor={item =>
                item.id
              }
              showsHorizontalScrollIndicator={
                false
              }
              contentContainerStyle={
                styles.categoryList
              }
              renderItem={({
                item,
              }) => (
                <CategoryCard
                  title={
                    item.title
                  }
                  icon={
                    item.icon
                  }
                  selected={
                    selectedCategory ===
                    item.title
                  }
                  onPress={() =>
                    filterCategory(
                      item.title
                    )
                  }
                />
              )}
            />

            <SectionHeader
              title="Recent Lost & Found"
            />
          </>
        }
        ListFooterComponent={
          loadingMore ? (
            <View
              style={
                styles.footerLoader
              }
            >
              <ActivityIndicator
                size="large"
                color={
                  Colors.primary
                }
              />
            </View>
          ) : null
        }
        onEndReached={
          loadMore
        }
        onEndReachedThreshold={
          0.5
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        Colors.background,
    },

    loadingContainer: {
      flex: 1,
      justifyContent:
        "center",
      alignItems: "center",
      backgroundColor:
        Colors.background,
    },

    content: {
      padding: Spacing.lg,
      paddingBottom: 120,
    },

    categoryList: {
      paddingVertical:
        Spacing.sm,
    },

    footerLoader: {
      paddingVertical: 20,
    },
  });