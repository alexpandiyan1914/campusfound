import React, {
  useCallback,
  useRef,
  useState,
} from "react";

import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";

import {
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import WelcomeHeader
  from "../../components/home/WelcomeHeader";

import SearchShortcut
  from "../../components/home/SearchShortcut";

import CategoryCard
  from "../../components/home/CategoryCard";

import SectionHeader
  from "../../components/home/SectionHeader";

import ItemCard
  from "../../components/home/ItemCard";

import {
  MainStackParamList,
} from "../../navigation/MainNavigator";

import {
  HOME_CATEGORIES,
} from "../../constants/Categories";

import itemService
  from "../../services/itemService";

import {
  Item,
} from "../../types/item";

import {
  Colors,
  Fonts,
  Spacing,
} from "../../theme";

import useFeedback
  from "../../hooks/useFeedback";

type NavigationProp =
  NativeStackNavigationProp<
    MainStackParamList
  >;

const HomeScreen = () => {
  const navigation =
    useNavigation<NavigationProp>();

  const {
    showError,
  } = useFeedback();

  const [items, setItems] =
    useState<Item[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  const [page, setPage] =
    useState(0);

  const [
    hasMore,
    setHasMore,
  ] = useState(true);

  const [
    loadingMore,
    setLoadingMore,
  ] = useState(false);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const loadingMoreRef =
    useRef(false);

  const selectedCategoryRef =
    useRef("All");

  const loadItems = async (
    pageNumber = 0,
    refresh = false
  ) => {
    try {
      const response =
        await itemService.getItems(
          pageNumber,
          10
        );

      if (
        refresh ||
        pageNumber === 0
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
        showError(
          "Couldn't load items",
          "Please check your connection and try again."
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

  useFocusEffect(
    useCallback(() => {
      const refreshOnFocus = async () => {
        if (
          selectedCategoryRef.current ===
          "All"
        ) {
          setPage(0);
          setHasMore(true);

          await loadItems(
            0,
            true
          );

          return;
        }

        try {
          const response =
            await itemService
              .getItemsByCategory(
                selectedCategoryRef.current
              );

          setItems(response);
          setHasMore(false);
        } catch (error: any) {
          console.log(
            "Home Focus Refresh Error:",
            error.response?.data ||
            error.message
          );
        } finally {
          setLoading(false);
          setRefreshing(false);
        }
      };

      refreshOnFocus();
    }, [])
  );

  const filterCategory =
    async (
      category: string
    ) => {
      try {
        setSelectedCategory(
          category
        );

        selectedCategoryRef.current =
          category;

        if (
          category === "All"
        ) {
          setPage(0);
          setHasMore(true);

          await loadItems(
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
        setHasMore(false);
      } catch (error) {
        console.log(error);

        showError(
          "Couldn't filter items",
          "Please try again."
        );
      } finally {
        setRefreshing(false);
      }
    };

  const onRefresh =
    useCallback(() => {
      setRefreshing(true);

      if (
        selectedCategory ===
        "All"
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
      }
    }, [
      selectedCategory,
    ]);

  const loadMore = () => {
    if (
      selectedCategory !==
      "All"
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

    loadItems(
      page + 1
    );
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
          color={
            Colors.primary
          }
        />

        <Text
          style={
            styles.loadingText
          }
        >
          Finding recent items...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={
        styles.container
      }
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
        renderItem={({
          item,
        }) => (
          <ItemCard
            item={item}
            onPress={() =>
              navigation.navigate(
                "ItemDetails",
                {
                  item,
                }
              )
            }
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={
              refreshing
            }
            onRefresh={
              onRefresh
            }
            colors={[
              Colors.primary,
            ]}
            tintColor={
              Colors.primary
            }
          />
        }
        ListHeaderComponent={
          <>
            <WelcomeHeader />

            <SearchShortcut />

            <View
              style={
                styles.categoryHeader
              }
            >
              <Text
                style={
                  styles.categoryTitle
                }
              >
                Categories
              </Text>

              <Text
                style={
                  styles.categorySubtitle
                }
              >
                Browse by item type
              </Text>
            </View>

            <FlatList
              horizontal
              data={
                HOME_CATEGORIES
              }
              keyExtractor={
                item =>
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
              title={
                selectedCategory ===
                "All"
                  ? "Recently Found"
                  : selectedCategory
              }
              subtitle={
                selectedCategory ===
                "All"
                  ? "Latest items reported on campus"
                  : `Recently found ${selectedCategory.toLowerCase()} items`
              }
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
                size="small"
                color={
                  Colors.primary
                }
              />
            </View>
          ) : (
            <View
              style={
                styles.footerSpace
              }
            />
          )
        }
        onEndReached={
          loadMore
        }
        onEndReachedThreshold={
          0.4
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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

  loadingText: {
    marginTop:
      Spacing.sm,
    fontSize: 13,
    fontFamily:
      Fonts.regular,
    color:
      Colors.textSecondary,
  },

  content: {
    paddingHorizontal:
      Spacing.md,
    paddingTop:
      Spacing.md,
  },

  categoryHeader: {
    marginTop:
      Spacing.sm,
  },

  categoryTitle: {
    fontSize: 18,
    fontFamily:
      Fonts.bold,
    color:
      Colors.text,
  },

  categorySubtitle: {
    marginTop: 3,
    fontSize: 12,
    fontFamily:
      Fonts.regular,
    color:
      Colors.textSecondary,
  },

  categoryList: {
    paddingTop:
      Spacing.md,
    paddingBottom:
      Spacing.sm,
  },

  footerLoader: {
    paddingVertical:
      Spacing.lg,
  },

  footerSpace: {
    height: 110,
  },
});