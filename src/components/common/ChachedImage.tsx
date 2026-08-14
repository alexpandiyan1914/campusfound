import React from "react";

import {
  StyleProp,
  ImageStyle,
} from "react-native";

import {Image,} from "expo-image";

interface CachedImageProps {

  uri: string | null;

  placeholder: string;

  style?: StyleProp<ImageStyle>;
}

const CachedImage = ({
  uri,
  placeholder,
  style,
}: CachedImageProps) => {

  return (

    <Image
      source={{
        uri: uri || placeholder,
      }}
      style={style}
      contentFit="cover"
      cachePolicy="memory-disk"
      transition={150}
    />

  );
};

export default CachedImage;