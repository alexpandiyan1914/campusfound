import axios from "axios";

import API from "../constants/Api";

import storage from "../utils/storage";

import {
  forceLogout,
} from "../utils/authManager";

const api = axios.create({

  baseURL:
    API.BASE_URL,

  timeout: 10000,

  headers: {

    Accept:
      "application/json",

  },

});

// REQUEST INTERCEPTOR

api.interceptors.request.use(

  async config => {

    const token = await storage.getToken();

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    if (
      config.data instanceof FormData
    ) {

      delete config.headers[
        "Content-Type"
      ];

    } else {

      config.headers[
        "Content-Type"
      ] = "application/json";

    }

    return config;
  },

  error =>
    Promise.reject(error)

);

// RESPONSE INTERCEPTOR

api.interceptors.response.use(

  response =>
    response,

  async error => {

    if (
      error.response?.status === 401
    ) {

      console.log(
        "JWT expired. Logging out..."
      );

      await forceLogout();

    }

    return Promise.reject(error);
  }

);


export default api;