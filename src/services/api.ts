import axios from "axios";
import API from "../constants/Api";

const api = axios.create({
  baseURL: API.BASE_URL,

  timeout: 10000,

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;