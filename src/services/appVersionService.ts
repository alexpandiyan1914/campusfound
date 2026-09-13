import axios from "axios";

import API from "../constants/Api";

import {
  AppVersionResponse,
} from "../types/appVersion";


const versionApi = axios.create({
  baseURL: API.BASE_URL,

  timeout: 20000,

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});


class AppVersionService {

  async getLatestVersion():
    Promise<AppVersionResponse> {

    const response =
      await versionApi
        .get<AppVersionResponse>(
          "/app/version"
        );

    return response.data;
  }

}


export default new AppVersionService();