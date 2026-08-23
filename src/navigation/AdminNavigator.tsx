import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AdminDashboardScreen from "../screens/admin/AdminDashboardScreen";
import AdminPendingClaimsScreen from "../screens/admin/AdminPendingClaimsScreen";
import AdminClaimDetailsScreen from "../screens/admin/AdminClaimDetailsScreen";

export type AdminStackParamList = {
    AdminDashboard: undefined;

    AdminPendingClaims: undefined;

    AdminClaimDetails: {
        claimId: number;
    };
};

const Stack =
    createNativeStackNavigator<AdminStackParamList>();

const AdminNavigator = () => {

    return (

        <Stack.Navigator>

            <Stack.Screen
                name="AdminDashboard"
                component={AdminDashboardScreen}
                options={{
                    headerShown: false,
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

        </Stack.Navigator>

    );
};

export default AdminNavigator;