import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabs from "./BottomTabs";
import ItemDetailsScreen from "../screens/item/ItemDetailsScreen";
import { Item } from "../types/item";

export type MainStackParamList = {

    Tabs: undefined;

    ItemDetails: {
        item: Item;
    };

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

        </Stack.Navigator>

    );

};

export default MainNavigator;