import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "campusfound_token";

export const storage = {

  async saveToken(token: string) {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  },

  async getToken() {
    return await AsyncStorage.getItem(TOKEN_KEY);
  },

  async removeToken() {
    await AsyncStorage.removeItem(TOKEN_KEY);
  },

};

export default storage;