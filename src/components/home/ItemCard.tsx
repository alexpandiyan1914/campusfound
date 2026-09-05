import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Image,
} from "expo-image";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  Item,
} from "../../types/item";

import {
  Colors,
  Fonts,
  Radius,
  Shadows,
  Spacing,
} from "../../theme";

interface Props {
  item: Item;
  onPress: () => void;
}

const ItemCard = ({
  item,
  onPress,
}: Props) => {
  const formattedDate =
    formatDate(
      item.lostFoundDate
    );

  const isActive =
    item.status === "ACTIVE";

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <View style={styles.imageWrapper}>
        {item.imageUrl ? (
          <Image
            source={{
              uri: item.imageUrl,
            }}
            style={styles.image}
            contentFit="cover"
            transition={150}
            cachePolicy="memory-disk"
          />
        ) : (
          <View
            style={
              styles.imagePlaceholder
            }
          >
            <Ionicons
              name="image-outline"
              size={30}
              color={Colors.gray400}
            />

            <Text
              style={
                styles.placeholderText
              }
            >
              No image
            </Text>
          </View>
        )}

        <View
          style={[
            styles.statusBadge,
            isActive
              ? styles.activeBadge
              : styles.closedBadge,
          ]}
        >
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor:
                  isActive
                    ? Colors.success
                    : Colors.gray500,
              },
            ]}
          />

          <Text
            style={[
              styles.statusText,
              {
                color:
                  isActive
                    ? Colors.success
                    : Colors.gray600,
              },
            ]}
          >
            {isActive
              ? "Available"
              : "Closed"}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <View
          style={
            styles.categoryRow
          }
        >
          <View
            style={
              styles.categoryBadge
            }
          >
            <Text
              style={
                styles.categoryText
              }
            >
              {item.category}
            </Text>
          </View>

          <Text style={styles.date}>
            {formattedDate}
          </Text>
        </View>

        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {item.title}
        </Text>

        <View
          style={
            styles.locationRow
          }
        >
          <Ionicons
            name="location-outline"
            size={16}
            color={Colors.gray500}
          />

          <Text
            style={
              styles.location
            }
            numberOfLines={1}
          >
            {item.location}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text
            style={
              styles.viewDetails
            }
          >
            View details
          </Text>

          <View
            style={
              styles.arrowContainer
            }
          >
            <Ionicons
              name="arrow-forward"
              size={16}
              color={Colors.primary}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const formatDate = (
  dateValue: string
) => {
  if (!dateValue) {
    return "";
  }

  const date =
    new Date(dateValue);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return dateValue;
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
    }
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },

  imageWrapper: {
    height: 190,
    position: "relative",
    backgroundColor:
      Colors.gray100,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  imagePlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:
      Colors.gray100,
  },

  placeholderText: {
    marginTop: 5,
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: Colors.gray500,
  },

  statusBadge: {
    position: "absolute",
    top: Spacing.sm,
    right: Spacing.sm,
    minHeight: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: Radius.pill,
    borderWidth: 1,
  },

  activeBadge: {
    backgroundColor:
      Colors.successSoft,
    borderColor: "#BBF7D0",
  },

  closedBadge: {
    backgroundColor:
      Colors.gray100,
    borderColor:
      Colors.gray200,
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },

  statusText: {
    fontSize: 11,
    fontFamily:
      Fonts.semiBold,
  },

  content: {
    padding: Spacing.md,
  },

  categoryRow: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  categoryBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: Radius.pill,
    backgroundColor:
      Colors.primarySoft,
  },

  categoryText: {
    fontSize: 11,
    fontFamily:
      Fonts.semiBold,
    color: Colors.primary,
  },

  date: {
    fontSize: 11,
    fontFamily: Fonts.regular,
    color: Colors.gray500,
  },

  title: {
    marginTop: 10,
    fontSize: 17,
    lineHeight: 23,
    fontFamily: Fonts.semiBold,
    color: Colors.text,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.sm,
  },

  location: {
    flex: 1,
    marginLeft: 5,
    fontSize: 13,
    fontFamily: Fonts.regular,
    color:
      Colors.textSecondary,
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:
      "space-between",
    marginTop: Spacing.md,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor:
      Colors.gray100,
  },

  viewDetails: {
    fontSize: 13,
    fontFamily:
      Fonts.semiBold,
    color: Colors.primary,
  },

  arrowContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:
      Colors.primarySoft,
  },
});