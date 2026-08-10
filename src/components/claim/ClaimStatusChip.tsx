import React from "react";

import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  Colors,
  Fonts,
  Radius,
} from "../../theme";

import { ClaimStatus } from "../../types/claim";

interface Props {
  status: ClaimStatus;
}

const ClaimStatusChip = ({ status }: Props) => {

  const getColors = () => {

    switch (status) {

      case "APPROVED":
        return {
          background: "#DCFCE7",
          text: Colors.success,
        };

      case "REJECTED":
        return {
          background: "#FEE2E2",
          text: Colors.danger,
        };

      case "PENDING":
      default:
        return {
          background: "#FEF3C7",
          text: "#B45309",
        };

    }

  };

  const colors = getColors();

  return (

    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >

      <Text
        style={[
          styles.text,
          {
            color: colors.text,
          },
        ]}
      >
        {status}
      </Text>

    </View>

  );

};

export default ClaimStatusChip;

const styles = StyleSheet.create({

  container: {
    alignSelf: "flex-start",

    paddingHorizontal: 12,
    paddingVertical: 6,

    borderRadius: Radius.lg,
  },

  text: {
    fontSize: 12,
    fontFamily: Fonts.bold,
  },

});