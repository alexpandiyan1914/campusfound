import React from "react";

import {
    createNativeStackNavigator,
} from "@react-navigation/native-stack";

import AdminBottomTabs from "./AdminBottomTabs";

import AdminPendingClaimsScreen from "../screens/admin/AdminPendingClaimsScreen";

import AdminClaimDetailsScreen from "../screens/admin/AdminClaimDetailsScreen";

import AdminCreateItemScreen
    from "../screens/admin/AdminCreateItemScreen";

import AdminEditItemScreen
    from "../screens/admin/AdminEditItemScreen";

import AdminItemDetailsScreen
    from "../screens/admin/AdminItemDetailsScreen";

import { Item }
    from "../types/item";


export type AdminStackParamList = {

    AdminTabs: undefined;

    AdminPendingClaims: undefined;

    AdminClaimDetails: {
        claimId: number;
    };

    AdminCreateItem: undefined;

    AdminItemDetails: {
        item: Item;
    };

    AdminEditItem: {
        item: Item;
    };

};


const Stack =
    createNativeStackNavigator<
        AdminStackParamList
    >();


const AdminNavigator = () => {

    return (

        <Stack.Navigator>

            <Stack.Screen

                name="AdminTabs"

                component={AdminBottomTabs}

                options={{
                    headerShown: false,
                }}

            />


            <Stack.Screen

                name="AdminPendingClaims"

                component={
                    AdminPendingClaimsScreen
                }

                options={{
                    title: "Pending Claims",
                }}

            />


            <Stack.Screen

                name="AdminClaimDetails"

                component={
                    AdminClaimDetailsScreen
                }

                options={{
                    title: "Claim Details",
                }}

            />

            <Stack.Screen
                name="AdminCreateItem"
                component={AdminCreateItemScreen}
                options={{
                    title: "Add Item",
                }}
            />

            <Stack.Screen
                name="AdminItemDetails"
                component={AdminItemDetailsScreen}
                options={{
                    title: "Item Details",
                }}
            />

            <Stack.Screen
                name="AdminEditItem"
                component={AdminEditItemScreen}
                options={{
                    title: "Edit Item",
                }}
            />

        </Stack.Navigator>
    );

};


export default AdminNavigator;