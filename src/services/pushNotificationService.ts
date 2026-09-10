import {
  Platform,
} from "react-native";

import * as Device
  from "expo-device";

import * as Notifications
  from "expo-notifications";

import Constants
  from "expo-constants";

import {
  DevicePlatform,
} from "./notificationService";

const CHANNEL_ID =
  "campusfound";

Notifications.setNotificationHandler({
  handleNotification:
    async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
});

class PushNotificationService {
  private async configureAndroidChannel() {
    if (Platform.OS !== "android") {
      return;
    }

    await Notifications
      .setNotificationChannelAsync(
        CHANNEL_ID,
        {
          name:
            "CampusFound Notifications",

          importance:
            Notifications
              .AndroidImportance
              .HIGH,

          vibrationPattern:
            [0, 250, 250, 250],
        }
      );
  }

  private getProjectId():
    string | null {
    return (
      Constants
        .expoConfig
        ?.extra
        ?.eas
        ?.projectId
      ??
      Constants
        .easConfig
        ?.projectId
      ??
      null
    );
  }

  getPlatform():
    DevicePlatform {
    return Platform.OS === "ios"
      ? "IOS"
      : "ANDROID";
  }

  getDeviceName():
    string {
    return (
      Device.deviceName
      ??
      Device.modelName
      ??
      "Unknown Device"
    );
  }


  async getExpoPushToken():
    Promise<string | null> {
    try {
      if (!Device.isDevice) {
        console.log(
          "Push notifications require a physical device."
        );

        return null;
      }

      await this
        .configureAndroidChannel();

      const permission =
        await Notifications
          .getPermissionsAsync();

      let finalStatus =
        permission.status;

      if (
        finalStatus ===
        "undetermined"
      ) {
        const requestedPermission =
          await Notifications
            .requestPermissionsAsync();

        finalStatus =
          requestedPermission.status;
      }

      if (
        finalStatus !==
        "granted"
      ) {
        console.log(
          "Notification permission is not granted."
        );

        return null;
      }

      const projectId =
        this.getProjectId();

      if (!projectId) {
        console.log(
          "EAS project ID was not found."
        );

        return null;
      }

      const token =
        await Notifications
          .getExpoPushTokenAsync({
            projectId,
          });

      return token.data;
    } catch (error) {
      console.log(
        "Push token error:",
        error
      );

      return null;
    }
  }
}

export default
  new PushNotificationService();