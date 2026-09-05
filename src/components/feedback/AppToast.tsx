import React, {
  useEffect,
  useRef,
} from "react";

import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  FeedbackType,
} from "../../types/feedback";

import {
  Colors,
  Fonts,
  Radius,
  Shadows,
  Spacing,
} from "../../theme";

interface Props {
  visible: boolean;
  type: FeedbackType;
  title: string;
  message?: string;
  onClose: () => void;
}

const AppToast = ({
  visible,
  type,
  title,
  message,
  onClose,
}: Props) => {
  const translateY =
    useRef(
      new Animated.Value(-120)
    ).current;

  const opacity =
    useRef(
      new Animated.Value(0)
    ).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(
          translateY,
          {
            toValue: 0,
            useNativeDriver: true,
            friction: 8,
          }
        ),

        Animated.timing(
          opacity,
          {
            toValue: 1,
            duration: 180,
            useNativeDriver: true,
          }
        ),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(
          translateY,
          {
            toValue: -120,
            duration: 180,
            useNativeDriver: true,
          }
        ),

        Animated.timing(
          opacity,
          {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }
        ),
      ]).start();
    }
  }, [
    visible,
    translateY,
    opacity,
  ]);

  const config =
    getToastConfig(type);

  return (
    <Animated.View
      pointerEvents={
        visible
          ? "auto"
          : "none"
      }
      style={[
        styles.wrapper,
        {
          opacity,
          transform: [
            {
              translateY,
            },
          ],
        },
      ]}
    >
      <View
        style={[
          styles.container,
          {
            borderColor:
              config.borderColor,
          },
        ]}
      >
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor:
                config.backgroundColor,
            },
          ]}
        >
          <Ionicons
            name={config.icon}
            size={20}
            color={config.color}
          />
        </View>

        <View
          style={
            styles.content
          }
        >
          <Text
            style={
              styles.title
            }
          >
            {title}
          </Text>

          {message ? (
            <Text
              style={
                styles.message
              }
            >
              {message}
            </Text>
          ) : null}
        </View>

        <TouchableOpacity
          style={
            styles.closeButton
          }
          activeOpacity={0.7}
          onPress={onClose}
        >
          <Ionicons
            name="close"
            size={20}
            color={
              Colors.gray500
            }
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const getToastConfig = (
  type: FeedbackType
) => {
  switch (type) {
    case "success":
      return {
        color:
          Colors.success,

        backgroundColor:
          Colors.successSoft,

        borderColor:
          "#BBF7D0",

        icon:
          "checkmark-circle" as keyof typeof Ionicons.glyphMap,
      };

    case "error":
      return {
        color:
          Colors.danger,

        backgroundColor:
          Colors.dangerSoft,

        borderColor:
          "#FECACA",

        icon:
          "alert-circle" as keyof typeof Ionicons.glyphMap,
      };

    case "warning":
      return {
        color:
          Colors.warning,

        backgroundColor:
          Colors.warningSoft,

        borderColor:
          "#FDE68A",

        icon:
          "warning" as keyof typeof Ionicons.glyphMap,
      };

    default:
      return {
        color:
          Colors.info,

        backgroundColor:
          Colors.infoSoft,

        borderColor:
          "#BFDBFE",

        icon:
          "information-circle" as keyof typeof Ionicons.glyphMap,
      };
  }
};

export default AppToast;

const styles =
  StyleSheet.create({
    wrapper: {
      position: "absolute",
      top: 12,
      left: Spacing.md,
      right: Spacing.md,
      zIndex: 9999,
      elevation: 9999,
    },

    container: {
      minHeight: 68,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor:
        Colors.white,
      borderWidth: 1,
      borderRadius:
        Radius.lg,
      padding:
        Spacing.md,
      ...Shadows.md,
    },

    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent:
        "center",
    },

    content: {
      flex: 1,
      marginLeft:
        Spacing.sm,
      marginRight:
        Spacing.sm,
    },

    title: {
      fontSize: 14,
      fontFamily:
        Fonts.semiBold,
      color:
        Colors.text,
    },

    message: {
      marginTop: 3,
      fontSize: 12,
      lineHeight: 17,
      fontFamily:
        Fonts.regular,
      color:
        Colors.textSecondary,
    },

    closeButton: {
      width: 32,
      height: 32,
      alignItems: "center",
      justifyContent:
        "center",
    },
  });