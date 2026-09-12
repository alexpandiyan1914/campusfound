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
    if (
      Platform.OS !==
      "android"
    ) {
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

      /*
       * Android 13+ requires a notification
       * channel to exist before requesting
       * notification permission.
       */
      await this
        .configureAndroidChannel();

      let permission =
        await Notifications
          .getPermissionsAsync();

      console.log(
        "Notification permission before request:",
        {
          status:
            permission.status,
          canAskAgain:
            permission.canAskAgain,
        }
      );

      if (
        permission.status !==
          "granted" &&
        permission.canAskAgain
      ) {
        permission =
          await Notifications
            .requestPermissionsAsync();

        console.log(
          "Notification permission after request:",
          {
            status:
              permission.status,
            canAskAgain:
              permission.canAskAgain,
          }
        );
      }

      if (
        permission.status !==
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

      console.log(
        "Expo push token obtained successfully."
      );

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