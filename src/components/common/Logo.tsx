import React from "react";
import { Image, StyleSheet, View } from "react-native";

interface LogoProps {
  size?: number;
}

const Logo = ({ size = 120 }: LogoProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={{
          width: size,
          height: size,
        }}
        resizeMode="contain"
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});