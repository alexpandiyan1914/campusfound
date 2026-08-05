import axios from "axios";
import API from "../constants/Api";
import storage from "../utils/storage";
import { forceLogout } from "../utils/authManager";

const api = axios.create({
  baseURL: API.BASE_URL,

  timeout: 10000,

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  async config => {
    const token = await storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,

  async error => {

    if (error.response?.status === 401) {
      console.log("JWT expired. Logging out...");
      await forceLogout();
    }

    return Promise.reject(error);

  }
);

export default api;