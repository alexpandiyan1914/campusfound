import api from "./api";

import {
  NotificationPage,
} from "../types/notification";

class NotificationService {

  async getMyNotifications(
    page = 0,
    size = 20
  ): Promise<NotificationPage> {

    const response =
      await api.get<NotificationPage>(
        `/notifications/my?page=${page}&size=${size}`
      );

    return response.data;
  }

}

export default new NotificationService();