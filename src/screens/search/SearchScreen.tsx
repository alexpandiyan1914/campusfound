import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import {
  Colors,
  Fonts,
  Radius,
  Shadows,
  Spacing,
} from "../../theme";

import itemService from "../../services/itemService";
import ItemCard from "../../components/home/ItemCard";
import { Item } from "../../types/item";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/MainNavigator";
import searchStorage from "../../utils/searchStorage";


const SearchScreen = () => {

  const inputRef = useRef<TextInput>(null);

  const [query, setQuery] = useState("");

  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState<Item[]>([]);

  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const loadRecentSearches = async () => {

    const searches =
      await searchStorage.getRecentSearches();

    setRecentSearches(searches);

  };

  useEffect(() => {

    inputRef.current?.focus();

    loadRecentSearches();

  }, []);

  useEffect(() => {

    const timer = setTimeout(() => {

      search();

    }, 500);

    return () => clearTimeout(timer);

  }, [query]);

  const search = async () => {

    if (query.trim() === "") {

      setResults([]);

      return;

    }

    try {

      setLoading(true);

      const response = await itemService.searchItems(query);

      setResults(response);

      await searchStorage.saveSearch(query);

      loadRecentSearches();

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

  const navigation = useNavigation<NavigationProp>();

  return (

    <View style={styles.container}>

      <View style={styles.searchBar}>

        <Ionicons
          name="search"
          size={22}
          color={Colors.gray500}
        />

        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Search lost & found items..."
          placeholderTextColor={Colors.gray400}
          value={query}
          onChangeText={setQuery}
        />

        {query.length > 0 && (

          <TouchableOpacity
            onPress={() => setQuery("")}
          >

            <Ionicons
              name="close-circle"
              size={22}
              color={Colors.gray500}
            />

          </TouchableOpacity>

        )}

      </View>

      {query.trim() === "" ? (

        <>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 25,
              marginBottom: 15,
            }}
          >

            <Text style={styles.heading}>
              Recent Searches
            </Text>

            {recentSearches.length > 0 && (

              <TouchableOpacity
                onPress={async () => {

                  await searchStorage.clearSearches();

                  setRecentSearches([]);

                }}
              >

                <Text
                  style={{
                    color: Colors.primary,
                    fontFamily: Fonts.semiBold,
                  }}
                >
                  Clear
                </Text>

              </TouchableOpacity>

            )}
          </View>



          <FlatList
            data={recentSearches}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (

              <TouchableOpacity style={styles.recentItem} onPress={() => setQuery(item)}>

                <Ionicons
                  name="time-outline"
                  size={18}
                  color={Colors.gray500}
                />

                <Text style={styles.recentText}>
                  {item}
                </Text>

              </TouchableOpacity>

            )}

            ListEmptyComponent={

              <Text
                style={{
                  color: Colors.textSecondary,
                  marginTop: 10,
                  textAlign: "center",
                }}
              >
                No recent searches
              </Text>

            }
          />

        </>

      ) : (

        <View style={styles.emptyContainer}>

          <Ionicons
            name="search-outline"
            size={60}
            color={Colors.gray400}
          />

          {loading ? (
            <ActivityIndicator
              size="large"
            />
          ) : (
            <FlatList

              data={results}

              keyExtractor={(item) =>
                item.id.toString()
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

              ListEmptyComponent={

                <View
                  style={{
                    marginTop: 80,
                    alignItems: "center",
                  }}
                >

                  <Ionicons
                    name="search"
                    size={60}
                    color={Colors.gray400}
                  />

                  <Text
                    style={{
                      marginTop: 15,
                      fontSize: 18,
                      fontFamily: Fonts.bold,
                    }}
                  >
                    No items found
                  </Text>

                  <Text
                    style={{
                      color: Colors.textSecondary,
                      marginTop: 5,
                    }}
                  >
                    Try another keyword.
                  </Text>

                </View>

              }

            />
          )}

          <Text style={styles.emptySubtitle}>
            Backend search will be connected next.
          </Text>

        </View>

      )}

    </View>

  );

};

export default SearchScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.md,
    height: 56,
    ...Shadows.sm,
  },

  input: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: 16,
    color: Colors.text,
    fontFamily: Fonts.medium,
  },

  heading: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.text,
  },

  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },

  recentText: {
    marginLeft: Spacing.md,
    fontSize: 15,
    color: Colors.text,
    fontFamily: Fonts.medium,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyTitle: {
    marginTop: Spacing.md,
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: Colors.text,
  },

  emptySubtitle: {
    marginTop: 8,
    color: Colors.textSecondary,
    textAlign: "center",
    fontFamily: Fonts.regular,
  },

});