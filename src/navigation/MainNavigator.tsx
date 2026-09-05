import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabs from "./BottomTabs";
import ItemDetailsScreen from "../screens/item/ItemDetailsScreen";
import AboutScreen from "../screens/profile/AboutScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import CreateClaimScreen from "../screens/claim/CreateClaimScreen";
import AdminPendingClaimsScreen from "../screens/admin/AdminPendingClaimsScreen";
import AdminClaimDetailsScreen from "../screens/admin/AdminClaimDetailsScreen";
import AdminDashboardScreen from "../screens/admin/AdminDashboardScreen";
import ClaimHistoryScreen from "../screens/profile/ClaimHistoryScreen";
import ClaimDetailsScreen from "../screens/profile/ClaimDetailsScreen";
import SettingsScreen from "../screens/profile/SettingsScreen";
import NotificationSettingsScreen from "../screens/profile/NotificationSettingsScreen";
import ChangePasswordScreen from "../screens/profile/ChangePasswordScreen";
import TermsAndConditionsScreen from "../screens/profile/TermsAndConditionsScreen";
import PrivacyPolicyScreen from "../screens/profile/PrivacyPolicyScreen";
import OpenSourceLicensesScreen from "../screens/profile/OpenSourceLicensesScreen";

import { Item } from "../types/item";

export type MainStackParamList = {

  EditProfile: undefined;

  Tabs: undefined;

  ItemDetails: {
    item: Item;
  };

  About: undefined;

  CreateClaim: {
    item: Item;
  };

  MyClaims: undefined;

  AdminDashboard: undefined;

  AdminPendingClaims: undefined;

  AdminAllClaims: undefined;

  AdminClaimDetails: {
    claimId: number;
  };

  ClaimHistory: undefined;

  ClaimDetails: {
    claimId: number;
  };

  Settings: undefined;
  ChangePassword: undefined;

  NotificationSettings: undefined;

  TermsAndConditions: undefined;
  PrivacyPolicy: undefined;

  OpenSourceLicenses: undefined;
};

const Stack =
  createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {

  return (

    <Stack.Navigator>

      <Stack.Screen
        name="Tabs"
        component={BottomTabs}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ItemDetails"
        component={ItemDetailsScreen}
        options={{
          title: "Item Details",
        }}
      />

      <Stack.Screen
        name="CreateClaim"
        component={CreateClaimScreen}
        options={{
          title: "Submit Claim",
        }}
      />

      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: "About CampusFound",
        }}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: "Edit Profile",
        }}
      />

      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboardScreen}
        options={{
          title: "Admin Dashboard",
        }}
      />

      <Stack.Screen
        name="AdminPendingClaims"
        component={AdminPendingClaimsScreen}
        options={{
          title: "Pending Claims",
        }}
      />

      <Stack.Screen
        name="AdminClaimDetails"
        component={AdminClaimDetailsScreen}
        options={{
          title: "Claim Details",
        }}
      />

      <Stack.Screen
        name="ClaimHistory"
        component={ClaimHistoryScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ClaimDetails"
        component={ClaimDetailsScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="NotificationSettings"
        component={NotificationSettingsScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="TermsAndConditions"
        component={TermsAndConditionsScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="OpenSourceLicenses"
        component={OpenSourceLicensesScreen}
        options={{
          headerShown: false,
        }}
      />

    </Stack.Navigator>

  );

};

export default MainNavigator;