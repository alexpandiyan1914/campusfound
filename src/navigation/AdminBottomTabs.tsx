import React from "react";

import {
    createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import AdminDashboardScreen
    from "../screens/admin/AdminDashboardScreen";

import AdminItemsScreen from "../screens/admin/AdminItemsScreen";
import AdminClaimsScreen from "../screens/admin/AdminClaimsScreen";
import AdminProfileScreen from "../screens/admin/AdminProfilesScreen";

import {
    Colors,
} from "../theme";


export type AdminTabParamList = {

    Dashboard: undefined;

    Items: undefined;

    Claims: undefined;

    Profile: undefined;

};


const Tab =
    createBottomTabNavigator<AdminTabParamList>();


const AdminBottomTabs = () => {

    return (

        <Tab.Navigator

            screenOptions={({ route }) => ({

                headerShown: false,

                tabBarActiveTintColor:
                    Colors.primary,

                tabBarInactiveTintColor:
                    Colors.gray500,

                tabBarStyle: {
                    height: 65,
                    paddingTop: 6,
                    paddingBottom: 8,
                },

                tabBarIcon: ({
                    color,
                    size,
                    focused,
                }) => {

                    let iconName:
                        keyof typeof Ionicons.glyphMap;


                    if (route.name === "Dashboard") {

                        iconName = focused
                            ? "grid"
                            : "grid-outline";

                    }

                    else if (route.name === "Items") {

                        iconName = focused
                            ? "cube"
                            : "cube-outline";

                    }

                    else if (route.name === "Claims") {

                        iconName = focused
                            ? "document-text"
                            : "document-text-outline";

                    }

                    else {

                        iconName = focused
                            ? "person"
                            : "person-outline";

                    }


                    return (

                        <Ionicons
                            name={iconName}
                            size={size}
                            color={color}
                        />

                    );

                },

            })}

        >

            <Tab.Screen
                name="Dashboard"
                component={AdminDashboardScreen}
            />

            <Tab.Screen
                name="Items"
                component={AdminItemsScreen}
            />

            <Tab.Screen
                name="Claims"
                component={AdminClaimsScreen}
            />

            <Tab.Screen
                name="Profile"
                component={AdminProfileScreen}
            />

        </Tab.Navigator>

    );

};


export default AdminBottomTabs;