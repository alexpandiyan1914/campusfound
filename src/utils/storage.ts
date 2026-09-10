import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "campusfound_token";
const PUSH_TOKEN_KEY = "campusfound_push_token";

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

  async savePushToken(pushToken: string) {
    await AsyncStorage.setItem(
      PUSH_TOKEN_KEY,
      pushToken
    );
  },

  async getPushToken() {
    return await AsyncStorage.getItem(
      PUSH_TOKEN_KEY
    );
  },

  async removePushToken() {
    await AsyncStorage.removeItem(
      PUSH_TOKEN_KEY
    );
  },
};

export default storage;