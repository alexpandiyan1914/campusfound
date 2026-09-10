import api from "./api";

import {
  NotificationPage,
} from "../types/notification";

export type DevicePlatform =
  | "ANDROID"
  | "IOS";

interface RegisterDeviceRequest {
  pushToken: string;
  platform: DevicePlatform;
  deviceName: string;
}

interface UnregisterDeviceRequest {
  pushToken: string;
}

interface MessageResponse {
  message: string;
}

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

  async registerDevice(
    request: RegisterDeviceRequest
  ): Promise<MessageResponse> {
    const response =
      await api.post<MessageResponse>(
        "/notifications/devices",
        request
      );

    return response.data;
  }

  async unregisterDevice(
    pushToken: string
  ): Promise<MessageResponse> {
    const request: UnregisterDeviceRequest = {
      pushToken,
    };

    const response =
      await api.post<MessageResponse>(
        "/notifications/devices/unregister",
        request
      );

    return response.data;
  }
}

export default new NotificationService();