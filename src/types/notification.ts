export type NotificationType =
  | "CLAIM_APPROVED"
  | "CLAIM_REJECTED"
  | "NEW_ITEM"
  | "SYSTEM";

export interface NotificationItem {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  claimId: number | null;
  itemId: number | null;
  createdAt: string;
}

export interface NotificationPage {
  content: NotificationItem[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}