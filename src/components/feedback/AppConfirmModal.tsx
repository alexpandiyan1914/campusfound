import React from "react";

import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  Colors,
  Fonts,
  Radius,
  Shadows,
  Spacing,
} from "../../theme";

interface Props {
  visible: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  destructive?: boolean;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const AppConfirmModal = ({
  visible,
  title,
  message,
  confirmText,
  cancelText,
  destructive = false,
  loading = false,
  onCancel,
  onConfirm,
}: Props) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={
        onCancel
      }
    >
      <View
        style={
          styles.overlay
        }
      >
        <Pressable
          style={
            StyleSheet.absoluteFill
          }
          onPress={
            loading
              ? undefined
              : onCancel
          }
        />

        <View
          style={
            styles.modal
          }
        >
          <View
            style={[
              styles.iconContainer,

              destructive
                ? styles.dangerIcon
                : styles.infoIcon,
            ]}
          >
            <Ionicons
              name={
                destructive
                  ? "warning-outline"
                  : "help-circle-outline"
              }
              size={28}
              color={
                destructive
                  ? Colors.danger
                  : Colors.primary
              }
            />
          </View>

          <Text
            style={
              styles.title
            }
          >
            {title}
          </Text>

          <Text
            style={
              styles.message
            }
          >
            {message}
          </Text>

          <View
            style={
              styles.actions
            }
          >
            <TouchableOpacity
              style={[
                styles.button,
                styles.cancelButton,
              ]}
              disabled={
                loading
              }
              activeOpacity={0.8}
              onPress={
                onCancel
              }
            >
              <Text
                style={
                  styles.cancelText
                }
              >
                {cancelText}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,

                destructive
                  ? styles.destructiveButton
                  : styles.confirmButton,
              ]}
              disabled={
                loading
              }
              activeOpacity={0.8}
              onPress={
                onConfirm
              }
            >
              <Text
                style={
                  styles.confirmText
                }
              >
                {loading
                  ? "Please wait..."
                  : confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AppConfirmModal;

const styles =
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent:
        "center",
      alignItems:
        "center",
      padding:
        Spacing.lg,
      backgroundColor:
        Colors.overlay,
    },

    modal: {
      width: "100%",
      maxWidth: 420,
      backgroundColor:
        Colors.white,
      borderRadius:
        Radius.xl,
      padding:
        Spacing.lg,
      alignItems:
        "center",
      ...Shadows.lg,
    },

    iconContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      alignItems:
        "center",
      justifyContent:
        "center",
      marginBottom:
        Spacing.md,
    },

    infoIcon: {
      backgroundColor:
        Colors.primarySoft,
    },

    dangerIcon: {
      backgroundColor:
        Colors.dangerSoft,
    },

    title: {
      fontSize: 20,
      fontFamily:
        Fonts.bold,
      color:
        Colors.text,
      textAlign:
        "center",
    },

    message: {
      marginTop:
        Spacing.sm,
      fontSize: 14,
      lineHeight: 21,
      fontFamily:
        Fonts.regular,
      color:
        Colors.textSecondary,
      textAlign:
        "center",
    },

    actions: {
      width: "100%",
      flexDirection:
        "row",
      gap:
        Spacing.sm,
      marginTop:
        Spacing.lg,
    },

    button: {
      flex: 1,
      minHeight: 48,
      borderRadius:
        Radius.md,
      alignItems:
        "center",
      justifyContent:
        "center",
      paddingHorizontal:
        Spacing.md,
    },

    cancelButton: {
      backgroundColor:
        Colors.gray100,
    },

    confirmButton: {
      backgroundColor:
        Colors.primary,
    },

    destructiveButton: {
      backgroundColor:
        Colors.danger,
    },

    cancelText: {
      fontSize: 14,
      fontFamily:
        Fonts.semiBold,
      color:
        Colors.gray700,
    },

    confirmText: {
      fontSize: 14,
      fontFamily:
        Fonts.semiBold,
      color:
        Colors.white,
    },
  });