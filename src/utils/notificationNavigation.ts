import { navigationRef } from "../navigation/navigationRef";
import itemService from "../services/itemService";
import { NotificationType } from "../types/notification";

export interface NotificationNavigationData {
  type: NotificationType;
  claimId?: number | null;
  itemId?: number | null;
}

const toNumber = (
  value: unknown
): number | null => {
  if (
    value === null ||
    value === undefined
  ) {
    return null;
  }

  const parsed =
    Number(value);

  return Number.isNaN(parsed)
    ? null
    : parsed;
};

export const parseNotificationData = (
  data: Record<string, unknown>
): NotificationNavigationData | null => {
  const type =
    data.type as NotificationType;

  if (
    ![
      "CLAIM_APPROVED",
      "CLAIM_REJECTED",
      "NEW_ITEM",
      "SYSTEM",
    ].includes(type)
  ) {
    return null;
  }

  return {
    type,
    claimId:
      toNumber(data.claimId),
    itemId:
      toNumber(data.itemId),
  };
};

export const handleNotificationNavigation =
  async (
    notification:
      NotificationNavigationData
  ) => {
    if (
      !navigationRef.isReady()
    ) {
      return false;
    }

    try {
      switch (
        notification.type
      ) {
        case "CLAIM_APPROVED":
        case "CLAIM_REJECTED": {
          if (
            !notification.claimId
          ) {
            return false;
          }

          navigationRef.navigate(
            "ClaimDetails",
            {
              claimId:
                notification.claimId,
            }
          );

          return true;
        }

        case "NEW_ITEM": {
          if (
            !notification.itemId
          ) {
            return false;
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

          return true;
        }

        case "SYSTEM":
          return true;

        default:
          return false;
      }
    } catch (error) {
      console.log(
        "Notification navigation error:",
        error
      );

      return false;
    }
  };