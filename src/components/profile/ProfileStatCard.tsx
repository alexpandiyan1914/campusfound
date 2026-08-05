import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  Colors,
  Fonts,
  Radius,
  Shadows,
  Spacing,
} from "../../theme";

interface Props {
  title: string;
  value: number;
}

const ProfileStatCard = ({
  title,
  value,
}: Props) => {
  return (

    <View style={styles.card}>

      <Text style={styles.value}>
        {value}
      </Text>

      <Text style={styles.title}>
        {title}
      </Text>

    </View>

  );
};

export default ProfileStatCard;

const styles = StyleSheet.create({

  card: {

    flex: 1,

    backgroundColor: Colors.white,

    borderRadius: Radius.lg,

    paddingVertical: 20,

    alignItems: "center",

    ...Shadows.sm,

  },

  value: {

    fontSize: 24,

    fontFamily: Fonts.bold,

    color: Colors.primary,

  },

  title: {

    marginTop: 6,

    fontSize: 13,

    color: Colors.textSecondary,

    fontFamily: Fonts.medium,

    textAlign: "center",

  },

});