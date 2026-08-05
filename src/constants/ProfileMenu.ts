import { Ionicons } from "@expo/vector-icons";

export interface ProfileMenuItemType {
  id: number;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export const profileMenu: ProfileMenuItemType[] = [

  {
    id: 1,
    title: "Edit Profile",
    icon: "person-outline",
  },

  {
    id: 2,
    title: "Change Password",
    icon: "lock-closed-outline",
  },

  {
    id: 3,
    title: "Claim History",
    icon: "document-text-outline",
  },

  {
    id: 4,
    title: "Settings",
    icon: "settings-outline",
  },

  {
    id: 5,
    title: "About",
    icon: "information-circle-outline",
  },

];