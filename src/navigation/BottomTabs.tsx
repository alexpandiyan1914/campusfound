import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/home/HomeScreen";
import SearchScreen from "../screens/search/SearchScreen";
import NotificationScreen from "../screens/notification/NotificationScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

import { Colors } from "../theme";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray400,

        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },

        tabBarIcon: ({ color, size }) => {
          let icon: keyof typeof Ionicons.glyphMap = "home";

          switch (route.name) {
            case "Home":
              icon = "home";
              break;

            case "Search":
              icon = "search";
              break;

            case "Notifications":
              icon = "notifications";
              break;

            case "Profile":
              icon = "person";
              break;
          }

          return (
            <Ionicons
              name={icon}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
      />

      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;