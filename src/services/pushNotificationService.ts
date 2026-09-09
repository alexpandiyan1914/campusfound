import {
  Platform,
} from "react-native";

import * as Device
  from "expo-device";

import * as Notifications
  from "expo-notifications";

import Constants
  from "expo-constants";

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

  async registerForPushNotifications():
    Promise<string | null> {

    try {

      if (!Device.isDevice) {
        console.log(
          "Push notifications require a physical device."
        );

        return null;
      }

      if (
        Platform.OS ===
        "android"
      ) {
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

      const {
        status:
          existingStatus,
      } =
        await Notifications
          .getPermissionsAsync();

      let finalStatus =
        existingStatus;

      if (
        existingStatus !==
        "granted"
      ) {
        const {
          status,
        } =
          await Notifications
            .requestPermissionsAsync();

        finalStatus =
          status;
      }

      if (
        finalStatus !==
        "granted"
      ) {
        console.log(
          "Notification permission was not granted."
        );

        return null;
      }

      const projectId =
        Constants
          .expoConfig
          ?.extra
          ?.eas
          ?.projectId
        ??
        Constants
          .easConfig
          ?.projectId;

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
        "Expo Push Token:",
        token.data
      );

      return token.data;

    } catch (error) {

      console.log(
        "Push registration error:",
        error
      );

      return null;
    }
  }
}

export default new PushNotificationService();