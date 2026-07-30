import React, { ReactNode } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { Colors, Spacing } from "../../theme";

interface ScreenContainerProps {
  children: ReactNode;
  scrollable?: boolean;
}

const ScreenContainer = ({
  children,
  scrollable = false,
}: ScreenContainerProps) => {
  if (scrollable) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <KeyboardAwareScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            enableOnAndroid
            extraScrollHeight={30}
          >{children}</KeyboardAwareScrollView>   
      </KeyboardAvoidingView>
      </SafeAreaView >
    );
  }

return (
  <SafeAreaView style={styles.safeArea}>
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {children}
    </KeyboardAvoidingView>
  </SafeAreaView>
);
};

export default ScreenContainer;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.lg,
  },

  scrollContent: {
    flexGrow: 1,
    paddingVertical: Spacing.xl,
  },
});