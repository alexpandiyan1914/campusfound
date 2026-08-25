import React from "react";

import {
    createNativeStackNavigator,
} from "@react-navigation/native-stack";

import AdminBottomTabs from "./AdminBottomTabs";

import AdminPendingClaimsScreen from "../screens/admin/AdminPendingClaimsScreen";

import AdminClaimDetailsScreen from "../screens/admin/AdminClaimDetailsScreen";


export type AdminStackParamList = {

    AdminTabs: undefined;

    AdminPendingClaims: undefined;

    AdminClaimDetails: {
        claimId: number;
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

        </Stack.Navigator>

    );

};


export default AdminNavigator;