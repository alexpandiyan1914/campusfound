import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabs from "./BottomTabs";
import ItemDetailsScreen from "../screens/item/ItemDetailsScreen";
import AboutScreen from "../screens/profile/AboutScreen";
import { Item } from "../types/item";

export type MainStackParamList = {

    Tabs: undefined;

    ItemDetails: {
        item: Item;
    };

    About: undefined;

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
                name="About"
                component={AboutScreen}
                options={{
                    title: "About CampusFound",
                }}
            />

        </Stack.Navigator>

    );

};

export default MainNavigator;