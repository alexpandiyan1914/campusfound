import AsyncStorage from "@react-native-async-storage/async-storage";

const SEARCH_KEY = "campusfound_recent_searches";

export const searchStorage = {

    async getRecentSearches(): Promise<string[]> {

        const data = await AsyncStorage.getItem(SEARCH_KEY);

        return data ? JSON.parse(data) : [];

    },

    async saveSearch(keyword: string) {

        if (!keyword.trim()) return;

        let searches = await this.getRecentSearches();

        searches = searches.filter(
            item =>
                item.toLowerCase() !== keyword.toLowerCase()
        );

        searches.unshift(keyword);
        searches = searches.slice(0, 5);

        await AsyncStorage.setItem(
            SEARCH_KEY,
            JSON.stringify(searches)
        );

    },

    async clearSearches() {

        await AsyncStorage.removeItem(SEARCH_KEY);

    },

};

export default searchStorage;