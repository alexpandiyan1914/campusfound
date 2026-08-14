import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import {
    Colors,
    Fonts,
    Radius,
    Shadows,
    Spacing,
} from "../../theme";
import { Item } from "../../types/item";
import { PLACEHOLDER_IMAGE } from "../../constants/images";
import CachedImage from "../common/ChachedImage";

interface Props {
    item: Item;
    onPress: () => void;
}

const ItemCard = ({
    item,
    onPress,
}: Props) => {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
        >

            <CachedImage
                uri={item.imageUrl}
                placeholder={PLACEHOLDER_IMAGE}
                style={styles.image}
            />

            <View style={styles.content}>

                <Text style={styles.title}>
                    {item.title}
                </Text>

                <Text style={styles.category}>
                    {item.category}
                </Text>

                <Text style={styles.location}>
                    📍 {item.location}
                </Text>

                <View style={styles.bottomRow}>

                    <View
                        style={[
                            styles.badge,
                            {
                                backgroundColor:
                                    item.status === "ACTIVE"
                                        ? "#DCFCE7"
                                        : "#FEE2E2",
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.badgeText,
                                {
                                    color:
                                        item.status === "ACTIVE"
                                            ? Colors.success
                                            : Colors.danger,
                                },
                            ]}
                        >
                            {item.status}
                        </Text>
                    </View>

                    <Text style={styles.date}>
                        {new Date(item.lostFoundDate).toLocaleDateString()}
                    </Text>

                </View>

            </View>

        </TouchableOpacity>
    );
};

export default ItemCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        overflow: "hidden",
        marginBottom: Spacing.lg,
        ...Shadows.sm,
    },

    image: {
        width: "100%",
        height: 180,
    },

    content: {
        padding: Spacing.md,
    },

    title: {
        fontSize: 18,
        color: Colors.text,
        fontFamily: Fonts.bold,
    },

    category: {
        marginTop: 4,
        color: Colors.textSecondary,
        fontFamily: Fonts.medium,
    },

    location: {
        marginTop: 8,
        color: Colors.textSecondary,
        fontFamily: Fonts.regular,
    },

    bottomRow: {
        marginTop: Spacing.md,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    badge: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
    },

    badgeText: {
        fontFamily: Fonts.bold,
        fontSize: 12,
    },

    date: {
        color: Colors.gray500,
        fontFamily: Fonts.regular,
    },
});