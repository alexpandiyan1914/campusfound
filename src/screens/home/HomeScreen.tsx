import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

import WelcomeHeader from "../../components/home/WelcomeHeader";
import SearchShortcut from "../../components/home/SearchShortcut";
import CategoryCard from "../../components/home/CategoryCard";
import SectionHeader from "../../components/home/SectionHeader";
import ItemCard from "../../components/home/ItemCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/MainNavigator";

import { categories } from "../../data/categories";

import itemService from "../../services/itemService";
import { Item } from "../../types/item";

import {
  Colors,
  Spacing,
} from "../../theme";

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const HomeScreen = () => {

  const navigation = useNavigation<NavigationProp>();

  const [items, setItems] = useState<Item[]>([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [page, setPage] = useState(0);

  const [hasMore, setHasMore] = useState(true);

  const [loadingMore, setLoadingMore] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const loadItems = async (
    pageNumber = 0,
    refresh = false
  ) => {

    try {

      console.log("Fetching Page:", pageNumber);

      const response =
        await itemService.getItems(pageNumber, 10);

      if (refresh) {

        setItems(response.content);

      } else {

        if (pageNumber === 0 || refresh) {

          setItems(response.content);

        } else {

          setItems(prev => [
            ...prev,
            ...response.content,
          ]);

        }

      }

      setPage(pageNumber);

      setHasMore(!response.last);

    } catch (error: any) {

      console.log(error);

      if (error.response?.status !== 401) {
        Alert.alert(
          "Error",
          "Failed to load items."
        );
      }

    } finally {

      setLoading(false);

      setRefreshing(false);

      setLoadingMore(false);

    }

  };

  useEffect(() => {

    loadItems(0, true);

  }, []);

  const onRefresh = useCallback(() => {

    setRefreshing(true);

    if (selectedCategory === "All") {

      setPage(0);

      setHasMore(true);

      loadItems(0, true);

    } else {

      filterCategory(selectedCategory);

      setRefreshing(false);

    }

  }, [selectedCategory]);

  const loadMore = () => {

    if (selectedCategory !== "All") return;

    if (loadingMore) return;

    if (!hasMore) return;

    setLoadingMore(true);

    loadItems(page + 1);

  };

  const filterCategory = async (
    category: string
  ) => {

    try {

      setSelectedCategory(category);

      if (category === "All") {

        setPage(0);

        setHasMore(true);

        loadItems(0, true);

        return;

      }

      const response =
        await itemService.getItemsByCategory(category);

      setItems(response);

    } catch {

      Alert.alert(
        "Error",
        "Failed to filter items."
      );

    }

  };


  if (loading) {

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

        data={items}

        keyExtractor={(item) => item.id.toString()}

        showsVerticalScrollIndicator={false}

        contentContainerStyle={styles.content}

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

            refreshing={refreshing}

            onRefresh={onRefresh}

            colors={[Colors.primary]}

          />

        }

        ListHeaderComponent={

          <>

            <WelcomeHeader />

            <SearchShortcut />

            <FlatList

              horizontal

              data={categories}

              keyExtractor={(item) => item.id}

              showsHorizontalScrollIndicator={false}

              contentContainerStyle={styles.categoryList}

              renderItem={({ item }) => (

                <CategoryCard
                  title={item.title}
                  icon={item.icon as any}
                  selected={selectedCategory === item.title}
                  onPress={() => filterCategory(item.title)}
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
              style={{
                paddingVertical: 20,
              }}
            >
              <ActivityIndicator
                size="large"
                color={Colors.primary}
              />
            </View>
          ) : null
        }

        onEndReached={loadMore}
        onEndReachedThreshold={0.5}

      />

    </SafeAreaView>

  );

};

export default HomeScreen;

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

  categoryList: {

    paddingVertical: Spacing.sm,

  },

});