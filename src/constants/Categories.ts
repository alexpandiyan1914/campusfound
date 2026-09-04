import { Ionicons } from "@expo/vector-icons";

export type ItemCategory =
  | "Wallet"
  | "Phone"
  | "Keys"
  | "Bag"
  | "Electronics"
  | "Documents"
  | "Accessories"
  | "Other";

export interface CategoryOption {
  id: string;
  title: ItemCategory;
  icon: keyof typeof Ionicons.glyphMap;
}

export const ITEM_CATEGORIES: CategoryOption[] = [
  {
    id: "wallet",
    title: "Wallet",
    icon: "wallet-outline",
  },
  {
    id: "phone",
    title: "Phone",
    icon: "phone-portrait-outline",
  },
  {
    id: "keys",
    title: "Keys",
    icon: "key-outline",
  },
  {
    id: "bag",
    title: "Bag",
    icon: "bag-handle-outline",
  },
  {
    id: "electronics",
    title: "Electronics",
    icon: "hardware-chip-outline",
  },
  {
    id: "documents",
    title: "Documents",
    icon: "document-text-outline",
  },
  {
    id: "accessories",
    title: "Accessories",
    icon: "watch-outline",
  },
  {
    id: "other",
    title: "Other",
    icon: "cube-outline",
  },
];

export const HOME_CATEGORIES = [
  {
    id: "all",
    title: "All",
    icon: "grid-outline" as keyof typeof Ionicons.glyphMap,
  },
  ...ITEM_CATEGORIES,
];

export const ITEM_CATEGORY_NAMES =
  ITEM_CATEGORIES.map(
    category => category.title
  );