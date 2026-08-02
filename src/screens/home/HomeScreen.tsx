import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import WelcomeHeader from "../../components/home/WelcomeHeader";
import SearchShortcut from "../../components/home/SearchShortcut";
import CategoryCard from "../../components/home/CategoryCard";
import SectionHeader from "../../components/home/SectionHeader";
import ItemCard from "../../components/home/ItemCard";

import { categories } from "../../data/categories";

import itemService from "../../services/itemService";
import { Item } from "../../types/item";

import {
  Colors,
  Spacing,
} from "../../theme";

const HomeScreen = () => {

  const [items, setItems] = useState<Item[]>([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const loadItems = async () => {
    try {
      console.log("Fetching items...");

      const response = await itemService.getItems();

      console.log("API Success:", response);
      console.log("Items:", response.content);

      setItems(response.content);

    } catch (error: any) {

      console.log("===== ITEM ERROR =====");
      console.log(error);
      console.log("Message:", error.message);
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);

      Alert.alert("Error", "Failed to load items.");

    } finally {

      setLoading(false);
      setRefreshing(false);

    }
  };

  useEffect(() => {

    loadItems();

  }, []);

  const onRefresh = useCallback(() => {

    setRefreshing(true);

    loadItems();

  }, []);

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

          <ItemCard item={item} />

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

                />

              )}

            />

            <SectionHeader

              title="Recent Lost & Found"

            />

          </>

        }

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