import {
  navigationRef,
} from "../navigation/navigationRef";

import itemService
  from "../services/itemService";

import {
  NotificationType,
} from "../types/notification";

export interface NotificationNavigationData {
  type: NotificationType;
  claimId?: number | null;
  itemId?: number | null;
}

export const handleNotificationNavigation =
  async (
    notification:
      NotificationNavigationData
  ) => {

    if (!navigationRef.isReady()) {
      return;
    }

    try {

      switch (notification.type) {

        case "CLAIM_APPROVED":
        case "CLAIM_REJECTED":

          if (!notification.claimId) {
            return;
          }

          navigationRef.navigate(
            "ClaimDetails",
            {
              claimId:
                notification.claimId,
            }
          );

          break;


        case "NEW_ITEM":

          if (!notification.itemId) {
            return;
          }

          const item =
            await itemService
              .getItemById(
                notification.itemId
              );

          navigationRef.navigate(
            "ItemDetails",
            {
              item,
            }
          );

          break;


        case "SYSTEM":

          break;

      }

    } catch (error) {

      console.log(
        "Notification navigation error:",
        error
      );

    }

  };