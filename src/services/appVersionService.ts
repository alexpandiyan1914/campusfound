import api from "./api";

import {
  AppVersionResponse,
} from "../types/appVersion";

class AppVersionService {
  async getLatestVersion():
    Promise<AppVersionResponse> {

    const response =
      await api.get<AppVersionResponse>(
        "/app/version"
      );

    return response.data;
  }
}

export default new AppVersionService();